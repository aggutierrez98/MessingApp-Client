import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

export const useSocket = (serverPath) => {
	const [socket, setSocket] = useState(null);
	const [online, setOnline] = useState(false);

	const conectarSocket = useCallback(() => {
		const token = localStorage.getItem("token");

		const socketTemp = io.connect(serverPath, {
			transports: ["websocket"],
			autoConnect: true,
			forceNew: true,
			query: {
				"x-token": token,
			},
		});

		setSocket(socketTemp);
	}, [serverPath]);

	const desconectarSocket = useCallback(() => {
		socket?.disconnect();
	}, [socket]);

	useEffect(() => {
		setOnline(socket?.connected);
		socket?.on("connect", () => setOnline(true));
		socket?.on("disconnect", () => setOnline(false));

		//PRUEBA DE CLEANUP PARA QUE LOS SOCKET NO EJECTUEN EVENTOS DOS VECES POR ERROR
		return () => {
			desconectarSocket();
		};
	}, [socket, desconectarSocket]);

	return {
		socket,
		online,
		conectarSocket,
		desconectarSocket,
	};
};
