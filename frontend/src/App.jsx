import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Organizations from './pages/Organizations.jsx';
import Classes from './pages/Classes.jsx';
import Sections from './pages/Sections.jsx';
import TeacherAssignment from './pages/TeacherAssignment.jsx';
import Students from './pages/Students.jsx';
import Parents from './pages/Parents.jsx';
import Messaging from './pages/Messaging.jsx';

export default function App() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>SchoolOrg Messaging</h1>
      <div style={{ marginBottom: 12 }}>
        {user ? (
          <>
            <span style={{ marginRight: 10 }}>Hello, {user.name} ({user.role})</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">Dashboard</Link> | <Link to="/organizations">Organizations</Link> | <Link to="/classes">Classes</Link> | <Link to="/sections">Sections</Link> | <Link to="/teacher-assignment">Teacher Assignment</Link> | <Link to="/students">Students</Link> | <Link to="/parents">Parents</Link> | <Link to="/messaging">Messaging</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login onLogin={(u) => setUser(u)} />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/sections" element={<Sections />} />
        <Route path="/teacher-assignment" element={<TeacherAssignment />} />
        <Route path="/students" element={<Students />} />
        <Route path="/parents" element={<Parents />} />
        <Route path="/messaging" element={<Messaging />} />
      </Routes>
    </div>
  );
}


