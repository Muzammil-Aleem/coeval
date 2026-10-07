import {resourceRoutes} from '../shared/resource.routes.js';
import {controller} from './team-members.controller.js';
import {createSchema,updateSchema} from './team-members.validation.js';
export default resourceRoutes(controller,createSchema,updateSchema);
