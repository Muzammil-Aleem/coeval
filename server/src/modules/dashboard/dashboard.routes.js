import {Router} from 'express';
import mongoose from 'mongoose';
import {authenticate,authorize} from '../../middleware/auth.js';
import {asyncHandler as wrap} from '../../utils/asyncHandler.js';
const router=Router();router.use(authenticate,authorize('admin','superadmin'));
router.get('/',wrap(async(req,res)=>{const names=['Product','Category','SubCategory','TeamMember','Service','Media','Inquiry'];const counts=await Promise.all(names.map(name=>mongoose.model(name).countDocuments()));const recent=await mongoose.model('Inquiry').find().sort('-createdAt').limit(5);res.json({success:true,data:{counts:Object.fromEntries(names.map((name,i)=>[name,counts[i]])),recentInquiries:recent}});}));export default router;
