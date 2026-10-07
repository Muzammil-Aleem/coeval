import {resourceRoutes} from '../shared/resource.routes.js';
import {controller} from './categories.controller.js';
import {createSchema,updateSchema} from './categories.validation.js';
export default resourceRoutes(controller,createSchema,updateSchema);
