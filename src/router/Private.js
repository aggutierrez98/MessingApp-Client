import PropTypes from "prop-types";
import React from "react";
import { Navigate } from "react-router-dom";

export const Private = ({ isAuthenticated, children }) => {
	if (!isAuthenticated) return <Navigate to="/login" replace />;
	return children;
};

Private.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
};
