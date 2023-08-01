import { toast } from "react-toastify";
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

export const cargarContactos = (usuarios) => ({
	type: types.cargarContactos,
	payload: usuarios,
});

export const contactoConectado = (id) => ({
	type: types.contactoConectado,
	payload: id,
});

export const contactoDesconectado = (id) => ({
	type: types.contactoDesconectado,
	payload: id,
});

export const agregandoContactos = (contacto, uid, idNotificacion, socket) => {
	return async (dispatch) => {
		const { _id, ...de } = contacto;
		de.uid = contacto._id;

		const promise = Promise.all([
			fetchConToken(`login/contacts/${de.uid}`, { id: uid }, "PUT"),
			fetchConToken(`login/contacts/${uid}`, { id: de.uid }, "PUT"),
		])
			.then((resolve) => {
				dispatch(eliminarNotificacion(idNotificacion));

				socket.emit("solicitud-aceptada", {
					de: uid,
					para: de.uid,
				});
			})
			.catch((error) => {
				throw new Error("Error al agregar contacto, error: \n", error);
			});

		toast.promise(promise, {
			containerId: "A",
			pending: "Cargando...",
			success: "Solicitud de contacto aceptada",
			error: "Fallo al agregar contacto",
		});
	};
};

export const agregarContactoSincronico = (usuario) => ({
	type: types.agregarContacto,
	payload: usuario,
});

export const eliminarContacto = (id, uid, socket) => {
	return async (dispatch) => {
		const promise = Promise.all([
			fetchConToken(`login/contacts/${id}`, { id: uid }, "DELETE"),
			fetchConToken(`login/contacts/${uid}`, { id }, "DELETE"),
		])
			.then((resolve) => {
				dispatch(eliminarContactoSincronico(id));

				socket.emit("contacto-eliminado", {
					de: uid,
					para: id,
				});
			})
			.catch((error) => {
				throw new Error("Error al eliminar contacto, error: \n", error);
			});

		toast.promise(promise, {
			pending: "Cargando...",
			success: "Contacto eliminado",
			error: "Fallo al eliminar contacto",
		});
	};
};

export const eliminarContactoSincronico = (id) => ({
	type: types.eliminarContacto,
	payload: id,
});

export const startCargarUsuariosRestantes = (email, setBusqueda) => {
	return async (dispatch) => {
		setBusqueda({
			filtrado: false,
			loading: true,
		});

		const { ok, usuarios } = await fetchConToken(`login/users/${email}`, "GET");

		if (ok) {
			dispatch(cargarUsuariosRestantes(usuarios));
			setBusqueda({
				filtrado: true,
				loading: false,
			});
		} else {
			throw new Error("Error al cargar usuarios");
		}
	};
};

const cargarUsuariosRestantes = (usuarios) => ({
	type: types.cargarUsuariosRestantes,
	payload: usuarios,
});

export const cargarNotificaciones = (notificaciones) => ({
	type: types.cargarNotificaciones,
	payload: notificaciones,
});

export const nuevaNotificacion = (de, para, socket) => {
	return async (dispatch) => {
		const { notificacion, ok } = await fetchConToken(
			`login/contacts/notification`,
			{ de, para },
			"POST",
		);

		if (ok) {
			socket.emit("solicitud-contacto", {
				notificacion,
				para,
			});

			toast.success("Enviada solicitud de contacto", { containerId: "A" });
		} else {
			throw new Error("Error al agregar notificacion");
		}
	};
};

export const nuevaNotificacionSincrono = (notificacion) => ({
	type: types.nuevaNotificacion,
	payload: notificacion,
});

export const eliminarNotificacion = (id) => {
	return async (dispatch) => {
		const { ok } = await fetchConToken(
			`login/contacts/notification/${id}`,
			{},
			"DELETE",
		);

		if (ok) {
			dispatch(eliminarNotificacionSincrono(id));
		} else {
			throw new Error("Error al eliminar notificacion");
		}
	};
};

const eliminarNotificacionSincrono = (id) => ({
	type: types.eliminarNotificacion,
	payload: id,
});

export const descargarContactos = () => ({
	type: types.limpiarContactos,
});
