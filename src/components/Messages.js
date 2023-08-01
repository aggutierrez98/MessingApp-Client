import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import {
	scrollToBottom,
	scrollToBottomAnimated,
} from "../helpers/scrollToBottom";
import { mensajesVistos } from "../store/slices/chat.slice";
import { IncomingMessage } from "./IncomingMessage";
import { MessageProfile } from "./MessageProfile";
import { OutgoingMessage } from "./OutgoingMessage";
import { SendMessage } from "./SendMessage";
import { SinMensajes } from "./SinMensajes";

export const Messages = React.forwardRef((props, outRef) => {
	const dispatch = useDispatch();
	const { mensajes, chatActivo } = useSelector((state) => state.chat);
	const { uid } = useSelector((state) => state.usuario);
	const nodeRef = useRef(null);
	const { ref, inView } = useInView({
		threshold: 0.75,
	});

	useEffect(() => {
		if (mensajes) scrollToBottom("mensajes");
		dispatch(mensajesVistos(chatActivo?.uid));
	}, [mensajes, chatActivo, dispatch]);

	return (
		<div className="mesgs" ref={outRef}>
			<MessageProfile />
			<div id="mensajes" className="msg_history">
				{mensajes.length === 0 && <SinMensajes />}
				{mensajes?.map((msg, index) => {
					const isLastMessage = index === mensajes.length - 1;
					return msg.para === uid ? (
						<IncomingMessage
							ref={isLastMessage ? ref : null}
							key={msg._id}
							msg={msg}
						/>
					) : (
						<OutgoingMessage
							ref={isLastMessage ? ref : null}
							key={msg._id}
							msg={msg}
						/>
					);
				})}
				<CSSTransition
					nodeRef={nodeRef}
					in={!inView}
					timeout={150}
					classNames="fade"
					unmountOnExit
				>
					<button
						type="button"
						ref={nodeRef}
						className="flecha-abajo"
						onClick={() => scrollToBottomAnimated("mensajes")}
					>
						<ion-icon name="chevron-down-outline" />
					</button>
				</CSSTransition>
			</div>

			<SendMessage />
		</div>
	);
});
