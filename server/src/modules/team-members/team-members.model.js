import mongoose from 'mongoose';
import {baseFields,ref,mediaRef} from '../shared/schema.js';
const schema=new mongoose.Schema({...baseFields,jobTitle:{type:String,required:true,maxlength:180},email:{type:String,maxlength:254},portrait:mediaRef,credentials:[String]},{timestamps:true});
schema.index({published:1,sortOrder:1,createdAt:-1});
export const TeamMember=mongoose.model('TeamMember',schema);
