import {Router} from 'express';
import {AuditLog} from './audit.model.js';
import {authenticate,authorize} from '../../middleware/auth.js';
import {asyncHandler} from '../../utils/asyncHandler.js';
import {pagination} from '../../utils/query.js';
const router=Router();router.use(authenticate,authorize('superadmin'));router.get('/',asyncHandler(async(req,res)=>{const {page,limit,skip}=pagination(req.query);const [data,total]=await Promise.all([AuditLog.find().sort('-createdAt').skip(skip).limit(limit).populate('actor','name email'),AuditLog.countDocuments()]);res.json({success:true,data,pagination:{page,limit,total,pages:Math.ceil(total/limit)}});}));export default router;
