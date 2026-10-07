import {AuditLog} from './audit.model.js';
import {logger} from '../../config/logger.js';
export async function audit(req,action,resource,id){try{await AuditLog.create({actor:req.admin?._id,action,resource,resourceId:String(id),requestId:req.id});}catch(err){logger.error({err},'Audit write failed');}}
