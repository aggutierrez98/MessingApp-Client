import { useRef } from 'react';
import reactDom from 'react-dom';
import { useDelayUnmount } from '../hooks/useDelayUnmount';
import { useEscapeKeyAlerter } from '../hooks/useEscapeKeyAlert';

const SideOptionsBase = ({ render, cerrar, children, title }) => {

    const cerrarOptions = () => {
        cerrar(false)
    }
    const shouldRenderChild = useDelayUnmount(render, 250);
    const wrapperRef = useRef(null);
    useEscapeKeyAlerter(wrapperRef, cerrar);

    return (
        <>
            {
                shouldRenderChild &&
                <div className={`perfil ${render ? "aparecer" : "desaparecer"}`} ref={wrapperRef} >
                    <div className="perfil_contenedor-boton">
                        <button className="perfil_boton" onClick={cerrarOptions}><ion-icon name="arrow-back"></ion-icon> <p className="perfil_titulo">{title}</p></button>
                    </div>
                    {children}
                </div>
            }
        </>
    )
}

export const SideOptions = (props) => {
    return reactDom.createPortal(
        <SideOptionsBase {...props} />,
        document.getElementById("perfil")
    )
}

