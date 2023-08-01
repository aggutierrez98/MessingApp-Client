import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import signoExclamacion from "../assets/signo-de-exclamacion.png";
import { SocketContext } from "../context/SocketContext";
import { nuevaNotificacionAsync } from "../store/slices/contacts.slice";

export const ConfirmacionAgregar = ({ closeModal, usuario }) => {
	const { socket } = useContext(SocketContext);
	const { uid } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const agregar = () => {
		closeModal();

		dispatch(nuevaNotificacionAsync({ de: uid, para: usuario._id, socket }));
	};

	return (
		<div>
			<div className="confirmacion-eliminar-contacto_container">
				<img
					className="confirmacion-eliminar-contacto_imagen"
					src={signoExclamacion}
					alt="advertencia"
				/>
				<h3 className="confirmacion-eliminar-contacto_titulo">
					¿Enviar solicitud de contacto?
				</h3>
				<div className="confirmacion-eliminar-contacto_botones">
					<button
						type="button"
						className="confirmacion-eliminar-contacto_boton confirmar"
						onClick={agregar}
					>
						Confirmar
					</button>
					<button
						type="button"
						className="confirmacion-eliminar-contacto_boton rechazar"
						onClick={closeModal}
					>
						Cancelar
					</button>
				</div>
			</div>
		</div>
	);
};
