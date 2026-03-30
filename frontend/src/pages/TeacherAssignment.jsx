import { useEffect, useState } from "react";
import api from "../api.js";

export default function TeacherAssignment() {
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState("");
  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => { load(); }, []);

  const load = async () => {
    try { const { data } = await api.get('/teacher-assignments'); setItems(data); } catch (err) { setError(err.response?.data?.error || 'Load failed'); }
  };

  const createAssignment = async (e) => {
    e.preventDefault();
    try {
      await api.post('/teacher-assignments', { userId: Number(userId), classId: Number(classId), sectionId: sectionId ? Number(sectionId) : null });
      setUserId(''); setClassId(''); setSectionId('');
      load();
    } catch (err) { setError(err.response?.data?.error || 'Create failed'); }
  };

  const deleteAssignment = async (id) => { if (!confirm('Delete assignment?')) return; await api.delete(`/teacher-assignments/${id}`); load(); };

  return (
    <div>
      <h2>Teacher Assignment</h2>
      <form onSubmit={createAssignment} style={{ marginBottom: 16 }}>
        <input value={userId} onChange={(e)=>setUserId(e.target.value)} placeholder="Teacher userId" required />
        <input value={classId} onChange={(e)=>setClassId(e.target.value)} placeholder="ClassId" required style={{ marginLeft: 8 }} />
        <input value={sectionId} onChange={(e)=>setSectionId(e.target.value)} placeholder="SectionId or empty" style={{ marginLeft: 8 }} />
        <button type="submit" style={{ marginLeft: 8 }}>Add</button>
      </form>
      {error && <div style={{ color:'red' }}>{error}</div>}
      <ul>{items.map(item => <li key={item.id}>T{item.userId} C{item.classId} S{item.sectionId || 'ALL'} <button onClick={() => deleteAssignment(item.id)}>Delete</button></li>)}</ul>
    </div>
  );
}
