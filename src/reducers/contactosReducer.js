import { types } from "../types/types";

const initialState = {
	contactos: [], // Toodos los usuarios de la base de datos
	usuariosRestantes: [],
	notificaciones: [],
};

export const contactosReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case types.cargarNotificaciones:
			return {
				...state,
				notificaciones: payload,
			};

		case types.cargarContactos:
			const contactos = payload.map((contacto) => {
				const { _id, ...contactoRetornado } = contacto;
				contactoRetornado.uid = contacto._id;
				return contactoRetornado;
			});

			return {
				...state,
				contactos,
			};

		case types.contactoConectado:
			return {
				...state,
				contactos: state.contactos.map((contacto) => {
					if (contacto.uid === payload) {
						contacto.online = true;
					}

					return contacto;
				}),
			};

		case types.contactoDesconectado:
			return {
				...state,
				contactos: state.contactos.map((contacto) => {
					if (contacto.uid === payload) {
						contacto.online = false;
					}

					return contacto;
				}),
			};

		case types.cargarUsuariosRestantes:
			return {
				...state,
				usuariosRestantes: payload,
			};

		case types.agregarContacto:
			return {
				...state,
				contactos: [...state.contactos, payload],
			};

		case types.eliminarContacto:
			return {
				...state,
				contactos: state.contactos.filter(
					(contacto) => contacto.uid !== payload,
				),
			};

		case types.nuevaNotificacion:
			return {
				...state,
				notificaciones: [payload, ...state.notificaciones],
			};

		case types.eliminarNotificacion:
			return {
				...state,
				notificaciones: state.notificaciones.filter(
					(notificacion) => notificacion._id !== payload,
				),
			};

		case types.limpiarContactos:
			return {
				contactos: [],
				usuariosRestantes: [],
				notificaciones: [],
			};

		default:
			return state;
	}
};
