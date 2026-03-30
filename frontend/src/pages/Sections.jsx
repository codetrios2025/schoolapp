import { useEffect, useState } from "react";
import api from "../api.js";

export default function Sections() {
  const [items, setItems] = useState([]);
  const [sectionName, setSectionName] = useState("");
  const [classId, setClassId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => { load(); }, []);

  const load = async () => {
    try { const { data } = await api.get('/sections'); setItems(data); } catch (err) { setError(err.response?.data?.error || 'Load failed'); }
  };

  const createSection = async (e) => {
    e.preventDefault();
    try {
      await api.post('/sections', { sectionName, classId: classId ? Number(classId) : undefined });
      setSectionName(''); setClassId('');
      load();
    } catch (err) { setError(err.response?.data?.error || 'Create failed'); }
  };

  const deleteSection = async (id) => { if (!confirm('Delete section?')) return; await api.delete(`/sections/${id}`); load(); };

  return (
    <div>
      <h2>Sections</h2>
      <form onSubmit={createSection} style={{ marginBottom: 16 }}>
        <input placeholder="Section name" value={sectionName} onChange={(e)=>setSectionName(e.target.value)} required />
        <input placeholder="Class ID" value={classId} onChange={(e)=>setClassId(e.target.value)} style={{ marginLeft:8 }} />
        <button type="submit" style={{ marginLeft:8 }}>Add</button>
      </form>
      {error && <div style={{ color:'red' }}>{error}</div>}
      <ul>{items.map(item => <li key={item.sectionId}>{item.sectionName} (class {item.classId}) <button onClick={() => deleteSection(item.sectionId)}>Delete</button></li>)}</ul>
    </div>
  );
}
