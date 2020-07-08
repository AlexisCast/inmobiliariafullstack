export const openMensajePantalla = (dispatch, openMensaje) => {
    console.log("openMensajePantalla openMensaje",openMensaje)
	dispatch({
		type: "OPEN_SNACKBAR",
		openMensaje: openMensaje,
	});
};
