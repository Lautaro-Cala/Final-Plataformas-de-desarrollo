import React from 'react';
import { useLocation } from 'react-router-dom';
import '../Resultado.css';

const Resultado = () => {
    const location = useLocation();
    const { formData } = location.state || {};

    return (
        <div id="resultado-container">
            <h2>Resultado</h2>
            {formData ? (
                <div className="resultado-detalle">
                    <p>Nombre: {formData.nombre}</p>
                    <p>Email: {formData.email}</p>
                    <p>Mensaje: {formData.mensaje}</p>
                </div>
            ) : (
                <p className="no-datos">No se recibieron datos</p>
            )}
        </div>
    );
};

export default Resultado;
