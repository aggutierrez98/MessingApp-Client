import React from 'react'
import { useSelector } from 'react-redux'
import { ChatSelect } from '../components/ChatSelect'
import { InboxPeople } from '../components/InboxPeople'
import { Messages } from '../components/Messages'
import { ToastContainer } from 'react-toastify';
import { Loader } from '../components/Loader'
import { useMediaQuery } from 'react-responsive'

function ChatPage () {

    const { chatActivo, loaded } = useSelector(state => state.chat)

    const isMobile = useMediaQuery({ query: '(max-width: 650px)' })

    if (!loaded) {
        return <Loader loading={true} />
    }

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
                                {
                                    (chatActivo?.uid)
                                        ? <Messages />
                                        : <InboxPeople />
                                }

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