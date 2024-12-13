import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';

import Contacto from './components/Contacto';
import ListaCompras from './components/ListaCompras';
import Form from './components/Form';
import Productos from './components/Productos';
import Nosotros from './components/Nosotros';
import Resultado from './components/Resultado';
import Login from './components/Login'; // Componente para iniciar sesión
import Registro from './components/Registro'; // Componente para registro

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
            <li>
              <Link to='/Registro' onClick={() => setMenuOpen(false)}>Iniciar Sesión</Link>
            </li>
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
      </Routes>
    </Router>
  );
}

export default App;
