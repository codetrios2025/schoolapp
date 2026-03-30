import { useEffect, useState } from "react";
import api from "../api.js";

export default function Messaging(){
  const [audienceType,setAudienceType]=useState('all');
  const [classId,setClassId]=useState('');
  const [sectionId,setSectionId]=useState('');
  const [studentIds,setStudentIds]=useState('');
  const [title,setTitle]=useState('');
  const [body,setBody]=useState('');
  const [channels,setChannels]=useState('whatsapp,email');
  const [result,setResult] = useState(null);
  const [classes,setClasses] = useState([]);
  const [sections,setSections] = useState([]);

  useEffect(()=>{
    api.get('/classes').then(r=>setClasses(r.data)).catch(()=>{});
    api.get('/sections').then(r=>setSections(r.data)).catch(()=>{});
  },[]);

  const send = async (e)=>{
    e.preventDefault();
    const payload={ messageTitle:title,messageBody:body,audienceType,channels };
    if(audienceType==='class') payload.classId=Number(classId);
    if(audienceType==='section'){ payload.classId=Number(classId); payload.sectionId=Number(sectionId); }
    if(audienceType==='student') payload.studentIds=studentIds.split(',').map(v=>Number(v.trim())).filter(Boolean);
    try {
      const { data } = await api.post('/messages', payload);
      setResult(`Sent ${data.recipients} recipients`);
    } catch (err) {
      setResult(`Error: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div>
      <h2>Messaging</h2>
      <form onSubmit={send} style={{ display:'grid', gap:'8px', maxWidth:'520px' }}>
        <select value={audienceType} onChange={(e)=>setAudienceType(e.target.value)}>
          <option value="all">All</option>
          <option value="class">Class</option>
          <option value="section">Section</option>
          <option value="student">Student</option>
        </select>
        {audienceType==='class' && (
          <select value={classId} onChange={e=>setClassId(e.target.value)} required>
            <option value="">Select class</option>
            {classes.map(c => <option key={c.classId} value={c.classId}>{c.className}</option>)}
          </select>
        )}
        {audienceType==='section' && (
          <>
            <select value={classId} onChange={e=>setClassId(e.target.value)} required>
              <option value="">Select class</option>
              {classes.map(c => <option key={c.classId} value={c.classId}>{c.className}</option>)}
            </select>
            <select value={sectionId} onChange={e=>setSectionId(e.target.value)} required>
              <option value="">Select section</option>
              {sections.filter(s=>!classId || s.classId===Number(classId)).map(s => <option key={s.sectionId} value={s.sectionId}>{s.sectionName}</option>)}
            </select>
          </>
        )}
        {audienceType==='student' && (
          <input value={studentIds} onChange={e=>setStudentIds(e.target.value)} placeholder="Student IDs, comma separated" required />
        )}
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Message body" rows={4} required />
        <input value={channels} onChange={e=>setChannels(e.target.value)} placeholder="Channels (comma)" />
        <button type="submit">Send</button>
      </form>
      {result && <div style={{ marginTop: 10 }}>{result}</div>}
    </div>
  );
}
