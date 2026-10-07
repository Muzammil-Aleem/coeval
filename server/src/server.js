import mongoose from 'mongoose';
import {app} from './app.js';
import {env} from './config/env.js';
import {logger} from './config/logger.js';
import {connect} from './database/connect.js';
await connect(env.MONGODB_URI);
const server=app.listen(env.PORT,()=>logger.info({port:env.PORT},'Coeval API listening'));
let stopping=false;
async function shutdown(signal){if(stopping)return;stopping=true;logger.info({signal},'Shutting down');const timeout=setTimeout(()=>process.exit(1),10000).unref();server.close(async()=>{await mongoose.disconnect();clearTimeout(timeout);process.exit(0);});}
process.on('SIGTERM',shutdown);process.on('SIGINT',shutdown);
