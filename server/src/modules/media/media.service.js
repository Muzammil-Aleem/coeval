import path from 'node:path';
import fs from 'node:fs/promises';
import {randomUUID} from 'node:crypto';
import sharp from 'sharp';
import {Media} from './media.model.js';
import {AppError} from '../../utils/AppError.js';
import {preventReferencedDelete} from '../shared/relations.js';
export const uploadDir=path.resolve('storage/uploads');
export async function upload(file,alt,admin) {
 if(!file) throw new AppError(400,'An image file is required');
 if(!['image/jpeg','image/png','image/webp'].includes(file.mimetype)) throw new AppError(415,'Only JPEG, PNG and WebP images are supported');
 const filename=randomUUID()+'.webp';await fs.mkdir(uploadDir,{recursive:true});
 let buffer,info;
 try{const meta=await sharp(file.buffer,{limitInputPixels:40000000}).metadata();if(!['jpeg','png','webp'].includes(meta.format)) throw new Error('Unsupported');({data:buffer,info}=await sharp(file.buffer,{limitInputPixels:40000000}).rotate().resize({width:2400,height:2400,fit:'inside',withoutEnlargement:true}).webp({quality:85}).toBuffer({resolveWithObject:true}));}catch{throw new AppError(422,'Invalid or oversized image content');}
 await fs.writeFile(path.join(uploadDir,filename),buffer);
 try{return await Media.create({filename,originalName:path.basename(file.originalname).slice(0,180),size:info.size,width:info.width,height:info.height,alt,uploadedBy:admin});}catch(err){await fs.unlink(path.join(uploadDir,filename));throw err;}
}
export async function remove(id) {
 await preventReferencedDelete(Media,id);
 const media=await Media.findById(id);if(!media) throw new AppError(404,'Media not found');
 await fs.unlink(path.join(uploadDir,media.filename)).catch(err=>{if(err.code!=='ENOENT') throw err;});await media.deleteOne();
}
