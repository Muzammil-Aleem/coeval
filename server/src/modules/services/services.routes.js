import {resourceRoutes} from '../shared/resource.routes.js';
import {controller} from './services.controller.js';
import {createSchema,updateSchema} from './services.validation.js';
export default resourceRoutes(controller,createSchema,updateSchema);
