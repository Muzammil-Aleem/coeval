import {Link} from 'react-router-dom';
import {useApi} from '../hooks/useApi.js';
import State from '../components/State.jsx';
export default function Services(){const r=useApi('/services?limit=100');return <section className="section"><p className="eyebrow">OUR EXPERTISE</p><h1>A complete design journey.</h1><p className="intro">From the first conversation to the last considered detail.</p><State loading={r.loading} error={r.error}/><div className="expertise-grid">{r.data?.data.map((s,i)=><article key={s._id}><span className="eyebrow">0{i+1}</span><h2>{s.name}</h2><p>{s.description}</p><ul>{s.deliverables?.map(d=><li key={d}>{d}</li>)}</ul><p className="muted">Typical programme: {s.duration}</p><Link to="/contact">Discuss your brief ↗</Link></article>)}</div></section>;}
