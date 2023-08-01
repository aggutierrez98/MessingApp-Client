import React from "react";

export const FirstLoading = ({ loading }) => {
	return <>{loading && <div className="first-loading" />}</>;
};
