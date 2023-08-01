import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth.slice";
import { chatReducer } from "./slices/chat.slice";
import { contactsReducer } from "./slices/contacts.slice";
import { userReducer } from "./slices/user.slice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		chat: chatReducer,
		contacts: contactsReducer,
		user: userReducer,
	},
});

// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import { rootReducer } from "../reducers/rootReducer";
// import { usersReducer, usersSlice } from './users/slice';

// const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// export const store = createStore(
//     rootReducer,
//     composeEnhancers(
//         applyMiddleware(thunk)
//     )
// );
