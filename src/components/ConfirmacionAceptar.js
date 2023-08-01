import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import signoExclamacion from "../assets/signo-de-exclamacion.png";
import { SocketContext } from "../context/SocketContext";
import { agregarContactoAsync } from "../store/slices/contacts.slice";

export const ConfirmacionAceptar = ({ closeModal, de, idNotificacion }) => {
	const dispatch = useDispatch();
	const { socket } = useContext(SocketContext);
	const { uid } = useSelector((state) => state.usuario);

	const aceptar = () => {
		closeModal();
		dispatch(
			agregarContactoAsync({ contacto: de, uid, idNotificacion, socket }),
		);
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
					¿Aceptar solicitud de contacto?
				</h3>
				<div className="confirmacion-eliminar-contacto_botones">
					<button
						type="button"
						className="confirmacion-eliminar-contacto_boton confirmar"
						onClick={aceptar}
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
