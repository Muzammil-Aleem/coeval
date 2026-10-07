import {Router} from 'express';
import bcrypt from 'bcryptjs';
import {Admin} from './admin.model.js';
import {createAdmin,updateAdmin} from './admin.validation.js';
import {authenticate,authorize} from '../../middleware/auth.js';
import {validate} from '../../middleware/validate.js';
import {asyncHandler as wrap} from '../../utils/asyncHandler.js';
import {AppError} from '../../utils/AppError.js';
import {validId} from '../shared/resource.routes.js';
import {audit} from '../audit/audit.service.js';
const router=Router();router.use(authenticate,authorize('superadmin'));
router.get('/',wrap(async(req,res)=>res.json({success:true,data:await Admin.find().sort('name')})));
router.post('/',validate(createAdmin),wrap(async(req,res)=>{
 const {password,...data}=req.validated;const admin=await Admin.create({...data,passwordHash:await bcrypt.hash(password,12)});await audit(req,'create','Admin',admin._id);res.status(201).json({success:true,data:admin});
}));
router.patch('/:id',validId,validate(updateAdmin),wrap(async(req,res)=>{
 if(req.params.id===String(req.admin._id)&&(req.validated.active===false||req.validated.role==='admin')) throw new AppError(409,'Cannot demote or deactivate your own account');
 const admin=await Admin.findById(req.params.id);if(!admin) throw new AppError(404,'Admin not found');
                                                                                    
 if(admin.role==='superadmin'&&(req.validated.active===false||req.validated.role==='admin')) throw new AppError(409,'Superadmins cannot be demoted or deactivated through this API');
 admin.set(req.validated);admin.tokenVersion++;await admin.save();await audit(req,'update','Admin',admin._id);res.json({success:true,data:admin});
}));
export default router;
