import PropTypes from "prop-types";
import React from "react";
import { Navigate } from "react-router-dom";

export const Public = ({ isAuthenticated, children }) => {
	if (isAuthenticated) return <Navigate to="/" replace />;
	return children;
};

Public.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
};
