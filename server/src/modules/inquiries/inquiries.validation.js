import {z} from 'zod';
export const inquirySchema=z.object({name:z.string().trim().min(2).max(180),email:z.string().email().max(254),phone:z.string().max(50).optional(),service:z.string().max(180).optional(),message:z.string().trim().min(20).max(5000)}).strict();
export const inquiryUpdate=z.object({status:z.enum(['new','contacted','qualified','closed']),internalNotes:z.string().max(5000).optional()}).strict();
