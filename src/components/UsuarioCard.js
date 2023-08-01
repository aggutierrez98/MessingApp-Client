import { useState } from "react";
import Modal from "react-modal";
import { ConfirmacionAgregar } from "./ConfirmacionAgregar";
import { ConfirmacionEliminar } from "./ConfirmacionEliminar";

export const UsuarioCard = ({
	nombre,
	email,
	imagen,
	descripcion,
	uid,
	operacion,
}) => {
	Modal.setAppElement(document.getElementById("modal"));

	const [modalIsOpen, setIsOpen] = useState({
		agregarModal: false,
		eliminarModal: false,
	});

	function empezarAgregar() {
		setIsOpen({
			agregarModal: true,
			eliminarModal: false,
		});
	}

	function empezarEliminar() {
		setIsOpen({
			agregarModal: false,
			eliminarModal: true,
		});
	}

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<div className="usuario-card_container">
			<img
				className="usuario-card_imagen"
				alt={nombre}
				src={
					imagen
						? imagen
						: "https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg"
				}
			/>
			<div className="usuario-card_nombres-container">
				<h4 className="usuario-card_name">{nombre}</h4>
				<p className="usuario-card_email">{email}</p>
			</div>
			<div className="usuario-card_container-button">
				{operacion === "agregar" && (
					<button
						type="button"
						onClick={empezarAgregar}
						className="usuario-card_button"
					>
						<ion-icon name="person-add" />
					</button>
				)}
				{operacion === "eliminar" && (
					<button type="button" className="usuario-card_button">
						{/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
						<ion-icon onClick={empezarEliminar} name="person-remove" />
					</button>
				)}
			</div>

			<Modal
				isOpen={modalIsOpen.eliminarModal}
				// onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				className="modal"
				overlayClassName="overlay"
			>
				<ConfirmacionEliminar closeModal={closeModal} uid={uid} />
			</Modal>

			<Modal
				isOpen={modalIsOpen.agregarModal}
				// onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				className="modal"
				overlayClassName="overlay"
			>
				<ConfirmacionAgregar
					closeModal={closeModal}
					usuario={{ nombre, email, imagen, descripcion, _id: uid }}
				/>
			</Modal>
		</div>
	);
};
