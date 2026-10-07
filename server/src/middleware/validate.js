import { AppError } from '../utils/AppError.js';
export const validate = schema => (req,res,next) => {
  const result=schema.safeParse(req.body);
  if(!result.success) return next(new AppError(422,'Validation failed',result.error.flatten()));
  req.validated=result.data;next();
};
