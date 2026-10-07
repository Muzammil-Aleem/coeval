import mongoose from 'mongoose';
import { AppError } from '../../utils/AppError.js';
export async function validateRelations(model,data) {
  const relationships={category:'Category',subCategory:'SubCategory',cover:'Media',portrait:'Media'};
  for(const [key,collection] of Object.entries(relationships)) if(data[key]) {
    if(!await mongoose.model(collection).exists({_id:data[key]})) throw new AppError(422,`${key} does not exist`);
  }
  if(data.subCategory) {
    const sub=await mongoose.model('SubCategory').findById(data.subCategory);
    if(String(sub.category)!==String(data.category)) throw new AppError(422,'Sub-category must belong to the selected category');
  }
  if(data.gallery?.length) {
    const ids=[...new Set(data.gallery.map(String))];
    if(await mongoose.model('Media').countDocuments({_id:{$in:ids}})!==ids.length) throw new AppError(422,'One or more gallery images do not exist');
  }
}
export async function preventReferencedDelete(model,id) {
  const checks={Category:[['SubCategory','category'],['Product','category']],SubCategory:[['Product','subCategory']],Media:[['Product','cover'],['Product','gallery'],['TeamMember','portrait'],['Service','cover']]};
  for(const [collection,key] of checks[model.modelName]||[]) if(await mongoose.model(collection).exists({[key]:id})) throw new AppError(409,'Record is referenced; remove its references first');
}
