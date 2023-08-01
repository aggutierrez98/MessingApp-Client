import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { descargarChats } from "./chat";
import {
	cargarContactos,
	cargarNotificaciones,
	descargarContactos,
} from "./contactos";
import { cargarDatos, descargarDatos } from "./usuario";

export const startRegister = async (nombre, email, password) => {
	const resp = await fetchSinToken(
		"login/new",
		{ nombre, email, password },
		"POST",
	);
	return resp;
};

export const startLogin = (email, password) => {
	return async (dispatch) => {
		const resp = await fetchSinToken("login", { email, password }, "POST");

		if (resp.ok) {
			localStorage.setItem("token", resp.token);

			const { usuario } = resp;

			dispatch(login(usuario));
			dispatch(cargarDatos(usuario));
			dispatch(cargarContactos(usuario.contactos));
			dispatch(cargarNotificaciones(usuario.notificaciones));
		} else {
			throw new Error(resp.msg);
		}
	};
};

const login = () => ({
	type: types.loginUsuario,
});

export const startLogout = () => {
	return async (dispatch) => {
		localStorage.removeItem("token");

		dispatch(logout());
		dispatch(descargarDatos());
		dispatch(descargarChats());
		dispatch(descargarContactos());

		dispatch({
			type: types.limpiarMensajes,
		});
	};
};

const logout = () => ({
	type: types.logoutUsuario,
});

export const verificaToken = () => {
	return async (dispatch) => {
		const token = localStorage.getItem("token");

		//Si el token no existe
		if (!token) {
			dispatch({
				type: types.tokenInvalido,
			});
			dispatch(descargarDatos());
		} else {
			const resp = await fetchConToken("login/renew");

			if (resp.ok) {
				localStorage.setItem("token", resp.token);

				const { usuario } = resp;

				dispatch(login());
				dispatch(cargarDatos(usuario));
				dispatch(cargarContactos(usuario.contactos));
				dispatch(cargarNotificaciones(usuario.notificaciones));
			} else {
				dispatch({
					type: types.tokenInvalido,
				});
				dispatch(descargarDatos());
			}
		}
	};
};
