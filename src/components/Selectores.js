import { useState } from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { startLogout } from '../actions/auth';
import { useToogleTheme } from '../hooks/useToogleTheme';
import { AgregarContacto } from './AgregarContacto';
import { EliminarContactos } from './EliminarContactos';
import { Menu } from './Menu'
import { Notifiaciones } from './Notificaciones';
import { PerfilUsuario } from './PerfilUsuario';
import { SideOptions } from './SideOptions';

export const Selectores = () => {
    const dispatch = useDispatch();

    const [menuUser, setMenuUser] = useState(false);
    const [menuContacts, setMenuContacts] = useState(false);

    const [mostrarPerfil, setMostrarPerfil] = useState(false);
    const [mostrarContacto, setMostrarContacto] = useState(false);
    const [mostrarEliminar, setMostrarEliminar] = useState(false);
    const [mostarNotificaciones, setMostrarNotificaciones] = useState(false);
    const [themeState, toogleTheme] = useToogleTheme()

    const userButtonRef = useRef(null)
    const contactsButtonRef = useRef(null)

    const desplegarMenuUsuario = () => {
        setMenuUser(!menuUser);
    }

    const desplegarMenuContactos = () => {
        setMenuContacts(!menuContacts);
    }

    const logout = () => {
        dispatch(startLogout());
    }

    const perfil = () => {
        setMostrarPerfil(true);
    }

    const agregarContacto = () => {
        setMostrarContacto(true)
    }

    const eliminarContactos = () => {
        setMostrarEliminar(true)
    }

    const notificaciones = () => {
        setMostrarNotificaciones(true)
    }

    const changeTheme = () => {
        toogleTheme()
    }

    return (
        <>
            <div className="selector__container">
                <button className="message-profile__contacts-button" id="boton-menu" onClick={desplegarMenuContactos}>
                    <ion-icon ref={contactsButtonRef} name="people-outline"></ion-icon>
                </button>
                <Menu render={menuContacts} setRender={setMenuContacts} buttonRef={contactsButtonRef}>
                    <button onClick={agregarContacto} className="menu-usario_button" href="#">Agregar contacto</button>
                    <button onClick={eliminarContactos} className="menu-usario_button" href="#">Eliminar contacto</button>
                    <button onClick={notificaciones} className="menu-usario_button" href="#">Notificaciones</button>
                </Menu>
            </div>
            <div className="selector__container">
            <button onClick={changeTheme} className="message-profile-button">
                    <ion-icon name={themeState ? "sunny-outline" : "moon-outline"} />
            </button>
            </div>
            <div className="selector__container">
                <button className="message-profile-button" id="boton-menu" onClick={desplegarMenuUsuario}>
                    <ion-icon ref={userButtonRef} name="ellipsis-vertical-circle"></ion-icon>
                </button>
                <Menu render={menuUser} setRender={setMenuUser} buttonRef={userButtonRef}>
                    <button onClick={perfil} className="menu-usario_button" href="#">Perfil</button>
                    <button onClick={logout} className="menu-usario_button" href="#">Cerrar sesion</button>
                </Menu>
            </div>

            <SideOptions title={"Mostrar Perfil"} render={mostrarPerfil} cerrar={setMostrarPerfil}>
                <PerfilUsuario />
            </SideOptions>

            <SideOptions title={"Agregar Contacto"} render={mostrarContacto} cerrar={setMostrarContacto}>
                <AgregarContacto />
            </SideOptions>

            <SideOptions title={"Eliminar Contactos"} render={mostrarEliminar} cerrar={setMostrarEliminar}>
                <EliminarContactos />
            </SideOptions>

            <SideOptions title={"Notificaciones"} render={mostarNotificaciones} cerrar={setMostrarNotificaciones} >
                <Notifiaciones />
            </SideOptions>
        </>
    )
}


