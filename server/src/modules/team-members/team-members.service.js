import {TeamMember} from './team-members.model.js';
import {resourceService} from '../shared/resource.service.js';
export const service=resourceService(TeamMember,{filters:[]});
