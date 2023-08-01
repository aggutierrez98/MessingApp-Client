import { useRef } from "react";
import { useDelayUnmount } from "../hooks/useDelayUnmount";
import { useEscapeKeyAlerter } from "../hooks/useEscapeKeyAlert";
import { useOutsideAlerter } from "../hooks/useOutsideAlert";

export const Menu = ({ children, render, setRender, buttonRef }) => {
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef, setRender, buttonRef);
	useEscapeKeyAlerter(wrapperRef, setRender);

	const shouldRenderChild = useDelayUnmount(render, 150);

	return (
		<>
			{shouldRenderChild && (
				<div
					id="menu"
					ref={wrapperRef}
					className={`${render ? "menu-aparece" : "menu-desaparece"}`}
				>
					{children}
				</div>
			)}
		</>
	);
};
