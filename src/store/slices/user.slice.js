import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchConToken, fetchImagen } from "../../helpers/fetch";

export const editarNombreAsync = createAsyncThunk(
	"user/editName",
	async ({ nombre, uid }, thunkApi) => {
		const promise = fetchConToken(`login/edit/${uid}`, { nombre }, "PUT")
			.then(() => {
				thunkApi.dispatch(editarNombre(nombre));
			})
			.catch(() => {
				throw new Error("Error al cambiar el nombre");
			});

		toast.promise(promise, {
			containerId: "A",
			pending: "Cargando...",
			success: "Nombre cambiado",
			error: "Fallo al cambiar nombre",
		});
	},
);

export const editarDescripcionAsync = createAsyncThunk(
	"user/editDescription",
	async ({ descripcion, uid }, thunkApi) => {
		const promise = fetchConToken(`login/edit/${uid}`, { descripcion }, "PUT")
			.then(() => {
				thunkApi.dispatch(editarDescripcion(descripcion));
			})
			.catch(() => {
				throw new Error("Error al cambiar la descripcion");
			});

		toast.promise(promise, {
			containerId: "A",
			pending: "Cargando...",
			success: "Informacion cambiada correctamente",
			error: "Fallo al cambiar informacion",
		});
	},
);

export const editarImagenAsync = createAsyncThunk(
	"user/editImage",
	async ({ file, uid }, thunkApi) => {
		const promise = fetchImagen(`login/edit/${uid}`, file, "PUT")
			.then(({ imagen }) => {
				thunkApi.dispatch(editarImagen(imagen));
			})
			.catch(() => {
				throw new Error("Error al cambiar la imagen");
			});

		toast.promise(promise, {
			containerId: "A",
			pending: "Cargando...",
			success: "Imagen cambiada correctamente",
			error: "Fallo al cambiar imagen",
		});
	},
);

export const userSlice = createSlice({
	name: "user",
	initialState: {
		uid: null,
		name: null,
		email: null,
		description: "",
		imagen: null,
	},
	reducers: {
		cargarDatos: (state, { payload }) => {
			const usuario = payload;

			return {
				uid: usuario.uid,
				name: usuario.nombre,
				email: usuario.email,
				descripcion: usuario.descripcion,
				imagen: usuario.imagen,
			};
		},
		descargarDatos: (state, { payload }) => {
			return {
				uid: null,
				name: null,
				email: null,
				description: null,
				imagen: null,
			};
		},
		editarNombre: (state, { payload }) => {
			const usuario = payload;

			return {
				uid: usuario.uid,
				name: usuario.nombre,
				email: usuario.email,
				descripcion: usuario.descripcion,
				imagen: usuario.imagen,
			};
		},
		editarDescripcion: (state, { payload }) => {
			return {
				...state,
				descripcion: payload,
			};
		},
		editarImagen: (state, { payload }) => {
			return {
				...state,
				imagen: payload,
			};
		},
	},
});

export const userReducer = userSlice.reducer;
export const {
	cargarDatos,
	descargarDatos,
	editarNombre,
	editarDescripcion,
	editarImagen,
} = userSlice.actions;
