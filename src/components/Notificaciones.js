import React from "react";
import { useSelector } from "react-redux";
import { NotificacionCard } from "./NotificacionCard";

export const Notifiaciones = () => {
	const { notificaciones } = useSelector((state) => state.contacts);

	return (
		<>
			<div className="notificaciones__container">
				{notificaciones.map((notificacion) => (
					<NotificacionCard {...notificacion} key={notificacion._id} />
				))}
			</div>
		</>
	);
};
