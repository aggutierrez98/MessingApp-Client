import React from 'react'
import { useSelector } from 'react-redux'
import { ChatSelect } from '../components/ChatSelect'
import { InboxPeople } from '../components/InboxPeople'
import { Messages } from '../components/Messages'
import { ToastContainer } from 'react-toastify';
import { Loader } from '../components/Loader'
import { useMediaQuery } from 'react-responsive'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { useRef } from 'react'

function ChatPage() {

    const { chatActivo, loaded } = useSelector(state => state.chat)
    const isMobile = useMediaQuery({ query: '(max-width: 650px)' })
    const messagesRef = useRef(null);
    const inboxRef = useRef(null);
    const nodeRef = chatActivo?.uid ? messagesRef : inboxRef;

    if (!loaded) return <Loader loading={true} />

    else {

        return (
            <>
                <div className="messaging">
                    <div className="inbox_msg">
                        <div id="perfil"></div>
                        <div id="modal"></div>

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

                        {isMobile
                            ?
                            <>
                                <SwitchTransition mode={"out-in"}>
                                    <CSSTransition
                                        key={chatActivo?.uid ? "Messages" : "InboxPeople"}
                                        nodeRef={nodeRef}
                                        addEndListener={(done) => nodeRef.current.addEventListener("transitionend", done, false)}
                                        timeout={200}
                                        classNames={chatActivo?.uid ? "switch" : "fade-page"}
                                    >
                                        {
                                            (chatActivo?.uid)
                                                ? <Messages ref={nodeRef} />
                                                : <InboxPeople ref={nodeRef} />
                                        }
                                    </CSSTransition>
                                </SwitchTransition>

                            </>
                            :
                            <>
                                <InboxPeople />
                                {
                                    (chatActivo?.uid)
                                        ? <Messages />
                                        : <ChatSelect />
                                }
                            </>
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default ChatPage