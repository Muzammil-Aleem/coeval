import { audit } from '../audit/audit.service.js';
export const resourceController=service=>({
  list:async(req,res)=>res.json({success:true,...await service.list(req.query,Boolean(req.admin))}),
  get:async(req,res)=>res.json({success:true,data:await service.get(req.params.id,Boolean(req.admin))}),
  create:async(req,res)=>{const data=await service.create(req.validated);await audit(req,'create',data.constructor.modelName,data._id);res.status(201).json({success:true,data});},
  update:async(req,res)=>{const data=await service.update(req.params.id,req.validated);await audit(req,'update',data.constructor.modelName,data._id);res.json({success:true,data});},
  remove:async(req,res)=>{await service.remove(req.params.id);await audit(req,'delete','resource',req.params.id);res.status(204).end();}
});
