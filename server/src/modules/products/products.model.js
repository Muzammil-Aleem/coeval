import mongoose from 'mongoose';
import {baseFields,ref,mediaRef} from '../shared/schema.js';
const schema=new mongoose.Schema({...baseFields,category:{...ref('Category'),required:true},subCategory:ref('SubCategory'),type:{type:String,enum:['design','service','consultation'],required:true},price:{type:Number,min:0,default:0},currency:{type:String,enum:['USD','EUR','GBP'],default:'USD'},location:{type:String,maxlength:180},areaSqm:{type:Number,min:0},year:{type:Number,min:1900,max:2200},featured:{type:Boolean,default:false},cover:mediaRef,gallery:[mediaRef],deliverables:[String]},{timestamps:true});
schema.index({published:1,sortOrder:1,createdAt:-1});
export const Product=mongoose.model('Product',schema);
