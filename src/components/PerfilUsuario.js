import { useSelector } from "react-redux";
import { EditarDescripcion } from "./EditarDescripcion";
import { EditarFoto } from "./EditarFoto";
import { EditarNombre } from "./EditarNombre";

export const PerfilUsuario = () => {
	const { email, name, descripcion, uid, imagen } = useSelector(
		(state) => state.user,
	);

	return (
		<>
			<EditarFoto imagen={imagen} uid={uid} />

			<div className="perfil_contenedor-info">
				<p className="perfil_contenedor-info_titulo">Direccion de correo</p>
				<p className="perfil_contenedor-info_texto">{email}</p>
			</div>

			<EditarNombre nombre={name} uid={uid} />
			<EditarDescripcion descripcion={descripcion} uid={uid} />
		</>
	);
};
