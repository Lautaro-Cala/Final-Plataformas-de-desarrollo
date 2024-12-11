import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Contacto.css";

const Contacto = () => {
	const [formData, setFormData] = useState({
		nombre: '',
		email: '',
		mensaje: ''
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate("/Resultado", { state: { formData } });
	};

	return (
		<div className="contacto-container">
			<div className="contacto-header">
				<h1>Contacto</h1>
			</div>
			<div className="contacto-content">
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Nombre:</label>
						<input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required/>
					</div>
					<div className="form-group">
						<label>Correo Electrónico:</label>
						<input type="email" name="email" value={formData.email} onChange={handleChange} required/>
					</div>
					<div className="form-group">
						<label>Mensaje:</label>
						<textarea name="mensaje" value={formData.mensaje} onChange={handleChange} required/>
					</div>
					<button type="submit">Enviar</button>
				</form>
			</div>
		</div>
	);
};

export default Contacto;
