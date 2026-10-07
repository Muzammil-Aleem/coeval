import test from 'node:test';
import assert from 'node:assert/strict';
import supertest from 'supertest';
process.env.NODE_ENV='test';
process.env.MONGODB_URI='mongodb://127.0.0.1:27017/coeval_test';
process.env.JWT_SECRET='unit-test-secret-at-least-32-characters';
process.env.CLIENT_ORIGIN='http://localhost:5173';
const {app}=await import('../../src/app.js');
const api=supertest(app);
test('health reports database unavailability',async()=>assert.equal((await api.get('/health')).status,503));
test('mutations reject foreign and absent origins',async()=>{
  for(const origin of [null,'https://attacker.example']) {
    let req=api.post('/api/v1/auth/login');if(origin)req=req.set('Origin',origin);
    assert.equal((await req.send({email:'admin@example.com',password:'anything'})).status,403);
  }
});
test('admin reads and writes require session',async()=>{
  assert.equal((await api.get('/api/v1/products/manage')).status,401);
  assert.equal((await api.post('/api/v1/categories').set('Origin','http://localhost:5173').send({})).status,401);
  assert.equal((await api.get('/api/v1/inquiries')).status,401);
  assert.equal((await api.get('/api/v1/admin')).status,401);
});
test('invalid JWT never enters a database lookup',async()=>{
  assert.equal((await api.get('/api/v1/auth/me').set('Cookie','coeval_session=invalid')).status,401);
});
test('login schema validation happens before database work',async()=>{
  assert.equal((await api.post('/api/v1/auth/login').set('Origin','http://localhost:5173').send({email:'bad',password:''})).status,422);
});
test('malformed identifiers return a client error',async()=>assert.equal((await api.get('/api/v1/products/not-an-id')).status,400));
test('unknown endpoints return an envelope and headers conceal Express',async()=>{
  const result=await api.get('/api/v1/unknown');
  assert.equal(result.status,404);assert.equal(result.body.success,false);
  assert.equal(result.headers['x-powered-by'],undefined);assert.equal(result.headers['x-content-type-options'],'nosniff');
});
