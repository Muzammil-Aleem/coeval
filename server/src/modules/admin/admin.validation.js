import {z} from 'zod';
export const password=z.string().min(12).max(72).regex(/[a-z]/).regex(/[A-Z]/).regex(/[0-9]/).refine(s=>Buffer.byteLength(s,'utf8')<=72,'Password must fit within 72 UTF-8 bytes');
export const createAdmin=z.object({name:z.string().trim().min(1).max(180),email:z.string().email().max(254),password,role:z.enum(['admin','superadmin']).default('admin')}).strict();
export const updateAdmin=z.object({name:z.string().trim().min(1).max(180).optional(),active:z.boolean().optional(),role:z.enum(['admin','superadmin']).optional()}).strict();
