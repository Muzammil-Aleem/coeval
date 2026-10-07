import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { Admin } from '../modules/admin/admin.model.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
export const authenticate=asyncHandler(async(req,res,next)=>{
  const token=req.cookies?.coeval_session;
  if(!token) throw new AppError(401,'Authentication required');
  let payload;
  try {payload=jwt.verify(token,env.JWT_SECRET,{algorithms:['HS256'],issuer:'coeval',audience:'coeval-admin'});} catch {throw new AppError(401,'Session expired or invalid');}
  const admin=await Admin.findById(payload.sub);
  if(!admin||!admin.active||admin.tokenVersion!==payload.version) throw new AppError(401,'Session revoked');
  req.admin=admin;next();
});
export const authorize=(...roles)=>(req,res,next)=>roles.includes(req.admin?.role)?next():next(new AppError(403,'Insufficient permissions'));
export function trustedOrigin(req,res,next) {
  if(['GET','HEAD','OPTIONS'].includes(req.method)) return next();
  if(req.get('origin')!==env.CLIENT_ORIGIN) return next(new AppError(403,'A trusted Origin header is required'));
  next();
}
