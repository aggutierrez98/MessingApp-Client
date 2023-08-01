import { useEffect } from "react";

export const useEscapeKeyAlerter = (ref, setRender) => {
	useEffect(() => {
		function handleEscapeKey(event) {
			event = event || window.event;
			if (event.keyCode === 27) {
				setRender(false);
			}
		}

		document.addEventListener("keydown", handleEscapeKey);

		return () => {
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, [ref, setRender]);
};
