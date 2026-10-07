import mongoose from 'mongoose';
export const AuditLog=mongoose.model('AuditLog',new mongoose.Schema({actor:{type:mongoose.Schema.Types.ObjectId,ref:'Admin'},action:String,resource:String,resourceId:String,requestId:String},{timestamps:true}));
