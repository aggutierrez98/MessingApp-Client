import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
	name: "chat",
	initialState: {
		loaded: false,
		mensajesTotales: [],
		ultimosMensajes: [],
		chatActivo: {},
		mensajes: [],
	},
	reducers: {
		activarChat: (state, action) => {
			state.chatActivo = action.payload;
			state.mensajes = [];
		},
		nuevoMensajeUsuario: (state, action) => {
			const mensajesAEditar = state.mensajesTotales.mensajesPorContacto.find(
				({ contacto }) => contacto === action.payload.para,
			);
			if (mensajesAEditar) {
				mensajesAEditar.mensajesContacto.push(action.payload);
				mensajesAEditar.ultimoMensaje = {
					mensaje: action.payload.mensaje,
					fecha: action.payload.createdAt,
					contacto: action.payload.para,
				};
				state.mensajes.push(action.payload);
			}
		},
		nuevoMensajeContacto: (state, action) => {
			const mensajesAEditar = state.mensajesTotales.mensajesPorContacto.find(
				({ contacto }) => contacto === action.payload.de,
			);
			if (mensajesAEditar) {
				if (!mensajesAEditar.ultimoMensaje.nuevosMensajes) {
					mensajesAEditar.ultimoMensaje.nuevosMensajes = 0;
				}
				mensajesAEditar.mensajesContacto.push(action.payload);

				mensajesAEditar.ultimoMensaje = {
					mensaje: action.payload.mensaje,
					fecha: action.payload.createdAt,
					contacto: action.payload.de,
					nuevosMensajes: mensajesAEditar.ultimoMensaje.nuevosMensajes,
				};

				if (action.payload.de !== state.chatActivo.uid) {
					mensajesAEditar.ultimoMensaje.nuevosMensajes =
						mensajesAEditar.ultimoMensaje.nuevosMensajes + 1;
				}

				state.mensajes.push(action.payload);
			}
		},
		mensajesVistos: (state, action) => {
			const mensajesAEditar = state.mensajesTotales.mensajesPorContacto.find(
				({ contacto }) => contacto === action.payload.de,
			);
			if (mensajesAEditar) {
				mensajesAEditar.ultimoMensaje.nuevosMensajes = 0;
			}
		},
		cargarMensajes: (state, action) => {
			const mensajesFinal = state.mensajesTotales.mensajesPorContacto.find(
				(mensajesPorContacto) =>
					mensajesPorContacto.contacto === action.payload.id,
			)?.mensajesContacto;

			state.mensajes = mensajesFinal;
		},
		limpiarMensajes: (state, action) => {
			state.chatActivo = null;
			state.mensajes = [];
		},
		cargarUltimosMensajes: (state, action) => {
			state.loaded = true;
			const mensajesFinal = state.mensajesTotales.mensajesPorContacto.map(
				(mensajesPorContacto) => mensajesPorContacto.ultimoMensaje,
			);
			state.ultimosMensajes = mensajesFinal;
		},
		cargarMensajesTotales: (state, action) => {
			state.mensajesTotales = action.payload;
		},
		descargarChats: (state, action) => {
			state.chatActivo = false;
			state.loaded = [];
			state.mensajes = [];
			state.mensajesTotales = {};
			state.ultimosMensajes = [];
		},
	},
});

export const chatReducer = chatSlice.reducer;
export const {
	activarChat,
	nuevoMensajeUsuario,
	nuevoMensajeContacto,
	mensajesVistos,
	cargarMensajes,
	limpiarMensajes,
	cargarUltimosMensajes,
	cargarMensajesTotales,
	descargarChats,
} = chatSlice.actions;
