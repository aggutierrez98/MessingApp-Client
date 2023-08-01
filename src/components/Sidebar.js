import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SidebarChatItem } from "./SidebarChatItem";

export const Sidebar = () => {
	const { contactos } = useSelector((state) => state.contacts);
	const { ultimosMensajes } = useSelector((state) => state.chat);
	const [contactosMostrados, setContactosMostrados] = useState([]);

	useEffect(() => {
		const newContactos = [];

		for (const contacto of contactos) {
			newContactos.push({
				...contacto,
				ultimoMensaje: ultimosMensajes.find(
					(ultimo) => ultimo.contacto === contacto.uid,
				),
			});
		}

		setContactosMostrados(
			newContactos.sort(
				(a, b) =>
					new Date(b.ultimoMensaje.fecha).getTime() -
					new Date(a.ultimoMensaje.fecha).getTime(),
			),
		);
	}, [contactos, ultimosMensajes]);

	return (
		<div className="inbox_chat">
			{contactosMostrados.map((contacto) => (
				<SidebarChatItem key={contacto.uid} usuario={contacto} />
			))}

			{contactosMostrados.length === 0 && (
				<div className="sin-contactos">
					<h3>No tienes contactos</h3>
					<p>Agrega uno para comenzar</p>
				</div>
			)}

			<div className="extra_space" />
		</div>
	);
};
