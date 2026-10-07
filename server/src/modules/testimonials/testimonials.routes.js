import {resourceRoutes} from '../shared/resource.routes.js';
import {controller} from './testimonials.controller.js';
import {createSchema,updateSchema} from './testimonials.validation.js';
export default resourceRoutes(controller,createSchema,updateSchema);
