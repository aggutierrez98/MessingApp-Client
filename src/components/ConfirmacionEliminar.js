import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import signoExclamacion from "../assets/signo-de-exclamacion.png";
import { SocketContext } from "../context/SocketContext";
import { eliminarContactoAsync } from "../store/slices/contacts.slice";

export const ConfirmacionEliminar = ({ closeModal, uid: id }) => {
	const dispatch = useDispatch();
	const { socket } = useContext(SocketContext);
	const { uid } = useSelector((state) => state.user);

	const eliminar = () => {
		closeModal();
		dispatch(eliminarContactoAsync({ id, uid, socket }));
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
					¿Seguro desea elminar el contacto?
				</h3>
				<div className="confirmacion-eliminar-contacto_botones">
					<button
						type="button"
						className="confirmacion-eliminar-contacto_boton confirmar"
						onClick={eliminar}
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
