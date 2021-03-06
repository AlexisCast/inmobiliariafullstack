import React, { Component } from "react";
import {
	Container,
	Avatar,
	Typography,
	TextField,
	Button,
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { compose } from "recompose";
import { consumerFirebase } from "../../server";

import { iniciarSesion } from "../../sesion/actions/sesionAction";
import { openMensajePantalla } from "../../sesion/actions/snackbarAction";

import { StateContext } from "../../sesion/store";

const style = {
	paper: {
		marginTop: "9",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: 5,
		backgroundColor: "red",
	},
	form: {
		width: "100%",
		marginTop: 8,
	},
	submit: {
		marginTop: "15px",
		marginBottom: "20px",
	},
};

class Login extends Component {
	static contextType = StateContext;

	state = {
		firebase: null,
		usuario: {
			email: "",
			password: "",
		},
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.firebase === prevState.firebase) {
			return null;
		}
		return {
			firebase: nextProps.firebase,
		};
	}

	onChange = (e) => {
		// cloning object
		let usuario = { ...this.state.usuario };
		// let usuario = Object.assign({}, this.state.usuario);//old copy
		usuario[e.target.name] = e.target.value;
		this.setState(
			{
				usuario: usuario,
			},
			() => console.log(this.state.usuario)
		);
	};

	/**
	* ! works without actions 
	login = (e) => {
		e.preventDefault();
		const { firebase, usuario } = this.state;

		firebase.auth
			.signInWithEmailAndPassword(usuario.email, usuario.password)
			.then((auth) => {
				this.props.history.push("/");
			})
			.catch((error) => {
                console.log("error".error);
                alert(`Error... Details ${error}`);
			});
	};
	*/

	login = async (e) => {
		e.preventDefault();
		const [{ sesion }, dispatch] = this.context;
		const { firebase, usuario } = this.state;
		const { email, password } = usuario;

		let callback = await iniciarSesion(dispatch, firebase, email, password);
		if (callback.status) {
			this.props.history.push("/");
		} else {
			// console.log("error")
			openMensajePantalla(dispatch, {
				open: true,
				mensaje: callback.mensaje.message,
			});
		}
	};

	render() {
		return (
			<Container maxWidth="xs">
				<div style={style.paper}>
					<Avatar style={style.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Ingrese Usario
					</Typography>
					<form style={style.form}>
						<TextField
							variant="outlined"
							label="E-Mail"
							name="email"
							fullWidth
							margin="normal"
							value={this.state.usuario.email}
							onChange={this.onChange}
						/>
						<TextField
							type="password"
							variant="outlined"
							label="password"
							name="password"
							fullWidth
							margin="normal"
							value={this.state.usuario.password}
							onChange={this.onChange}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							onClick={this.login}
						>
							Enviar
						</Button>
					</form>
				</div>
			</Container>
		);
	}
}
export default compose(consumerFirebase)(Login);
