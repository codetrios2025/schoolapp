import { useEffect, useState } from "react";
import api from "../api.js";

export default function Organizations(){
  const [items,setItems]=useState([]);
  const [name,setName]=useState("");
  const [code,setCode]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");

  async function load(){
    setLoading(true);
    try {
      const { data } = await api.get('/organizations');
      setItems(data);
    } catch (err) { setError(err.response?.data?.error || 'Load failed'); }
    setLoading(false);
  }

  useEffect(()=>{ load(); },[]);

  const createOrg = async (e)=>{
    e.preventDefault();
    try {
      await api.post('/organizations',{ organizationName: name, organizationCode: code });
      setName(''); setCode('');
      await load();
    } catch(err){ setError(err.response?.data?.error || 'Create failed'); }
  };

  const removeOrg=async(id)=>{
    if(!confirm('Delete organization?')) return;
    await api.delete(`/organizations/${id}`);
    load();
  };

  return (
    <div>
      <h2>Organizations</h2>
      <form onSubmit={createOrg} style={{ marginBottom:20 }}>
        <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required />
        <input placeholder="Code" value={code} onChange={(e)=>setCode(e.target.value)} required style={{marginLeft:8}} />
        <button type="submit" style={{marginLeft:8}}>Add</button>
      </form>
      {error && <div style={{color:'red'}}>{error}</div>}
      {loading && <div>Loading...</div>}
      <ul>{items.map(item=><li key={item.organizationId}>{item.organizationName} ({item.organizationCode}) <button onClick={()=>removeOrg(item.organizationId)}>Delete</button></li>)}</ul>
    </div>
  );
}