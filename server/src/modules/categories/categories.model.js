import mongoose from 'mongoose';
import {baseFields,ref,mediaRef} from '../shared/schema.js';
const schema=new mongoose.Schema({...baseFields, icon:{type:String,maxlength:50}},{timestamps:true});
schema.index({published:1,sortOrder:1,createdAt:-1});
export const Category=mongoose.model('Category',schema);
