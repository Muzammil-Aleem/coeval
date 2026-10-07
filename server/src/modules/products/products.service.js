import {Product} from './products.model.js';
import {resourceService} from '../shared/resource.service.js';
export const service=resourceService(Product,{filters:["category", "subCategory", "type"]});
