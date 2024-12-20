import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from './firebaseConfig'; 
import "../Login.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Iniciar sesión en Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Obtener datos adicionales del usuario desde Firestore
      const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
      if (userDoc.exists()) {
        console.log('Datos del usuario:', userDoc.data());
        navigate('/'); 
      } else {
        console.error('No se encontraron datos adicionales del usuario en Firestore.');
      }
    } catch{
      console.error('Error al iniciar sesión, contraseña o mail incorrectos');
      setError('Error al iniciar sesión, contraseña o mail incorrectos');
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-header">
        <h1>Login</h1>
      </div>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Ingresar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="registro-link">
        <p>¿No tienes una cuenta? <Link to="/Registro">Regístrate aquí</Link></p>
      </div>
    </div>
  );
}

export default Login;
