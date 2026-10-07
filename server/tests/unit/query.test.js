import test from 'node:test';
import assert from 'node:assert/strict';
import {pagination,buildFilter,escapeRegex,sortFor} from '../../src/utils/query.js';
test('pagination validates integers and enforces limits',()=>{assert.deepEqual(pagination({page:'2',limit:'10'}),{page:2,limit:10,skip:10});for(const q of [{page:'-1'},{limit:'101'},{page:'1.2'},{page:'10001'}])assert.throws(()=>pagination(q));});
test('public filtering always constrains published data',()=>{assert.equal(buildFilter({published:'false'}).published,true);assert.deepEqual(buildFilter({published:'false'},{admin:true}),{published:false});});
test('literal search escapes regex control characters',()=>{assert.equal(escapeRegex('a.*(b)'), 'a\\.\\*\\(b\\)');assert.equal(new RegExp(escapeRegex('a.*'),'i').test('aZZ'),false);});
test('operator injection cannot enter allowed filters',()=>assert.throws(()=>buildFilter({category:{$ne:null}},{fields:['category']})));
test('sort is allowlisted',()=>{assert.equal(sortFor({sort:'name'}),'name');assert.throws(()=>sortFor({sort:'passwordHash'}));});
