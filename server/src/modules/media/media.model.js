import mongoose from 'mongoose';
export const Media=mongoose.model('Media',new mongoose.Schema({filename:{type:String,required:true,unique:true},originalName:String,mime:{type:String,default:'image/webp'},size:Number,width:Number,height:Number,alt:{type:String,maxlength:300},uploadedBy:{type:mongoose.Schema.Types.ObjectId,ref:'Admin'}},{timestamps:true}));
