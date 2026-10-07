import { AppError } from './AppError.js';
export const escapeRegex = s => s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
export function pagination(query) {
  const page = Number(query.page ?? 1), limit = Number(query.limit ?? 12);
  if(!Number.isInteger(page)||page<1||page>10000||!Number.isInteger(limit)||limit<1||limit>100) throw new AppError(400,'Invalid pagination: page 1–10000, limit 1–100');
  return {page,limit,skip:(page-1)*limit};
}
export function buildFilter(query,{admin=false,fields=[]}={}) {
  const filter = admin ? {} : {published:true};
  if(admin && query.published!==undefined) {
    if(!['true','false'].includes(query.published)) throw new AppError(400,'published must be true or false');
    filter.published=query.published==='true';
  }
  if(query.search) {
    if(typeof query.search!=='string'||query.search.length>100) throw new AppError(400,'Search is too long');
    filter.$or=['name','description'].map(field=>({[field]:{$regex:escapeRegex(query.search),$options:'i'}}));
  }
  for(const field of fields) if(query[field]!==undefined) {
    if(typeof query[field]!=='string'||query[field].length>100) throw new AppError(400,`Invalid ${field}`);
    filter[field]=query[field];
  }
  return filter;
}
export function sortFor(query) {
  const allowed={newest:'-createdAt',oldest:'createdAt',name:'name',order:'sortOrder',price:'price','-price':'-price'};
  if(query.sort && !allowed[query.sort]) throw new AppError(400,'Invalid sort');
  return allowed[query.sort]||'sortOrder -createdAt';
}
