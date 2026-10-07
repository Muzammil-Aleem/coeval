import {SubCategory} from './subcategories.model.js';
import {resourceService} from '../shared/resource.service.js';
export const service=resourceService(SubCategory,{filters:["category"]});
