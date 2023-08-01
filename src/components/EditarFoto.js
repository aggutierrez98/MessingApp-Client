import React from "react";
import { useDispatch } from "react-redux";
import defaultImage from "../assets/default-user-image.jpg";
import { editarImagenAsync } from "../store/slices/user.slice";

export const EditarFoto = ({ imagen, uid }) => {
	const dispatch = useDispatch();

	const handlePictureClick = () => {
		document.querySelector("#fileSelector").click();
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			dispatch(editarImagenAsync({ file, uid }));
		}
	};

	return (
		<>
			<input
				id="fileSelector"
				type="file"
				name="file"
				style={{ display: "none" }}
				onChange={handleFileChange}
				accept="image/png,image/jpeg"
			/>
			<div className="perfil_contenedor-imagen">
				{imagen ? (
					<img className="perfil_imagen" src={imagen} alt="sunil" />
				) : (
					<img className="perfil_imagen" src={defaultImage} alt="sunil" />
				)}
				{/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<div
					onClick={handlePictureClick}
					className="perfil_contenedor_seleccionador-archivo"
				>
					<ion-icon name="image" />
					Cambiar foto de perfil
				</div>
			</div>
		</>
	);
};
