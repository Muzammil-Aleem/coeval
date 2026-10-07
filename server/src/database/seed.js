import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import {connect} from './connect.js';
import {Admin} from '../modules/admin/admin.model.js';
import {Category} from '../modules/categories/categories.model.js';
import {SubCategory} from '../modules/subcategories/subcategories.model.js';
import {Product} from '../modules/products/products.model.js';
import {TeamMember} from '../modules/team-members/team-members.model.js';
import {Service} from '../modules/services/services.model.js';
import {Testimonial} from '../modules/testimonials/testimonials.model.js';
import {WebsiteInfo} from '../modules/website-info/website-info.model.js';
import {Media} from '../modules/media/media.model.js';
import {uploadDir} from '../modules/media/media.service.js';
import {password} from '../modules/admin/admin.validation.js';
import {slugify} from '../utils/slug.js';
if(process.env.ALLOW_SEED!=='true'||process.env.NODE_ENV==='production')throw new Error('Seed requires ALLOW_SEED=true and non-production mode');
password.parse(process.env.SEED_ADMIN_PASSWORD);
await connect(process.env.MONGODB_URI);
try{
 const email=process.env.SEED_ADMIN_EMAIL;if(!email||!email.includes('@'))throw new Error('Set SEED_ADMIN_EMAIL');
 if(!await Admin.exists({email}))await Admin.create({name:'Studio Administrator',email,passwordHash:await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD,12),role:'superadmin'});
 const categories={};
 for(const name of ['Residential Architecture','Commercial Architecture','Interior Design','Landscape & Urbanism'])categories[name]=await Category.findOneAndUpdate({slug:slugify(name)},{$setOnInsert:{name,description:`Thoughtful ${name.toLowerCase()} rooted in place, purpose and people.`,published:true}},{upsert:true,new:true,runValidators:true});
 const subs={};for(const [name,cat] of [['Private Homes','Residential Architecture'],['Workplaces','Commercial Architecture'],['Hospitality Interiors','Interior Design'],['Public Spaces','Landscape & Urbanism']])subs[cat]=await SubCategory.findOneAndUpdate({slug:slugify(name)},{$setOnInsert:{name,category:categories[cat]._id,description:`Bespoke ${name.toLowerCase()} with enduring materials and measured detail.`,published:true}},{upsert:true,new:true,runValidators:true});
 await fs.mkdir(uploadDir,{recursive:true});
 const projects=[['Courtyard House','Residential Architecture','Sonoma, California',380,2025],['The Foundry Workspace','Commercial Architecture','Portland, Oregon',2400,2024],['Juniper Retreat','Interior Design','Joshua Tree, California',620,2025],['Riverwalk Pavilion','Landscape & Urbanism','Bend, Oregon',950,2024],['Hillside Residence','Residential Architecture','Santa Barbara, California',540,2023],['Civic Commons','Landscape & Urbanism','Sacramento, California',1800,2025]];
 for(const [i,[name,cat,location,areaSqm,year]] of projects.entries()){
   const slug=slugify(name),filename=`seed-${slug}.webp`;
   const palette=['#77796c','#aa8d74','#c7b396','#778681','#bba98a','#6d7773'];
   const svg=`<svg width="1200" height="900" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="900" fill="#e6e0d5"/><path d="M0 650L1200 530V900H0Z" fill="${palette[i]}"/><path d="M180 630V220L830 140V565Z" fill="#c4b49c"/><path d="M830 140L1040 240V620L830 565Z" fill="#948673"/><path d="M260 330L750 270V480L260 530Z" fill="#384944"/><path d="M490 300V500M620 285V487" stroke="#acb0a3" stroke-width="12"/><path d="M170 220L820 130L1050 235" fill="none" stroke="#f4efe5" stroke-width="18"/><circle cx="100" cy="480" r="110" fill="#758069"/><path d="M100 480V700" stroke="#5a6551" stroke-width="15"/></svg>`;
   const info=await sharp(Buffer.from(svg)).webp().toFile(`${uploadDir}/${filename}`);
   const media=await Media.findOneAndUpdate({filename},{$setOnInsert:{filename,originalName:filename,size:info.size,width:1200,height:900,alt:`Concept illustration for ${name}`}},{upsert:true,new:true});
   await Product.findOneAndUpdate({slug},{$setOnInsert:{name,slug,category:categories[cat]._id,subCategory:subs[cat]._id,type:'design',description:`${name} explores the relationship between light, material and daily life. Developed as an illustrative Coeval portfolio concept, this project brings calm spatial sequences, passive environmental strategies and careful craft together. These are fictional demonstration projects, not completed commissions.`,location,areaSqm,year,cover:media._id,gallery:[media._id],published:true,featured:i<3,sortOrder:i,deliverables:['Concept design','Design development','Construction documentation','Material specification']}},{upsert:true,runValidators:true});
 }
 for(const [i,[name,summary,duration]] of [['Architectural Design','From initial feasibility to detailed construction documents.','12–36 weeks'],['Interior Architecture','Spaces shaped around the people who inhabit them.','8–24 weeks'],['Master Planning','Connected places, resilient landscapes and thoughtful urban futures.','16–48 weeks'],['Design Consultation','An informed first step for your next project.','1–2 weeks']].entries())await Service.findOneAndUpdate({slug:slugify(name)},{$setOnInsert:{name,summary,description:`Our ${name.toLowerCase()} service combines rigorous analysis, collaborative workshops and a considered design process. We begin with your brief, study the context, and translate opportunities into clear, buildable proposals.`,duration,deliverables:['Discovery workshop','Site and brief review','Design recommendations'],published:true,sortOrder:i}},{upsert:true,runValidators:true});
 for(const [name,jobTitle] of [['Maya Chen','Principal Architect'],['Oliver Reed','Design Director'],['Amara Okafor','Interior Design Lead'],['Leo Martinez','Project Architect']])await TeamMember.findOneAndUpdate({slug:slugify(name)},{$setOnInsert:{name,jobTitle,description:`${name} brings a collaborative approach to spatial design, sustainable materials and the details that make places meaningful. Fictional team profile for demonstration.`,credentials:['Architectural design','Sustainable practice'],published:true}},{upsert:true,runValidators:true});
 for(const [name,clientRole] of [['Jordan Blake','Residential client'],['Avery Morgan','Workspace client']])await Testimonial.findOneAndUpdate({slug:slugify(name)},{$setOnInsert:{name,clientRole,description:'The studio listened carefully and translated our ambitions into a thoughtful, coherent design. Demonstration testimonial.',rating:5,published:true}},{upsert:true,runValidators:true});
 await WebsiteInfo.findOneAndUpdate({key:'main'},{$setOnInsert:{companyName:'Coeval',tagline:'Architecture for the way we live.',heroTitle:'Spaces that belong.\nDesign that endures.',heroDescription:'An independent architecture and design studio shaping thoughtful places through collaboration, craft and care.',about:'Coeval is an architecture and design studio working across residential, commercial, interiors and landscape projects. We believe good design connects people to place and makes everyday life more meaningful.',email:'studio@coeval.example',phone:'+1 (555) 010-2026',address:'100 Studio Lane, San Francisco, CA — demonstration address',seo:{title:'Coeval | Architecture & Design',description:'Thoughtful architecture, interiors and design consultation.'}}},{upsert:true,runValidators:true});
 console.log('Seed complete. Existing content and admin passwords were preserved.');
}finally{await mongoose.disconnect();}
