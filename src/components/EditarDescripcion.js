import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { editarDescripcionAsync } from "../store/slices/user.slice";

export const EditarDescripcion = ({ descripcion, uid }) => {
	const dispatch = useDispatch();

	const [editandoDescripcion, setEditarDescripcion] = useState(false);
	const [descripcionUser, setdescripcionUser] = useState(descripcion);

	const onChangeDescripcion = ({ target }) => {
		setdescripcionUser(target.value);
	};

	const empezarEdicionDescripcion = () => {
		setEditarDescripcion(!editandoDescripcion);
	};

	const terminarEdicionDescripcion = async () => {
		setEditarDescripcion(!editandoDescripcion);
		dispatch(editarDescripcionAsync({ descripcion: descripcionUser, uid }));
	};

	return (
		<div className="perfil_contenedor-info">
			<p className="perfil_contenedor-info_titulo">Información</p>
			<div className="perfil_info_contenedor">
				{editandoDescripcion ? (
					<form
						className="perfil_contenedor-info_formulario"
						onSubmit={terminarEdicionDescripcion}
					>
						<TextareaAutosize
							type="text"
							className="perfil_contenedor-info_texto info-input"
							value={descripcionUser ? descripcionUser : "Sin informacion"}
							onChange={onChangeDescripcion}
						/>
					</form>
				) : (
					<p type="text" className="perfil_contenedor-info_texto">
						{descripcionUser ? descripcionUser : "Sin informacion"}
					</p>
				)}
				{editandoDescripcion ? (
					<button type="button" onClick={terminarEdicionDescripcion}>
						<ion-icon name="checkmark" />
					</button>
				) : (
					<button type="button" onClick={empezarEdicionDescripcion}>
						<ion-icon name="pencil" />{" "}
					</button>
				)}
			</div>
		</div>
	);
};
