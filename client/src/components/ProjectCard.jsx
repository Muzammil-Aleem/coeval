import {Link} from 'react-router-dom';
import {ArrowUpRight} from 'lucide-react';
import {mediaUrl} from '../api/client.js';
export default function ProjectCard({project}){return <Link className="project-card" to={'/projects/'+project._id}><div className="project-image">{project.cover?<img loading="lazy" src={mediaUrl(project.cover)} alt={project.name}/>:<div className="placeholder">COEVAL</div>}<span className="round"><ArrowUpRight size={20}/></span></div><div className="project-meta"><h3>{project.name}</h3><span>{project.year}</span></div><p>{project.location}</p></Link>;}
