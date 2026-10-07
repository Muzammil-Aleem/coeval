import { Router } from 'express';
import { authenticate,authorize } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { asyncHandler as wrap } from '../../utils/asyncHandler.js';
import { AppError } from '../../utils/AppError.js';
export const validId=(req,res,next)=>/^[a-f0-9]{24}$/i.test(req.params.id)?next():next(new AppError(400,'Invalid identifier'));
export function resourceRoutes(controller,createSchema,updateSchema) {
  const router=Router(),edit=[authenticate,authorize('admin','superadmin')];
  router.get('/',wrap(controller.list));
  router.get('/manage',...edit,wrap(controller.list));
  router.get('/manage/:id',...edit,validId,wrap(controller.get));
  router.get('/:id',validId,wrap(controller.get));
  router.post('/',...edit,validate(createSchema),wrap(controller.create));
  router.patch('/:id',...edit,validId,validate(updateSchema),wrap(controller.update));
  router.delete('/:id',...edit,validId,wrap(controller.remove));
  return router;
}
