import {useState,useEffect,useCallback} from 'react';
import {request} from '../api/client.js';
export function useApi(path) {
 const [data,setData]=useState(null),[loading,setLoading]=useState(true),[error,setError]=useState(''),[revision,setRevision]=useState(0);
 useEffect(()=>{let active=true;setLoading(true);setError('');request(path).then(value=>{if(active)setData(value);}).catch(err=>{if(active)setError(err.message);}).finally(()=>{if(active)setLoading(false);});return()=>{active=false;};},[path,revision]);
 return {data,loading,error,reload:useCallback(()=>setRevision(n=>n+1),[])};
}
