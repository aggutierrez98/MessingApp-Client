import { useSelector } from "react-redux";
import defaultImage from "../assets/default-user-image.jpg";

export const PerfilContacto = () => {
	const { chatActivo } = useSelector((state) => state.chat);

	return (
		<>
			<div className="perfil_contenedor-imagen">
				{chatActivo.imagen ? (
					<img src={chatActivo.imagen} alt="sunil" className="perfil_imagen" />
				) : (
					<img src={defaultImage} alt="sunil" className="perfil_imagen" />
				)}
			</div>
			<div className="perfil_contenedor-info">
				<p className="perfil_contenedor-info_titulo">Direccion de correo</p>
				<p className="perfil_contenedor-info_texto">{chatActivo.email}</p>
			</div>
			<div className="perfil_contenedor-info">
				<p className="perfil_contenedor-info_titulo">Nombre del usuario</p>
				<p className="perfil_contenedor-info_texto">{chatActivo.nombre}</p>
			</div>
			<div className="perfil_contenedor-info">
				<p className="perfil_contenedor-info_titulo">Información</p>
				<p className="perfil_contenedor-info_texto">
					{chatActivo.descripcion ? chatActivo.descripcion : "Sin informacion"}
				</p>
			</div>
		</>
	);
};
