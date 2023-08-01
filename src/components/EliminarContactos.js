import { useSelector } from "react-redux";
import { UsuarioCard } from "./UsuarioCard";

export const EliminarContactos = () => {
	const { contactos } = useSelector((state) => state.contactos);

	return (
		<>
			<div className="agregar-contactos_container">
				{contactos?.map((contacto) => (
					<UsuarioCard
						{...contacto}
						uid={contacto.uid}
						key={contacto.uid}
						operacion={"eliminar"}
					/>
				))}
			</div>
		</>
	);
};
