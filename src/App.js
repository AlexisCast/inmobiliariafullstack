import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Grid } from "@material-ui/core";
import "./App.css";

//aplies theme
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";

import AppNavbar from "./componentes/layout/AppNavbar";
import ListaInmuebles from "./componentes/vistas/ListaInmuebles";
import RegistrarUsuario from "./componentes/seguridad/RegistrarUsuario";
import Login from "./componentes/seguridad/Login";

import { FirebaseContext } from "./server";

function App(props) {
	let firebase = React.useContext(FirebaseContext);

	const [autenticacionIniciada, setupFirebaseInicial] = React.useState(false);

	React.useEffect(() => {
		firebase.estaIniciado().then((val) => {
			setupFirebaseInicial(val);
			console.log('val',val);
		});
	}, []);

	return autenticacionIniciada !== false ? (
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
	) : null;
}

export default App;
