export const API=import.meta.env.VITE_API_URL||'/api/v1';
export async function request(path,options={}) {
 const multipart=options.body instanceof FormData;
 const res=await fetch(API+path,{...options,credentials:'include',headers:{...(!multipart?{'Content-Type':'application/json'}:{}),...options.headers},body:options.body?(multipart?options.body:JSON.stringify(options.body)):undefined});
 if(res.status===204)return null;
 const data=await res.json().catch(()=>({error:{message:'Server returned an unreadable response'}}));
 if(!res.ok){const err=new Error(data.error?.message||'Request failed');err.status=res.status;err.details=data.error?.details;throw err;}return data;
}
export const mediaUrl=id=>id?`${API}/media/${typeof id==='object'?id._id:id}/file`:null;
