import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchConToken } from "../../helpers/fetch";

export const agregarContactoAsync = createAsyncThunk(
	"contacts/add",
	async ({ contacto, uid, idNotificacion, socket }, thunkApi) => {
		const { _id, ...de } = contacto;
		de.uid = contacto._id;

		const promise = Promise.all([
			fetchConToken(`login/contacts/${de.uid}`, { id: uid }, "PUT"),
			fetchConToken(`login/contacts/${uid}`, { id: de.uid }, "PUT"),
		])
			.then((resolve) => {
				thunkApi.dispatch(eliminarNotificacion(idNotificacion));

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
	},
);

export const eliminarContactoAsync = createAsyncThunk(
	"contacts/delete",
	async ({ id, uid, socket }, thunkApi) => {
		const promise = Promise.all([
			fetchConToken(`login/contacts/${id}`, { id: uid }, "DELETE"),
			fetchConToken(`login/contacts/${uid}`, { id }, "DELETE"),
		])
			.then((resolve) => {
				thunkApi.dispatch(eliminarContacto(id));

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
	},
);

export const cargarUsuariosRestantesAsync = createAsyncThunk(
	"contacts/load",
	async ({ email, setBusqueda }, thunkApi) => {
		setBusqueda({
			filtrado: false,
			loading: true,
		});

		const { ok, usuarios } = await fetchConToken(`login/users/${email}`, "GET");

		if (ok) {
			thunkApi.dispatch(cargarUsuariosRestantes(usuarios));
			setBusqueda({
				filtrado: true,
				loading: false,
			});
		} else {
			throw new Error("Error al cargar usuarios");
		}
	},
);

export const nuevaNotificacionAsync = createAsyncThunk(
	"contacts/load",
	async ({ de, para, socket }, thunkApi) => {
		const { notificacion, ok } = await fetchConToken(
			"login/contacts/notification",
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
	},
);

export const eliminarNotificacionAsync = createAsyncThunk(
	"contacts/load",
	async ({ id }, thunkApi) => {
		const { ok } = await fetchConToken(
			`login/contacts/notification/${id}`,
			{},
			"DELETE",
		);

		if (ok) {
			thunkApi.dispatch(eliminarNotificacion(id));
		} else {
			throw new Error("Error al eliminar notificacion");
		}
	},
);

export const contactsSlice = createSlice({
	name: "contacts",
	initialState: {
		contactos: [],
		usuariosRestantes: [],
		notificaciones: [],
	},
	reducers: {
		cargarNotificaciones: (state, { payload, type }) => {
			state.notificaciones = payload;
		},
		cargarContactos: (state, { payload, type }) => {
			const contactos = payload.map((contacto) => {
				const { _id, ...contactoRetornado } = contacto;
				contactoRetornado.uid = contacto._id;
				return contactoRetornado;
			});
			state.contactos = contactos;
		},
		contactoConectado: (state, { payload, type }) => {
			const contacto = state.contactos.find(({ uid }) => uid === payload);
			if (contacto) contacto.online = true;
		},
		contactoDesconectado: (state, { payload, type }) => {
			const contacto = state.contactos.find(({ uid }) => uid === payload);
			if (contacto) contacto.online = false;
		},
		cargarUsuariosRestantes: (state, { payload, type }) => {
			state.usuariosRestantes = payload;
		},
		agregarContacto: (state, { payload, type }) => {
			state.contactos.push(payload);
		},
		eliminarContacto: (state, { payload, type }) => {
			state.contactos.filter((contacto) => contacto.uid !== payload);
		},
		nuevaNotificacion: (state, { payload, type }) => {
			state.notificaciones.push(payload);
		},
		eliminarNotificacion: (state, { payload, type }) => {
			state.notificaciones.filter(
				(notificacion) => notificacion._id !== payload,
			);
		},
		limpiarContactos: (state) => {
			state.contactos = [];
			state.usuariosRestantes = [];
			state.notificaciones = [];
		},
	},
});

export const contactsReducer = contactsSlice.reducer;
export const {
	cargarNotificaciones,
	cargarContactos,
	contactoConectado,
	contactoDesconectado,
	cargarUsuariosRestantes,
	agregarContacto,
	eliminarContacto,
	nuevaNotificacion,
	eliminarNotificacion,
	limpiarContactos,
} = contactsSlice.actions;
