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
