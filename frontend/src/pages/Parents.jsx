import { useEffect, useState } from "react";
import api from "../api.js";

export default function Parents(){
  const [items, setItems] = useState([]);
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [primaryContactName, setPrimaryContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => { load(); }, []);

  const load = async () => { try { const { data } = await api.get('/parents'); setItems(data); } catch (err) { setError(err.response?.data?.error || 'Load failed'); }};
  const createParent = async (e) => {
    e.preventDefault();
    try {
      await api.post('/parents', { fatherName, motherName, primaryContactName, phone, email });
      setFatherName(''); setMotherName(''); setPrimaryContactName(''); setPhone(''); setEmail('');
      load();
    } catch (err) { setError(err.response?.data?.error || 'Create failed'); }
  };
  const deleteParent = async (id) => { if (!confirm('Delete parent?')) return; await api.delete(`/parents/${id}`); load(); };

  return (
    <div>
      <h2>Parents</h2>
      <form onSubmit={createParent} style={{ marginBottom: 16 }}>
        <input required value={fatherName} onChange={e=>setFatherName(e.target.value)} placeholder="Father Name" />
        <input required value={motherName} onChange={e=>setMotherName(e.target.value)} placeholder="Mother Name" style={{ marginLeft:8 }} />
        <input required value={primaryContactName} onChange={e=>setPrimaryContactName(e.target.value)} placeholder="Primary Contact" style={{ marginLeft:8 }} />
        <input required value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone" style={{ marginLeft:8 }} />
        <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{ marginLeft:8 }} />
        <button type="submit" style={{ marginLeft:8 }}>Add</button>
      </form>
      {error && <div style={{ color:'red' }}>{error}</div>}
      <ul>{items.map(item => <li key={item.parentId}>{item.fatherName}/{item.motherName} ({item.primaryContactName}) {item.phone} {item.email} <button onClick={()=>deleteParent(item.parentId)}>Delete</button></li>)}</ul>
    </div>
  );
}
