import mongoose from 'mongoose';
import {baseFields,ref,mediaRef} from '../shared/schema.js';
const schema=new mongoose.Schema({...baseFields,clientRole:{type:String,maxlength:180},rating:{type:Number,min:1,max:5,default:5}},{timestamps:true});
schema.index({published:1,sortOrder:1,createdAt:-1});
export const Testimonial=mongoose.model('Testimonial',schema);
