import React from 'react'
import PropTypes from "prop-types";
import { Navigate } from 'react-router-dom'

export const Private = ({
    isAuthenticated,
    children
}) => {
    if(!isAuthenticated) return   <Navigate to="/login" replace/>
    return children
}

Private.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    // component: PropTypes.func.isRequired,
};