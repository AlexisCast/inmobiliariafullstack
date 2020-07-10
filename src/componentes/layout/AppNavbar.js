import React, { Component } from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import BarSession from "./bar/BarSession";
import { withStyles } from "@material-ui/styles";
import { compose } from "recompose";

import { consumerFirebase } from "../../server";
import { StateContext } from "../../sesion/store";
import {salirSesion} from '../../sesion/actions/sesionAction'

import theme from "../../theme/theme";

const styles = (theme) => ({
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
});

class AppNavbar extends Component {
	static contextType = StateContext;

	state = {
		firebase: null,
	};
	static getDerivedStateFromProps(nextProps, prevState) {
		let nuevosObjetos = {};
		if (nextProps.firebase !== prevState.firebase) {
			nuevosObjetos.firebase = nextProps.firebase;
		}

		return nuevosObjetos;
	}

	componentDidMount() {
		const { firebase } = this.state;
		const [{ sesion }, dispatch] = this.context;

		if (firebase.auth.currentUser !== null && !sesion) {
			firebase.db
				.collection("Users")
				.doc(firebase.auth.currentUser.uid)
				.get()
				.then((doc) => {
					const usuarioDB = doc.data();
					dispatch({
						type: "INICIAR_SESION",
						sesion: usuarioDB,
						autenticado: true,
					});
				});
		}
	}

	render() {
		const [{ sesion }, dispatch] = this.context;
		return sesion ? (
			sesion.autenticado ? (
				<div>
					<AppBar position="static">
						<BarSession />
					</AppBar>
				</div>
			) : null
		) : null;
	}
}
export default compose(withStyles(styles), consumerFirebase)(AppNavbar);
