import mongoose from 'mongoose';
import {baseFields,ref,mediaRef} from '../shared/schema.js';
const schema=new mongoose.Schema({...baseFields,summary:{type:String,maxlength:300},deliverables:[String],duration:{type:String,maxlength:100},cover:mediaRef},{timestamps:true});
schema.index({published:1,sortOrder:1,createdAt:-1});
export const Service=mongoose.model('Service',schema);
