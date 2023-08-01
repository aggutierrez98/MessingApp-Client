import { useState } from "react";
import { useDispatch } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { editarNombreAsync } from "../store/slices/user.slice";

export const EditarNombre = ({ nombre, uid }) => {
	const dispatch = useDispatch();

	const [editandoNombre, setEditandoNombre] = useState(false);
	const [nombreUser, setNombreUser] = useState(nombre);

	const onChangeNombre = ({ target }) => {
		setNombreUser(target.value);
	};

	const empezarEdicionNombre = () => {
		setEditandoNombre(!editandoNombre);
	};

	const terminarEdicionNombre = (e) => {
		e.preventDefault();
		setEditandoNombre(!editandoNombre);
		dispatch(editarNombreAsync({ nombre: nombreUser, uid }));
	};

	return (
		<div className="perfil_contenedor-info">
			<p className="perfil_contenedor-info_titulo">Tu nombre</p>
			<div className="perfil_info_contenedor">
				{editandoNombre ? (
					<form
						className="perfil_contenedor-info_formulario"
						onSubmit={terminarEdicionNombre}
					>
						<TextareaAutosize
							type="text"
							className=" info-input"
							value={nombreUser}
							onChange={onChangeNombre}
						/>
					</form>
				) : (
					<p className="perfil_contenedor-info_texto">{nombreUser}</p>
				)}
				{editandoNombre ? (
					<button type="button" onClick={terminarEdicionNombre}>
						<ion-icon name="checkmark" />
					</button>
				) : (
					<button type="button" onClick={empezarEdicionNombre}>
						<ion-icon name="pencil" />{" "}
					</button>
				)}
			</div>
		</div>
	);
};
