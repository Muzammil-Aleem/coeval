import {resourceRoutes} from '../shared/resource.routes.js';
import {controller} from './products.controller.js';
import {createSchema,updateSchema} from './products.validation.js';
export default resourceRoutes(controller,createSchema,updateSchema);
