import {z} from 'zod';
import {baseInput,id,text} from '../shared/schema.js';
export const createSchema=z.object({...baseInput,summary:z.string().max(300).optional(),deliverables:z.array(z.string().max(300)).max(30).optional(),duration:z.string().max(100).optional(),cover:id.nullable().optional()}).strict();
export const updateSchema=createSchema.partial().refine(data=>Object.keys(data).length>0,'At least one field is required');
