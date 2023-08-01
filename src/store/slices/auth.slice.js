import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchConToken, fetchSinToken } from "../../helpers/fetch";
import { descargarChats, limpiarMensajes } from "./chat.slice";
import {
	cargarContactos,
	cargarNotificaciones,
	limpiarContactos,
} from "./contacts.slice";
import { cargarDatos, descargarDatos } from "./user.slice";

export const registerAsync = createAsyncThunk(
	"auth/register",
	async ({ nombre, email, password }) => {
		const resp = await fetchSinToken(
			"login/new",
			{ nombre, email, password },
			"POST",
		);
		return resp;
	},
);

export const loginAsync = createAsyncThunk(
	"auth/login",
	async ({ email, password }, thunkApi) => {
		const resp = await fetchSinToken("login", { email, password }, "POST");
		if (resp.ok) {
			localStorage.setItem("token", resp.token);
			const { usuario } = resp;
			thunkApi.dispatch(login());
			thunkApi.dispatch(cargarDatos(usuario));
			thunkApi.dispatch(cargarContactos(usuario.contactos));
			thunkApi.dispatch(cargarNotificaciones(usuario.notificaciones));
		} else {
			throw new Error(resp.msg);
		}
	},
);

export const logoutAsync = createAsyncThunk(
	"auth/logout",
	async (_, thunkApi) => {
		localStorage.removeItem("token");
		thunkApi.dispatch(logout());
		thunkApi.dispatch(descargarDatos());
		thunkApi.dispatch(descargarChats());
		thunkApi.dispatch(limpiarContactos());
		thunkApi.dispatch(limpiarMensajes());
	},
);

export const verificaTokenAsync = createAsyncThunk(
	"auth/verify",
	async (_, thunkApi) => {
		const token = localStorage.getItem("token");

		//Si el token no existe
		if (!token) {
			thunkApi.dispatch(tokenInvalido());
			thunkApi.dispatch(descargarDatos());
		} else {
			const resp = await fetchConToken("login/renew");

			if (resp.ok) {
				localStorage.setItem("token", resp.token);

				const { usuario } = resp;
				thunkApi.dispatch(login());
				thunkApi.dispatch(cargarDatos(usuario));
				thunkApi.dispatch(cargarContactos(usuario.contactos));
				thunkApi.dispatch(cargarNotificaciones(usuario.notificaciones));
			} else {
				thunkApi.dispatch(tokenInvalido());
				thunkApi.dispatch(descargarDatos());
			}
		}
	},
);

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		checking: true,
		logged: false,
	},
	reducers: {
		login: () => {
			return {
				checking: false,
				logged: true,
			};
		},
		logout: (state) => {
			return {
				...state,
				checking: false,
				logged: false,
			};
		},
		tokenInvalido: () => {
			return {
				checking: false,
				logged: false,
			};
		},
	},
});

export const authReducer = authSlice.reducer;
export const { logout, login, tokenInvalido } = authSlice.actions;
