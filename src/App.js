import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Grid } from "@material-ui/core";
import "./App.css";

//aplies theme
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";

import AppNavbar from "./componentes/layout/AppNavbar";
import ListaInmuebles from "./componentes/vistas/ListaInmuebles";
export default class App extends Component {
	render() {
		return (
			<Router>
				<MuiThemeProvider theme={theme}>
					<AppNavbar />
					<Grid container>
						<Switch>
							<Route path="/" exact component={ListaInmuebles} />
						</Switch>
					</Grid>
				</MuiThemeProvider>
			</Router>
		);
	}
}
