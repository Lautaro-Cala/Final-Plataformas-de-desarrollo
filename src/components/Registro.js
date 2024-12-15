import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import app from './firebaseConfig'; 
import "../Login.css";

function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleRegistro = async (e) => {
    e.preventDefault();

    // Validación del formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Formato de correo electrónico inválido.');
      return;
    }

    try {
      // Registrar al usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar información adicional en Firestore
      await setDoc(doc(db, 'usuarios', user.uid), {
        nombre,
        email,
        rol: 'usuario', 
      });

      console.log('Registro exitoso y datos guardados en Firestore');
      navigate('/'); 
    } catch (error) {
      console.error('Error al registrar:', error.message);
      setError('Error al registrar usuario: ' + error.message);
    }
  };

  return (
    <div className="registro-container">
        <div className="registro-header">
          <h1>Registro</h1>
        </div>
      <form onSubmit={handleRegistro}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrarse</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Registro;
