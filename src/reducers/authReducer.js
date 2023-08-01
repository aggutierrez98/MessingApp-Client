import { types } from "../types/types";

const intialState = {
	checking: true,
	logged: false,
};

// rome-ignore lint/style/useDefaultParameterLast: <explanation>
export const authReducer = (state = intialState, { payload, type }) => {
	switch (type) {
		case types.loginUsuario:
			return {
				checking: false,
				logged: true,
			};

		case types.logoutUsuario:
			return {
				...state,
				checking: false,
				logged: false,
			};

		case types.tokenInvalido:
			return {
				checking: false,
				logged: false,
			};

		default:
			return state;
	}
};
