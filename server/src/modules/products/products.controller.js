import {resourceController} from '../shared/resource.controller.js';
import {service} from './products.service.js';
export const controller=resourceController(service);
