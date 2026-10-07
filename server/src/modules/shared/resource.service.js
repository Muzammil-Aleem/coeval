import { AppError } from '../../utils/AppError.js';
import { slugify } from '../../utils/slug.js';
import { pagination,buildFilter,sortFor } from '../../utils/query.js';
import { validateRelations,preventReferencedDelete } from './relations.js';
export function resourceService(Model,{filters=[]}={}) {
  return {
    async list(query,admin=false) {
      const {page,limit,skip}=pagination(query),filter=buildFilter(query,{admin,fields:filters});
      if(query.featured!==undefined && Model.modelName==='Product') {if(!['true','false'].includes(query.featured)) throw new AppError(400,'Invalid featured flag');filter.featured=query.featured==='true';}
      const [data,total]=await Promise.all([Model.find(filter).sort(sortFor(query)).skip(skip).limit(limit).lean(),Model.countDocuments(filter)]);
      return {data,pagination:{page,limit,total,pages:Math.ceil(total/limit)}};
    },
    async get(id,admin=false) {
      const record=await Model.findOne({_id:id,...(admin?{}:{published:true})}).lean();
      if(!record) throw new AppError(404,'Record not found');return record;
    },
    async create(data) {
      const values={...data,slug:data.slug||slugify(data.name)};
      await validateRelations(Model,values);return Model.create(values);
    },
    async update(id,data) {
      const record=await Model.findById(id);if(!record) throw new AppError(404,'Record not found');
      record.set(data);await validateRelations(Model,record.toObject());return record.save();
    },
    async remove(id) {
      await preventReferencedDelete(Model,id);
      const record=await Model.findByIdAndDelete(id);if(!record) throw new AppError(404,'Record not found');
    }
  };
}
