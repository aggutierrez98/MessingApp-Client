import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
	name: "chat",
	initialState: {
		loaded: false,
		mensajesTotales: [],
		ultimosMensajes: [], //Ultimo mensaje con cada usuario
		chatActivo: {}, //UID del usuario al que yo quiero enviar mensajes
		mensajes: [], // El chat seleccionado
	},
	reducers: {
		activarChat: (state, action) => {
			if (state.chatActivo === action.payload) return state;

			return {
				...state,
				chatActivo: action.payload,
				mensajes: [],
			};
		},
		nuevoMensajeUsuario: (state, action) => {
			state.mensajesTotales.mensajesPorContacto.forEach((object) => {
				if (object.contacto === action.payload.para) {
					object.mensajesContacto.push(action.payload);
					object.ultimoMensaje = {
						mensaje: action.payload.mensaje,
						fecha: action.payload.createdAt,
						contacto: action.payload.para,
					};
				}
			});

			return {
				...state,
			};
		},
		nuevoMensajeContacto: (state, action) => {
			state.mensajesTotales.mensajesPorContacto.forEach((object) => {
				if (object.contacto === action.payload.de) {
					if (!object.ultimoMensaje.nuevosMensajes) {
						object.ultimoMensaje.nuevosMensajes = 0;
					}

					object.mensajesContacto.push(action.payload);

					object.ultimoMensaje = {
						mensaje: action.payload.mensaje,
						fecha: action.payload.createdAt,
						contacto: action.payload.de,
						nuevosMensajes: object.ultimoMensaje.nuevosMensajes,
					};

					if (action.payload.de !== state.chatActivo.uid) {
						object.ultimoMensaje.nuevosMensajes =
							object.ultimoMensaje.nuevosMensajes + 1;
					}
				}
			});

			return {
				...state,
			};
		},
		mensajesVistos: (state, action) => {
			state.mensajesTotales.mensajesPorContacto.forEach((object) => {
				if (object.contacto === action.payload) {
					object.ultimoMensaje.nuevosMensajes = 0;
				}
			});

			return {
				...state,
			};
		},
		cargarMensajes: (state, action) => {
			return {
				...state,
				mensajes: state.mensajesTotales.mensajesPorContacto.find(
					(mensajesPorContacto) =>
						mensajesPorContacto.contacto === action.payload.id,
				).mensajesContacto,
			};
		},
		limpiarMensajes: (state, action) => {
			return {
				...state,
				chatActivo: null,
				mensajes: [],
			};
		},
		cargarUltimosMensajes: (state, action) => {
			return {
				...state,
				ultimosMensajes: state.mensajesTotales.mensajesPorContacto.map(
					(mensajesPorContacto) => mensajesPorContacto.ultimoMensaje,
				),
				loaded: true,
			};
		},
		cargarMensajesTotales: (state, action) => {
			return {
				...state,
				mensajesTotales: action.payload,
			};
		},
		descargarChats: (state, action) => {
			return {
				loaded: false,
				mensajesTotales: [],
				ultimosMensajes: [],
				chatActivo: {},
				mensajes: [],
			};
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
