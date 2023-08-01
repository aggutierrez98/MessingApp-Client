import EmojiPicker from "emoji-picker-react";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "../context/SocketContext";

export const SendMessage = () => {
	const [mensaje, setMensaje] = useState("");
	const [seleccionarEmoji, setSeleccionarEmoji] = useState(false);
	const { socket } = useContext(SocketContext);
	const { uid } = useSelector((state) => state.user);
	const { chatActivo } = useSelector((state) => state.chat);

	const onChange = ({ target }) => {
		setMensaje(target.value);
	};

	const onSubmit = (ev) => {
		ev.preventDefault();

		if (mensaje.length === 0) {
			return;
		}
		setMensaje("");

		socket.emit("mensaje-personal", {
			de: uid,
			para: chatActivo.uid,
			mensaje,
		});
	};

	const onEmojiClick = (event, { emoji }) => {
		setMensaje(mensaje + emoji);
	};

	return (
		<form onSubmit={onSubmit} className="type_msg">
			{/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div
				className="type_msg_emoticon"
				onClick={() => setSeleccionarEmoji(!seleccionarEmoji)}
			>
				<ion-icon name="happy" />
				{seleccionarEmoji && (
					<EmojiPicker onEmojiClick={onEmojiClick} pickerStyle={styles} />
				)}
			</div>

			<input
				type="text"
				className="write_msg"
				placeholder="Escribe un mensaje aqui..."
				value={mensaje}
				onChange={onChange}
			/>

			<button className="type_msg_button" type="submit">
				<ion-icon className="type_msg_button_ionicon" name="paper-plane" />
			</button>
		</form>
	);
};

const styles = {
	position: "relative",
	bottom: "365px",
	backgroundColor: "white",
};
