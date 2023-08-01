import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../context/SocketContext";
import { horaMes } from "../helpers/horaMes";
import { eliminarNotificacionAsync } from "../store/slices/contacts.slice";
import { ConfirmacionAceptar } from "./ConfirmacionAceptar";

export const NotificacionCard = ({ time, de, _id }) => {
	Modal.setAppElement(document.getElementById("modal"));
	const dispatch = useDispatch();

	const { nombre, email } = de;
	const { socket } = useContext(SocketContext);
	const { uid } = useSelector((state) => state.usuario);

	const [modalIsOpen, setIsOpen] = useState(false);

	const [buttonDisabled, setButtonDisabled] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	const aceptarSolicitud = () => {
		setIsOpen(true);
	};

	const rechazarSolicitud = () => {
		setButtonDisabled(true);
		dispatch(eliminarNotificacionAsync({ id: _id }));

		socket.emit("solicitud-rechazada", {
			de: uid,
			para: de._id,
		});
	};

	return (
		<div className="notificacion--card">
			<div className="notificacion--card__texts--container">
				<h4 className="notificacion--card__title">Solicitud de contacto:</h4>
				<p className="notificacion--card__text">{nombre} </p>
				<p className="notificacion--card__text">{email}</p>
				<p className="notificacion--card__fecha">{horaMes(time)}</p>
			</div>
			<div className="notificacion--card__buttons--container">
				<button
					type="button"
					onClick={aceptarSolicitud}
					className="notificacion--card__button"
					disabled={buttonDisabled}
				>
					<ion-icon name="checkmark-circle" />
				</button>
				<button
					type="button"
					onClick={rechazarSolicitud}
					className="notificacion--card__button"
					disabled={buttonDisabled}
				>
					<ion-icon name="close-circle" />
				</button>
			</div>

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				className="modal"
				overlayClassName="overlay"
			>
				<ConfirmacionAceptar
					closeModal={closeModal}
					de={de}
					idNotificacion={_id}
				/>
			</Modal>
		</div>
	);
};
