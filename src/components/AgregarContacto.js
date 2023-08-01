import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cargando from "../assets/cargando.png";
import { cargarUsuariosRestantesAsync } from "../store/slices/contacts.slice";
import { UsuarioCard } from "./UsuarioCard";

export const AgregarContacto = () => {
	const dispatch = useDispatch();
	const inputRef = useRef();

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	const { usuariosRestantes } = useSelector((state) => state.contactos);

	const [email, setEmail] = useState("");

	const [busqueda, setBusqueda] = useState({
		filtrado: false,
		loading: false,
	});

	const onChangeEmail = ({ target }) => {
		setEmail(target.value);
	};

	const buscarUsuario = (e) => {
		e.preventDefault();

		if (email !== "") {
			dispatch(cargarUsuariosRestantesAsync({ email, setBusqueda }));
		}
	};

	return (
		<>
			<form className="agregar-contacto_formulario" onSubmit={buscarUsuario}>
				{busqueda.loading && (
					<img
						src={cargando}
						alt="icono-de-carga"
						className="agregar-contacto__icono-de-carga"
					/>
				)}
				<input
					ref={inputRef}
					className="agregar-contacto_input"
					placeholder="Buscar por email"
					type="text"
					onChange={onChangeEmail}
				/>
				<button className="agregar-contacto_button" type="submit">
					Buscar
				</button>
			</form>

			{busqueda.filtrado &&
				(usuariosRestantes.length > 0 ? (
					<div className="agregar-contactos_container">
						{usuariosRestantes.map((usuario) => (
							<UsuarioCard
								{...usuario}
								key={usuario.uid}
								operacion={"agregar"}
							/>
						))}
					</div>
				) : (
					<div className="agregar-contactos_no-encontrados_container">
						<p className="agregar-contactos_no-encontrados_texto">
							No se encuentran usuarios
						</p>
					</div>
				))}
		</>
	);
};
