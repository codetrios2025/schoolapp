import { useEffect, useState } from "react";
import api from "../api.js";

export default function Students(){
  const [items, setItems] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [parentId, setParentId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => { load(); }, []);

  const load = async () => {
    try { const { data } = await api.get('/students'); setItems(data); } catch (err) { setError(err.response?.data?.error || 'Load failed'); }
  };

  const createStudent = async (e) => {
    e.preventDefault();
    try {
      await api.post('/students', { studentName, rollNumber, classId: Number(classId), sectionId: Number(sectionId), parentId: Number(parentId) });
      setStudentName(''); setRollNumber(''); setClassId(''); setSectionId(''); setParentId('');
      load();
    } catch (err) { setError(err.response?.data?.error || 'Create failed'); }
  };

  const deleteStudent = async (id) => { if (!confirm('Delete student?')) return; await api.delete(`/students/${id}`); load(); };

  return (
    <div>
      <h2>Students</h2>
      <form onSubmit={createStudent} style={{ marginBottom: 16 }}>
        <input value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="Name" required />
        <input value={rollNumber} onChange={e => setRollNumber(e.target.value)} placeholder="Roll" style={{ marginLeft:8 }} />
        <input value={classId} onChange={e => setClassId(e.target.value)} placeholder="ClassId" style={{ marginLeft:8 }} required />
        <input value={sectionId} onChange={e => setSectionId(e.target.value)} placeholder="SectionId" style={{ marginLeft:8 }} required />
        <input value={parentId} onChange={e => setParentId(e.target.value)} placeholder="ParentId" style={{ marginLeft:8 }} required />
        <button type="submit" style={{ marginLeft: 8 }}>Add</button>
      </form>
      {error && <div style={{ color:'red'}}>{error}</div>}
      <ul>{items.map(item => <li key={item.studentId}>{item.studentName} ID:{item.studentId} Roll:{item.rollNumber} C{item.classId} S{item.sectionId} P{item.parentId} <button onClick={() => deleteStudent(item.studentId)}>Delete</button></li>)}</ul>
    </div>
  );
}
