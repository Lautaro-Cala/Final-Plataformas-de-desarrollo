import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../style.css';



function Productos() {
  const [lista, setLista] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener el índice de la lista desde los parámetros de la URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const listaIndex = searchParams.get('listaIndex');

    const listas = JSON.parse(localStorage.getItem('listas')) || [];
    if (listaIndex !== null && listas[listaIndex]) {
      setLista({ ...listas[listaIndex], index: listaIndex });
    }
  }, [location.search]);

  // Marcar producto como completado o no completado
  const toggleProductoCompletado = (productoIndex) => {
    const updatedLista = { ...lista };
    updatedLista.productos[productoIndex].completado = !updatedLista.productos[productoIndex].completado;

    // Actualizar el estado y guardar en localStorage
    setLista(updatedLista);
    const listas = JSON.parse(localStorage.getItem('listas')) || [];
    listas[lista.index] = updatedLista;
    localStorage.setItem('listas', JSON.stringify(listas));
  };

  if (!lista) return <p>Cargando productos...</p>;

  return (
    <div class="productos-container">
        <header class="titulo-producto">
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
