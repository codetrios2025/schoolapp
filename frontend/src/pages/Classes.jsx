import { useEffect, useState } from "react";
import api from "../api.js";

export default function Classes(){
  const [items, setItems] = useState([]);
  const [className, setClassName] = useState("");
  const [error, setError] = useState("");

  useEffect(()=>{ fetchClasses(); },[]);

  const fetchClasses = async () => {
    try { const { data } = await api.get('/classes'); setItems(data); } catch (err) { setError(err.response?.data?.error || 'Failed to load classes'); }
  };

  const createClass = async (e) => {
    e.preventDefault();
    try { await api.post('/classes', { className }); setClassName(''); fetchClasses(); } catch (err) { setError(err.response?.data?.error || 'Failed to create'); }
  };

  const deleteClass = async (id) => { if (!confirm('Delete class?')) return; await api.delete(`/classes/${id}`); fetchClasses(); };

  return (
    <div>
      <h2>Classes</h2>
      <form onSubmit={createClass} style={{ marginBottom: '16px' }}>
        <input placeholder="Class name" value={className} onChange={(e)=>setClassName(e.target.value)} required />
        <button type="submit" style={{ marginLeft: 8 }}>Add</button>
      </form>
      {error && <div style={{ color:'red' }}>{error}</div>}
      <ul>{items.map((clazz)=> <li key={clazz.classId}>{clazz.className} <button onClick={()=>deleteClass(clazz.classId)}>Delete</button></li>)}</ul>
    </div>
  );
}