import sesionReducer from "./sesionReducer";
import openSnackbarReducer from "./openSnackBarReducer";

export const mainReducer = ({ sesion, openSnackbar }, action) => {
	return {
		sesion: sesionReducer(sesion, action),
		openSnackbar: openSnackbarReducer(openSnackbar, action),
	};
};
