import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import '../style.css';

function Productos() {
  const [lista, setLista] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const db = getFirestore();

  // Obtener el ID de la lista desde los parámetros de la URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const listaId = searchParams.get('listaId'); // Cambié 'listaIndex' por 'listaId'

    if (listaId) {
      const obtenerLista = async () => {
        const usuario = auth.currentUser;
        if (usuario) {
          try {
            // Obtener la lista de Firestore usando el ID del usuario y el ID de la lista
            const listaRef = doc(db, 'usuarios', usuario.uid, 'listas', listaId);
            const docSnap = await getDoc(listaRef);

            if (docSnap.exists()) {
              setLista({ id: listaId, ...docSnap.data() });
            } else {
              console.log('No se encontró la lista.');
            }
          } catch (error) {
            console.error('Error al obtener la lista:', error);
          }
        } else {
          // Si no hay usuario autenticado, redirigir a login
          navigate('/login');
        }
      };

      obtenerLista();
    }
  }, [location.search, auth, db, navigate]);

  // Marcar producto como completado o no completado
  const toggleProductoCompletado = async (productoIndex) => {
    const updatedLista = { ...lista };
    updatedLista.productos[productoIndex].completado = !updatedLista.productos[productoIndex].completado;

    // Actualizar el estado
    setLista(updatedLista);

    try {
      const usuario = auth.currentUser;
      if (usuario) {
        // Actualizar la lista en Firestore
        const listaRef = doc(db, 'usuarios', usuario.uid, 'listas', lista.id);
        await updateDoc(listaRef, { productos: updatedLista.productos });
      }
    } catch (error) {
      console.error('Error al actualizar la lista:', error);
    }
  };

  if (!lista) return <p>Cargando productos...</p>;

  return (
    <div className="productos-container">
      <header className="titulo-producto">
        <h1>Productos</h1>
      </header>
      <div id="productosContainer">
        <div>
          {lista.productos.map((producto, index) => (
            <div className="producto" key={index}>
              <input
                type="checkbox"
                id={`producto${index}`}
                checked={producto.completado}
                onChange={() => toggleProductoCompletado(index)}
              />
              <label htmlFor={`producto${index}`}>
                {producto.nombre} ({producto.cantidad})
              </label>
            </div>
          ))}
        </div>

        <button onClick={() => navigate('/')}>Volver</button>
      </div>
    </div>
  );
}

export default Productos;
