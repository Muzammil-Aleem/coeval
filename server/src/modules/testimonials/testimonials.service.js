import {Testimonial} from './testimonials.model.js';
import {resourceService} from '../shared/resource.service.js';
export const service=resourceService(Testimonial,{filters:[]});
