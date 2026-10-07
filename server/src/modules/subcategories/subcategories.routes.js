import {resourceRoutes} from '../shared/resource.routes.js';
import {controller} from './subcategories.controller.js';
import {createSchema,updateSchema} from './subcategories.validation.js';
export default resourceRoutes(controller,createSchema,updateSchema);
