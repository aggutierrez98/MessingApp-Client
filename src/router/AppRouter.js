import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import { verificaToken } from "../actions/auth";
import { Loader } from "../components/Loader";
import { ChatPage } from "../pages/ChatPage";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

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
        <Router>
            <div>
                <Switch>
                    <PublicRoute isAutenticated={logged} path="/auth" component={AuthRouter} />
                    <PrivateRoute isAutenticated={logged} exact path="/" component={ChatPage} />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
