import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultImage from "../assets/default-user-image.jpg";
import { limpiarMensajes } from "../store/slices/chat.slice";
import { Menu } from "./Menu";
import { PerfilContacto } from "./PerfilContacto";
import { SideOptions } from "./SideOptions";

export const MessageProfile = () => {
	const { chatActivo } = useSelector((state) => state.chat);

	const dispatch = useDispatch();
	const [menu, setMenu] = useState(false);

	const abrirMenu = () => {
		setMenu(!menu);
	};

	const desactivarChat = () => {
		dispatch(limpiarMensajes());
	};

	const buttonRef = useRef(null);

	const [mostrarPerfil, setMostrarPerfil] = useState(false);

	const perfil = () => {
		setMostrarPerfil(!mostrarPerfil);
	};

	return (
		<div className="message-profile">
			<button
				type="button"
				onClick={desactivarChat}
				className="boton-navegacion-atras"
			>
				<ion-icon name="arrow-back" />
			</button>
			<div className="info-contacto">
				<div className="info-contacto-img">
					{chatActivo?.imagen ? (
						<img src={chatActivo?.imagen} alt="sunil" />
					) : (
						<img src={defaultImage} alt="sunil" />
					)}
				</div>
				<div className="info-contacto-nombre">
					<p>{chatActivo?.nombre}</p>
				</div>
			</div>
			<div className="selector__container">
				<button
					type="button"
					className="message-profile-button"
					onClick={abrirMenu}
				>
					<ion-icon ref={buttonRef} name="ellipsis-vertical-circle" />
				</button>

				<Menu render={menu} setRender={setMenu} buttonRef={buttonRef}>
					<button
						type="button"
						onClick={perfil}
						className="menu-usario_button"
						href="#"
					>
						Info del contacto
					</button>
				</Menu>

				<SideOptions
					title={"Contacto"}
					render={mostrarPerfil}
					cerrar={setMostrarPerfil}
				>
					<PerfilContacto />
				</SideOptions>
			</div>
		</div>
	);
};
