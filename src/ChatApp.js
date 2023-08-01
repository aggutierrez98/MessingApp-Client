import React from "react";
import { Provider } from "react-redux";
import { SocketProvider } from "./context/SocketContext";
import { AppRouter } from "./router/AppRouter";
import { store } from "./store/store";

import "./index.css";
import "./styles/styles.scss";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

export const ChatApp = () => {
	return (
		<Provider store={store}>
			<SocketProvider>
				<AppRouter />
			</SocketProvider>
		</Provider>
	);
};
