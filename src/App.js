import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import Contacto from './components/Contacto';
import ListaCompras from './components/ListaCompras';
import Form from './components/Form';
import Productos from './components/Productos';
import Nosotros from './components/Nosotros';
import Resultado from './components/Resultado';
import Login from './components/Login'; 
import Registro from './components/Registro';
import ABM from './components/ABM'; 

import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null); 
  const [userName, setUserName] = useState(''); 
  const [userRole, setUserRole] = useState(''); 
  const [userMenuOpen, setUserMenuOpen] = useState(false); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.nombre); 
            setUserRole(userData.rol); 
          } else {
            console.error('No se encontraron datos del usuario en Firestore.');
            setUserName('');
            setUserRole('');
          }
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
          setUserName('');
          setUserRole('');
        }
      } else {
        setUser(null);
        setUserName('');
        setUserRole('');
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  return (
    <Router>
      <div className='App'>
        <nav>
          <div className="menu-title">Easylist</div>
          <button className="hamburgesa" onClick={toggleMenu}>
            ☰
          </button>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li>
              <Link to='/' onClick={() => setMenuOpen(false)}>Inicio</Link>
            </li>
            <li>
              <Link to='/Contacto' onClick={() => setMenuOpen(false)}>Contacto</Link>
            </li>
            <li>
              <Link to='/Nosotros' onClick={() => setMenuOpen(false)}>Nosotros</Link>
            </li>
            {userRole === 'admin' && (
              <li>
                <Link to='/ABM' onClick={() => setMenuOpen(false)}>ABM</Link>
              </li>
            )}
            {!user ? (
              <li>
                <Link to='/Login' onClick={() => setMenuOpen(false)}>Iniciar Sesión</Link>
              </li>
            ) : (
              <li className="user-menu">
                <button onClick={toggleUserMenu}>
                  {userName || 'Usuario'}
                </button>
                {userMenuOpen && (
                  <ul className="dropdown-menu">
                    <li>
                      <Logout setUser={setUser} setUserName={setUserName} setUserRole={setUserRole} />
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </nav>
      </div>

      <Routes>
        <Route path='/' element={<ListaCompras />} />
        <Route path='/Contacto' element={<Contacto />} />
        <Route path='/form' element={<Form />} />
        <Route path='/productos' element={<Productos />} />
        <Route path='/Nosotros' element={<Nosotros />} />
        <Route path='/Resultado' element={<Resultado />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Registro' element={<Registro />} />
        <Route path='/ABM' element={<ABM />} />
      </Routes>
    </Router>
  );
}

function Logout({ setUser, setUserName, setUserRole }) {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserName('');
      setUserRole('');
      navigate('/'); 
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return <button onClick={handleLogout}>Cerrar Sesión</button>;
}

export default App;
