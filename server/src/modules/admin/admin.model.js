import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true,maxlength:180},email:{type:String,unique:true,required:true,lowercase:true,trim:true},passwordHash:{type:String,required:true,select:false},role:{type:String,enum:['admin','superadmin'],default:'admin'},active:{type:Boolean,default:true},tokenVersion:{type:Number,default:0}},{timestamps:true});
schema.set('toJSON',{transform:(doc,obj)=>{delete obj.passwordHash;delete obj.tokenVersion;return obj;}});
export const Admin=mongoose.model('Admin',schema);
