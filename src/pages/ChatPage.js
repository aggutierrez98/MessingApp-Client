import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { ToastContainer } from "react-toastify";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { ChatSelect } from "../components/ChatSelect";
import { InboxPeople } from "../components/InboxPeople";
import { Loader } from "../components/Loader";
import { Messages } from "../components/Messages";

function ChatPage() {
	const { chatActivo, loaded } = useSelector((state) => state.chat);
	const isMobile = useMediaQuery({ query: "(max-width: 650px)" });
	const messagesRef = useRef(null);
	const inboxRef = useRef(null);
	const nodeRef = chatActivo?.uid ? messagesRef : inboxRef;

	if (!loaded) return <Loader loading={true} />;
	else {
		return (
			<>
				<div className="messaging">
				<div className="background-band" />

					<div className="inbox_msg">
						<div id="perfil" />
						<div id="modal" />

						<ToastContainer
							position="bottom-left"
							autoClose={4000}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss={false}
							draggablePercent={60}
							pauseOnHover={false}
						/>

						{isMobile ? (
							<>
								<SwitchTransition mode={"out-in"}>
									<CSSTransition
										key={chatActivo?.uid ? "Messages" : "InboxPeople"}
										nodeRef={nodeRef}
										addEndListener={(done) =>
											nodeRef.current.addEventListener(
												"transitionend",
												done,
												false,
											)
										}
										timeout={200}
										classNames={chatActivo?.uid ? "switch" : "fade-page"}
									>
										{chatActivo?.uid ? (
											<Messages ref={nodeRef} />
										) : (
											<InboxPeople ref={nodeRef} />
										)}
									</CSSTransition>
								</SwitchTransition>
							</>
						) : (
							<>
								<InboxPeople />
								{chatActivo?.uid ? <Messages /> : <ChatSelect />}
							</>
						)}
					</div>
				</div>
			</>
		);
	}
}

export default ChatPage;
