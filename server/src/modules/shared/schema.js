import mongoose from 'mongoose';
import { z } from 'zod';
export const id=z.string().regex(/^[a-f0-9]{24}$/i,'Must be a MongoDB ObjectId');
export const text=z.string().trim().min(1).max(180);
export const description=z.string().trim().min(1).max(10000);
export const baseFields={name:{type:String,required:true,trim:true,maxlength:180},slug:{type:String,unique:true,required:true,match:/^[a-z0-9]+(?:-[a-z0-9]+)*$/},description:{type:String,required:true,maxlength:10000},published:{type:Boolean,default:false},sortOrder:{type:Number,default:0,min:0}};
export const baseInput={name:text,slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(180).optional(),description,published:z.boolean().optional(),sortOrder:z.number().int().min(0).max(100000).optional()};
export const mediaRef={type:mongoose.Schema.Types.ObjectId,ref:'Media'};
export const ref=model=>({type:mongoose.Schema.Types.ObjectId,ref:model});
