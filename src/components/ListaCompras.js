import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import '../style.css';

function ListaCompras() {
  const [listas, setListas] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const obtenerListas = async () => {
      const usuario = auth.currentUser;
      if (usuario) {
        const listasRef = collection(db, 'usuarios', usuario.uid, 'listas');
        const q = query(listasRef);
        const querySnapshot = await getDocs(q);
        
        const listasData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setListas(listasData);
      } else {
        // Si no hay usuario autenticado, redirigir a login
        navigate('/login');
      }
    };

    obtenerListas();
  }, [auth, db, navigate]);

  const eliminarLista = async (id) => {
    const usuario = auth.currentUser;
    if (usuario) {
      try {
        const listaRef = doc(db, 'usuarios', usuario.uid, 'listas', id);
        await deleteDoc(listaRef);
        setListas(listas.filter((lista) => lista.id !== id)); 
      } catch (error) {
        console.error('Error al eliminar la lista:', error);
      }
    }
  };

  return (
    <div id="lista-compras">
      <main>
        {listas.map((lista) => {
          const totalProductos = lista.productos.length;
          const completados = lista.productos.filter((p) => p.completado).length;
          const porcentaje = (completados / totalProductos) * 100;

          return (
            <div 
              className="card" 
              key={lista.id} 
              onClick={() => navigate(`/productos?listaId=${lista.id}`)} 
            >
              <div className="card-content">
                <h3>
                  {lista.dia}: {lista.nombre}
                </h3>
                <div className="progress-bar-section">
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar"
                      style={{ width: `${porcentaje}%` }}
                    ></div>
                  </div>
                  <span className="product-count">
                    {completados}/{totalProductos}
                  </span>
                </div>
                <button 
                  className="eliminarLista" 
                  onClick={(e) => {
                    e.stopPropagation(); 
                    eliminarLista(lista.id);
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          );
        })}
      </main>
      
      <button onClick={() => navigate('/Form')} className="agregar-lista-btn">
        Agregar Lista
      </button>
    </div>
  );
}

export default ListaCompras;
