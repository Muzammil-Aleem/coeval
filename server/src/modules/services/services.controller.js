import {resourceController} from '../shared/resource.controller.js';
import {service} from './services.service.js';
export const controller=resourceController(service);
