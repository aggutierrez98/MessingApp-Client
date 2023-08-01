import React from "react";
import { horaMes } from "../helpers/horaMes";

export const OutgoingMessage = React.forwardRef(({ msg }, ref) => {
	return (
		<div className="sent_message-container" ref={ref}>
			<div className="sent_msg">
				<p>{msg.mensaje}</p>
				<span className="time_date">{horaMes(msg.createdAt)}</span>
			</div>
		</div>
	);
});
