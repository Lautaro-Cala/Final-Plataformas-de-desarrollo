import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import app from './firebaseConfig';
import '../ABM.css'; // Importar el archivo CSS actualizado

function ABM() {
  const [usuarios, setUsuarios] = useState([]);
  const db = getFirestore(app);

  // Obtener usuarios desde Firestore
  useEffect(() => {
    const fetchUsuarios = async () => {
      const usuariosSnapshot = await getDocs(collection(db, 'usuarios'));
      const usuariosData = usuariosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsuarios(usuariosData);
    };

    fetchUsuarios();
  }, [db]);

  // Actualizar el rol de un usuario
  const handleRoleChange = async (id, nuevoRol) => {
    const usuarioRef = doc(db, 'usuarios', id);
    await updateDoc(usuarioRef, { rol: nuevoRol });
    setUsuarios(
      usuarios.map((user) => (user.id === id ? { ...user, rol: nuevoRol } : user))
    );
  };

  // Eliminar un usuario
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'usuarios', id));
    setUsuarios(usuarios.filter((user) => user.id !== id));
  };

  return (
    <div className="abm-container"> {/* Clase principal para estilizar el contenedor */}
      <h1>Gestión de Usuarios</h1>
      <table className="abm-table"> {/* Clase para la tabla */}
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.id}>
              <td>{user.nombre}</td>
              <td>{user.email}</td>
              <td>
                <select
                  className="abm-select"
                  value={user.rol}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <button
                  className="abm-button" 
                  onClick={() => handleDelete(user.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ABM;
