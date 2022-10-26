import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { verificaToken } from "../actions/auth";
import { Loader } from "../components/Loader";
import { Private } from "./Private";
import { Public } from "./Public";

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
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/login"
                        element={
                            <Public
                                isAuthenticated={!!logged}
                            >
                                <LoginPage />
                            </Public>
                        }
                    >
                    </Route>
                    <Route
                        path="/register"
                        element={
                            <Public
                                isAuthenticated={!!logged}
                            >
                                <RegisterPage />
                            </Public>
                        }
                    />
                    <Route
                        path="/send-email"
                        element={
                            <Public
                                isAuthenticated={!!logged}
                            >
                                <SendConfirmationEmailPage />
                            </Public>
                        }
                    />
                    <Route
                        path="/confirmation/:id"
                        exact
                        element={
                            <Public
                                isAuthenticated={!!logged}
                            >
                                <ConfirmationPage />
                            </Public>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <Private
                                isAuthenticated={!!logged}
                            >
                                <ChatPage />
                            </Private>
                        }
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
        // </Suspense>
    )
}
