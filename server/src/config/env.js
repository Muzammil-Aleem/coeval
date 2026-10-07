import 'dotenv/config';
import { z } from 'zod';
const schema = z.object({
  NODE_ENV: z.enum(['development','test','production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(5000),
  MONGODB_URI: z.string().regex(/^mongodb(\+srv)?:\/\//),
  JWT_SECRET: z.string().min(32),
  CLIENT_ORIGIN: z.string().url().default('http://localhost:5173'),
});
export const env = schema.parse(process.env);
if(env.NODE_ENV === 'production' && env.JWT_SECRET.startsWith('replace-')) throw new Error('Replace JWT_SECRET before production');
