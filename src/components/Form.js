import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';
import { getFirestore, doc, collection, setDoc, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import app from './firebaseConfig';


function Form() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [dia, setDia] = useState('');
  const [productos, setProductos] = useState([{ nombre: '', cantidad: 1 }]);

  const agregarProducto = () => {
    setProductos([...productos, { nombre: '', cantidad: 1 }]);
  };

  const handleProductoChange = (index, field, value) => {
    const nuevosProductos = [...productos];
    nuevosProductos[index][field] = value;
    setProductos(nuevosProductos);
  };

  const eliminarProducto = (index) => {
    const nuevosProductos = productos.filter((_, i) => i !== index);
    setProductos(nuevosProductos);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    agregarLista(nombre, dia, productos);
    navigate('/');
  };

  // Función actualizada para guardar en Firestore
  const agregarLista = async (nombre, dia, productos) => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    try {
      // Obtener el ID del usuario autenticado
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Usuario no autenticado');
      }

      // Referencia a la subcolección de listas del usuario
      const listaRef = collection(db, 'usuarios', user.uid, 'listas');
      
      // Crear un nuevo documento en la subcolección 'listas'
      await addDoc(listaRef, {
        nombre,
        dia,
        productos,
        completado: false,
        creadoEn: new Date(),
      });

      console.log('Lista guardada correctamente en Firestore');
    } catch (error) {
      console.error('Error al guardar la lista en Firestore:', error);
    }
  };

  return (
    <div class="form-container">
      <header class='titulo-form'>
        <h1>Crea tu lista</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre de la Lista:</label>
          <input
            type="text"
            id="nombre"
            placeholder="Ej: Supermercado"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <label htmlFor="dia">Día de la Semana:</label>
          <select
            id="dia"
            required
            value={dia}
            onChange={(e) => setDia(e.target.value)}
          >
            <option value="" disabled>
              Selecciona un día
            </option>
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miércoles">Miércoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
            <option value="Sábado">Sábado</option>
            <option value="Domingo">Domingo</option>
          </select>

          <div id="productosContainer">
            <label>Productos:</label>
            {productos.map((producto, index) => (
              <div className="producto" key={index}>
                <input
                  type="text"
                  placeholder="Producto"
                  className="producto-nombre"
                  required
                  value={producto.nombre}
                  onChange={(e) =>
                    handleProductoChange(index, 'nombre', e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Cantidad"
                  className="producto-cantidad"
                  min="1"
                  required
                  value={producto.cantidad}
                  onChange={(e) =>
                    handleProductoChange(index, 'cantidad', e.target.value)
                  }
                />
                <button className="eliminarProductoBtn" type="button" onClick={() => eliminarProducto(index)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          <div className="button-container">
            <button type="button" onClick={agregarProducto}>
              Agregar Producto
            </button>
            <button type="submit">Crear Lista</button>
            <button type="button" onClick={() => navigate('/')}>
              Volver
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Form;
