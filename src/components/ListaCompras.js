import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';

function ListaCompras() {
  const [listas, setListas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const listasGuardadas = JSON.parse(localStorage.getItem('listas')) || [];
    setListas(listasGuardadas);
  }, []);

  const eliminarLista = (index) => {
    const nuevasListas = listas.filter((_, i) => i !== index);
    setListas(nuevasListas);
    localStorage.setItem('listas', JSON.stringify(nuevasListas));
  };

  return (
    <div>
      {/* <header>
        <h1>EasyList</h1>
      </header> */}
    <div id="lista-compras">
      <main>
        {listas.map((lista, index) => {
          const totalProductos = lista.productos.length;
          const completados = lista.productos.filter((p) => p.completado).length;
          const porcentaje = (completados / totalProductos) * 100;

          return (
            <div 
              className="card" 
              key={index} 
              onClick={() => navigate(`/productos?listaIndex=${index}`)} 
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
                    eliminarLista(index);
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
    
    </div>
  );
}

export default ListaCompras;
