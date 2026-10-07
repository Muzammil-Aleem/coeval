import {z} from 'zod';
import {baseInput,id,text} from '../shared/schema.js';
export const createSchema=z.object({...baseInput,jobTitle:text,email:z.string().email().or(z.literal('')).optional(),portrait:id.nullable().optional(),credentials:z.array(z.string().max(180)).max(20).optional()}).strict();
export const updateSchema=createSchema.partial().refine(data=>Object.keys(data).length>0,'At least one field is required');
