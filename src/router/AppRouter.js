import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import { verificaToken } from "../actions/auth";
import { Loader } from "../components/Loader";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import SendConfirmationEmailPage from "../pages/SendConfirmationEmailPage";
import ConfirmationPage from "../pages/ConfirmationPage";
import ChatPage from "../pages/ChatPage";

// const RegisterPage = lazy(() => import(/* webpackChunkName: "RegisterPage" */"../pages/RegisterPage"));
// const LoginPage = lazy(() => import(/* webpackChunkName: "LoginPage" */"../pages/LoginPage"));
// const SendConfirmationEmailPage = lazy(() => import(/* webpackChunkName: "SendConfirmationEmailPage" */"../pages/SendConfirmationEmailPage"));
// const ConfirmationPage = lazy(() => import(/* webpackChunkName: "ConfirmationPage" */"../pages/ConfirmationPage"));
// const ChatPage = lazy(() => import(/* webpackChunkName: "ChatPage" */"../pages/ChatPage"));

export const AppRouter = () => {

    const dispatch = useDispatch();

    const { checking, logged } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(verificaToken());
    }, [dispatch]);

    if (checking) {
        return <Loader loading={true} />
    }

    return (
        // <Suspense fallback={<Loader />}>
            <Router>
                <div>
                    <Switch>
                        <PublicRoute
                            key="/login"
                            path="/login"
                            exact
                            component={LoginPage}
                            isAuthenticated={!!logged}
                        />
                        <PublicRoute
                            key="/register"
                            path="/register"
                            exact
                            component={RegisterPage}
                            isAuthenticated={!!logged}
                        />
                        <PublicRoute
                            key="/send-email"
                            path="/send-email"
                            exact
                            component={SendConfirmationEmailPage}
                            isAuthenticated={!!logged}
                        />
                        <PublicRoute
                            key="/confirmation/:id"
                            path="/confirmation/:id"
                            exact
                            component={ConfirmationPage}
                            isAuthenticated={!!logged}
                        />
                        <PrivateRoute
                            key="/"
                            path="/"
                            exact
                            component={ChatPage}
                            isAuthenticated={!!logged}
                        />
                        <Redirect to="/" />
                    </Switch>
                </div>
            </Router>
        // </Suspense>
    )
}
