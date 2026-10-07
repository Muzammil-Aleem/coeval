import {z} from 'zod';
import {baseInput,id,text} from '../shared/schema.js';
export const createSchema=z.object({...baseInput,icon:z.string().max(50).optional()}).strict();
export const updateSchema=createSchema.partial().refine(data=>Object.keys(data).length>0,'At least one field is required');
