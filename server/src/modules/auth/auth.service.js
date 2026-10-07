import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {Admin} from '../admin/admin.model.js';
import {env} from '../../config/env.js';
import {AppError} from '../../utils/AppError.js';
const dummyHash=await bcrypt.hash('unused-timing-equalizer',12);
export async function login({email,password}) {
 const admin=await Admin.findOne({email:email.toLowerCase()}).select('+passwordHash');
 const valid=await bcrypt.compare(password,admin?.passwordHash||dummyHash);
 if(!admin||!admin.active||!valid) throw new AppError(401,'Invalid email or password');
 const token=jwt.sign({version:admin.tokenVersion},env.JWT_SECRET,{algorithm:'HS256',subject:String(admin._id),expiresIn:'2h',issuer:'coeval',audience:'coeval-admin'});
 return {admin,token};
}
export async function changePassword(id,{currentPassword,newPassword}) {
 const admin=await Admin.findById(id).select('+passwordHash');
 if(!await bcrypt.compare(currentPassword,admin.passwordHash)) throw new AppError(401,'Current password is incorrect');
 admin.passwordHash=await bcrypt.hash(newPassword,12);admin.tokenVersion++;await admin.save();
}
