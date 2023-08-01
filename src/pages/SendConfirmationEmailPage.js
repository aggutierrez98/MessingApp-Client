import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader } from "../components/Loader";
import { fetchSinToken } from "../helpers/fetch";

function SendConfirmationEmailPage() {
	const location = useLocation();

	const [enviado, setenviado] = useState({
		send: false,
		loading: false,
	});

	const onClick = async () => {
		setenviado({
			send: false,
			loading: true,
		});

		const { ok } = await fetchSinToken(
			"login/re-send-verify",
			{ email: location.state.usuario.email },
			"POST",
		);
		console.log(ok);
		ok
			? setenviado({ send: true, loading: false })
			: setenviado({ send: false, loading: false });
	};

	if (!location.state?.usuario?.email) {
		return <Navigate to="/login" replace />;
	}

	return (
		<div className="confirmation-container">
			<Loader loading={enviado.loading} />
			<div className="confirmation-box">
				<h3 className="confirmation-title">Email de confirmacion enviado</h3>
				<h2 className="confirmation-subtitle">
					Se la enviado un email de confirmacion a su casilla de correo
					electronico
				</h2>
				<p className="confirmation-text">No le llego el email?</p>
				<button type="button" className="confirmation-button" onClick={onClick}>
					Enviar nuevamente email
				</button>
				{enviado.send && (
					<p className="confirmation-send">Mensaje enviado correctamente</p>
				)}
			</div>
		</div>
	);
}

export default SendConfirmationEmailPage;
