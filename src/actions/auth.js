import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import { descargarChats } from "./chat";
import { cargarContactos, cargarNotificaciones, descargarContactos } from "./contactos";
import { cargarDatos, descargarDatos } from "./usuario";

export const startRegister = async (nombre, email, password, setFieldError, setSubmitting, navigate) => {
    const resp = await fetchSinToken("login/new", { nombre, email, password }, "POST")
    const { ok, errors } = resp;

    if (ok) {
        navigate({
            to:  "/send-email",
            state: {
                usuario: {
                    nombre, email, password
                }
            }
        })
     
    } else {
        setFieldError("name", errors[0].msg);
        setFieldError("email", errors[0].msg);
        setFieldError("password", errors[0].msg);
        setSubmitting(false)
    }
}

export const startLogin = (email, password) => {
    return async (dispatch) => {

        const resp = await fetchSinToken("login", { email, password }, "POST");

        if (resp.ok) {
            localStorage.setItem("token", resp.token);

            const { usuario } = resp;

            dispatch(login(usuario));
            dispatch(cargarDatos(usuario))
            dispatch(cargarContactos(usuario.contactos));
            dispatch(cargarNotificaciones(usuario.notificaciones));

        } else {
            throw new Error(resp.msg)
        }
    }
};

const login = () => ({
    type: types.loginUsuario,
})

export const startLogout = () => {

    return async (dispatch) => {

        localStorage.removeItem("token");

        dispatch(logout());
        dispatch(descargarDatos());
        dispatch(descargarChats());
        dispatch(descargarContactos());

        dispatch({
            type: types.limpiarMensajes
        });
    }
};

const logout = () => ({
    type: types.logoutUsuario
})

export const verificaToken = () => {

    return async (dispatch) => {

        const token = localStorage.getItem("token");

        //Si el token no existe
        if (!token) {
            dispatch({
                type: types.tokenInvalido
            })
            dispatch(descargarDatos())

        } else {

            const resp = await fetchConToken("login/renew");

            if (resp.ok) {

                localStorage.setItem("token", resp.token);

                const { usuario } = resp;

                dispatch(login());
                dispatch(cargarDatos(usuario))
                dispatch(cargarContactos(usuario.contactos));
                dispatch(cargarNotificaciones(usuario.notificaciones));

            } else {
                dispatch({
                    type: types.tokenInvalido
                })
                dispatch(descargarDatos())
            }

        }
    }
};

