import React, { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "../components/Loader";
import { verificaTokenAsync } from "../store/slices/auth.slice";
import { Private } from "./Private";
import { Public } from "./Public";

const RegisterPage = lazy(
	() => import(/* webpackChunkName: "RegisterPage" */ "../pages/RegisterPage"),
);
const LoginPage = lazy(
	() => import(/* webpackChunkName: "LoginPage" */ "../pages/LoginPage"),
);
const SendConfirmationEmailPage = lazy(
	() =>
		import(
			/* webpackChunkName: "SendConfirmationEmailPage" */ "../pages/SendConfirmationEmailPage"
		),
);
const ConfirmationPage = lazy(
	() =>
		import(
			/* webpackChunkName: "ConfirmationPage" */ "../pages/ConfirmationPage"
		),
);
const ChatPage = lazy(
	() => import(/* webpackChunkName: "ChatPage" */ "../pages/ChatPage"),
);

export const AppRouter = () => {
	const dispatch = useDispatch();
	const { checking, logged } = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(verificaTokenAsync());
	}, [dispatch]);

	if (checking) return <Loader loading={true} />;

	return (
		<Suspense fallback={<Loader />}>
			<BrowserRouter>
				<div>
					<Routes>
						<Route
							path="/login"
							element={
								<Public isAuthenticated={!!logged}>
									<LoginPage />
								</Public>
							}
						/>
						<Route
							path="/register"
							element={
								<Public isAuthenticated={!!logged}>
									<RegisterPage />
								</Public>
							}
						/>
						<Route
							path="/send-email"
							element={
								<Public isAuthenticated={!!logged}>
									<SendConfirmationEmailPage />
								</Public>
							}
						/>
						<Route
							path="/confirm-email/:id"
							element={
								<Public isAuthenticated={!!logged}>
									<ConfirmationPage />
								</Public>
							}
						/>
						<Route
							path="/"
							element={
								<Private isAuthenticated={!!logged}>
									<ChatPage />
								</Private>
							}
						/>
						<Route path="/*" element={<Navigate to="/" replace />} />
					</Routes>
				</div>
			</BrowserRouter>
		</Suspense>
	);
};
