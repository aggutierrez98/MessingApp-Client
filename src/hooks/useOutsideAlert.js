import { useEffect } from "react";

export const useOutsideAlerter = (ref, setRender, buttonRef) => {
	useEffect(() => {
		function handleClickOutside(event) {
			if (
				ref.current &&
				!ref.current.contains(event.target) &&
				event.target !== buttonRef.current
			) {
				setRender(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, setRender, buttonRef]);
};
