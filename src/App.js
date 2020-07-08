import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Grid, Snackbar } from "@material-ui/core";
import "./App.css";

//aplies theme
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";

import AppNavbar from "./componentes/layout/AppNavbar";
import ListaInmuebles from "./componentes/vistas/ListaInmuebles";
import RegistrarUsuario from "./componentes/seguridad/RegistrarUsuario";
import Login from "./componentes/seguridad/Login";

import { FirebaseContext } from "./server";

import { useStateValue } from "./sesion/store";
import openSnackbarReducer from "./sesion/reducers/openSnackBarReducer";

function App(props) {
	let firebase = React.useContext(FirebaseContext);

	const [autenticacionIniciada, setupFirebaseInicial] = React.useState(false);

	//comes from reducer/index
	const [{ openSnackbar }, dispatch] = useStateValue();

	React.useEffect(() => {
		firebase.estaIniciado().then((val) => {
			setupFirebaseInicial(val);
			console.log("val", val);
		});
	}, []);

	return autenticacionIniciada !== false ? (
		<React.Fragment>
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				open={openSnackbar ? openSnackbar.open : false}
				autoHideDuration={3000}
				ContentProps={{
					"aria-describedby": "message-id",
				}}
				message={
					<span id="message-id">
						{openSnackbar ? openSnackbar.mensaje : ""}
					</span>
				}
				onClose={() => {
					dispatch({
						type: "OPEN_SNACKBAR",
						openMensaje: {
							open: false,
							mensaje: "",
						},
					});
				}}
			></Snackbar>
			<Router>
				<MuiThemeProvider theme={theme}>
					<AppNavbar />
					<Grid container>
						<Switch>
							<Route path="/" exact component={ListaInmuebles} />
							<Route
								path="/auth/registrarUsuario"
								exact
								component={RegistrarUsuario}
							/>
							<Route path="/auth/login" exact component={Login} />
						</Switch>
					</Grid>
				</MuiThemeProvider>
			</Router>
		</React.Fragment>
	) : null;
}

export default App;
