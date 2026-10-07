import {useState} from 'react';
import {useApi} from '../../hooks/useApi.js';
import State from '../../components/State.jsx';
import Pagination from '../../components/Pagination.jsx';
export default function Audit(){const [page,setPage]=useState(1),r=useApi('/audit?page='+page);return <section><h1>Audit log</h1><State loading={r.loading} error={r.error}/><div className="table-wrap"><table><thead><tr><th>Time</th><th>Actor</th><th>Action</th><th>Resource</th></tr></thead><tbody>{r.data?.data.map(a=><tr key={a._id}><td>{new Date(a.createdAt).toLocaleString()}</td><td>{a.actor?.name||'Unknown'}</td><td>{a.action}</td><td>{a.resource} / {a.resourceId}</td></tr>)}</tbody></table></div><Pagination meta={r.data?.pagination} onPage={setPage}/></section>;}
