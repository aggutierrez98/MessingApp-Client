import React from "react";

export const Loader = ({ loading }) => {
	return (
		<>
			{loading && (
				<div className="verification-loader_container">
					<h2 className="verification-loader_title">Cargando...</h2>
					<div className="verification-loader_animated" />
				</div>
			)}
		</>
	);
};
