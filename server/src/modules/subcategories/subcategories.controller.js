import {resourceController} from '../shared/resource.controller.js';
import {service} from './subcategories.service.js';
export const controller=resourceController(service);
