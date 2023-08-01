import "react-toastify/dist/ReactToastify.css";
import { types } from "../types/types";

export const activarChat = (usuario) => ({
	type: types.activarChat,
	payload: usuario,
});

export const nuevoMensajeContacto = (mensaje) => ({
	type: types.nuevoMensajeContacto,
	payload: mensaje,
});

export const mensajesVistos = (id) => ({
	type: types.mensajesVistos,
	payload: id,
});

export const nuevoMensajeUsuario = (mensaje) => ({
	type: types.nuevoMensajeUsuario,
	payload: mensaje,
});

export const cargarMensajesTotales = (mensajes) => ({
	type: types.cargarMensajesTotales,
	payload: mensajes,
});

export const cargarMensajes = (mensajes, id) => ({
	type: types.cargarMensajes,
	payload: {
		mensajes,
		id,
	},
});

export const limpiarMensajes = () => ({
	type: types.limpiarMensajes,
});

export const cargarUltimosMensajes = () => ({
	type: types.cargarUltimosMensajes,
});

export const chatsRecargados = () => ({
	type: types.chatsRecargados,
});

export const descargarChats = () => ({
	type: types.descargarChats,
});
