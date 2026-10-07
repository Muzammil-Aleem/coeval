import {z} from 'zod';
import {password} from '../admin/admin.validation.js';
export const loginSchema=z.object({email:z.string().email().max(254),password:z.string().min(1).max(128)}).strict();
export const passwordSchema=z.object({currentPassword:z.string().min(1).max(128),newPassword:password}).strict();
