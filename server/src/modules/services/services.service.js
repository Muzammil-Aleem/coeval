import {Service} from './services.model.js';
import {resourceService} from '../shared/resource.service.js';
export const service=resourceService(Service,{filters:[]});
