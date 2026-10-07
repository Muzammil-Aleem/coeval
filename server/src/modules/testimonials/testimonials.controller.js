import {resourceController} from '../shared/resource.controller.js';
import {service} from './testimonials.service.js';
export const controller=resourceController(service);
