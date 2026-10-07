import {createContext,useContext,useEffect,useState} from 'react';
import {request} from '../api/client.js';
const Context=createContext();
export function AuthProvider({children}) {
 const [admin,setAdmin]=useState(null),[loading,setLoading]=useState(true);
 useEffect(()=>{request('/auth/me').then(r=>setAdmin(r.data)).catch(()=>setAdmin(null)).finally(()=>setLoading(false));},[]);
 const login=async body=>{const r=await request('/auth/login',{method:'POST',body});setAdmin(r.data);};
 const logout=async()=>{try{await request('/auth/logout',{method:'POST'});}finally{setAdmin(null);}};
 return <Context.Provider value={{admin,loading,login,logout,setAdmin}}>{children}</Context.Provider>;
}
export const useAuth=()=>useContext(Context);
