import {z} from 'zod';
import {baseInput,id,text} from '../shared/schema.js';
export const createSchema=z.object({...baseInput,category:id,subCategory:id.nullable().optional(),type:z.enum(['design','service','consultation']),price:z.number().min(0).max(100000000).optional(),currency:z.enum(['USD','EUR','GBP']).optional(),location:z.string().max(180).optional(),areaSqm:z.number().min(0).max(10000000).optional(),year:z.number().int().min(1900).max(2200).optional(),featured:z.boolean().optional(),cover:id.nullable().optional(),gallery:z.array(id).max(20).optional(),deliverables:z.array(z.string().min(1).max(300)).max(30).optional()}).strict();
export const updateSchema=createSchema.partial().refine(data=>Object.keys(data).length>0,'At least one field is required');
