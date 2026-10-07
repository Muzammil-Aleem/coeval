import { logger } from '../config/logger.js';
export function errorHandler(err,req,res,next) {
  let status=err.status||500, message=err.message;
  if(err.code===11000){status=409;message='A record with this unique value already exists';}
  if(['ValidationError','CastError'].includes(err.name)){status=422;message='Invalid data or identifier';}
  if(err.name==='ZodError'){status=422;message='Validation failed';}
  if(err.name==='MulterError'){status=400;message=err.code==='LIMIT_FILE_SIZE'?'Image exceeds 5 MB':'Invalid upload';}
  if(status>=500) {logger.error({err,requestId:req.id},'Request failed');message='Internal server error';}
  res.status(status).json({success:false,error:{message,...(err.details?{details:err.details}:{}),requestId:req.id}});
}
