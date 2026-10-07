import mongoose from 'mongoose';
import {baseFields,ref,mediaRef} from '../shared/schema.js';
const schema=new mongoose.Schema({...baseFields,category:{...ref('Category'),required:true}},{timestamps:true});
schema.index({published:1,sortOrder:1,createdAt:-1});
export const SubCategory=mongoose.model('SubCategory',schema);
