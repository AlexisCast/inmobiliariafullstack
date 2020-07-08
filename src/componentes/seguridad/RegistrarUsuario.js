import React, { Component } from "react";
import {
	Container,
	Avatar,
	Typography,
	Grid,
	TextField,
	Button,
} from "@material-ui/core";
import { compose } from "recompose";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { consumerFirebase } from "../../server";

import { crearUsuario } from "../../sesion/actions/sesionAction";
import { openMensajePantalla } from "../../sesion/actions/snackbarAction";
import { StateContext } from "../../sesion/store";

const style = {
	paper: {
		marginTop: 8,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: 8,
		backgroundColor: "#e53935",
	},
	form: {
		width: "100%",
		marginTop: 10,
	},
	submit: {
		marginTop: "15px",
		marginBottom: "20px",
	},
};

const usuarioInicial = {
	nombre: "",
	apellido: "",
	email: "",
	password: "",
};

class RegistrarUsuario extends Component {
	static contextType = StateContext;

	state = {
		firebase: null,
		usuario: {
			nombre: "",
			apellido: "",
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

	registrarUsuario = async (e) => {
		e.preventDefault();
		console.log("imprimir objeto usuario state", this.state.usuario);
		const [{ sesion }, dispatch] = this.context;
		const { firebase, usuario } = this.state;

		let callback = await crearUsuario(dispatch, firebase, usuario);
		if (callback.status) {
			this.props.history.push("/");
		} else {
			openMensajePantalla(dispatch, {
				open: true,
				mensaje: callback.mensaje.message,
			});
		}
	};

	/**
	 * ! works without actions 
	 * registrarUsuario = (e) => {
		e.preventDefault();
		console.log("imprimir objeto usuario state", this.state.usuario);
		const { usuario, firebase } = this.state;

		firebase.auth
			.createUserWithEmailAndPassword(usuario.email, usuario.password)
			.then((auth) => {

                const usuarioDB={
                    usuarioid:auth.user.uid,
                    email:usuario.email,
                    nombre:usuario.nombre,
                    apellido:usuario.apellido
                }

				firebase.db
					.collection("Users")
					.add(usuarioDB)
					.then((usuarioAfter) => {
						console.log("esta insercion fue un exito".usuarioAfter);
						this.setState({
							usuario: usuarioInicial,
						});
					})
					.catch((error) => {
                        console.log("error", error);
                        alert(`Error... Details ${error}`);
					});
			})
			.catch((error) => {
				console.log("error", error);
			});
	};
	 * */

	render() {
		return (
			<Container maxWidth="md">
				<div style={style.paper}>
					<Avatar style={style.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Registre su Cuenta
					</Typography>
					<form style={style.form}>
						<Grid container spacing={2}>
							<Grid item md={6} xs={12}>
								<TextField
									name="nombre"
									value={this.state.usuario.nombre}
									fullWidth
									label="Ingrese su nombre"
									onChange={this.onChange}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									name="apellido"
									value={this.state.usuario.apellido}
									fullWidth
									label="Ingrese sus apellidos"
									onChange={this.onChange}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									name="email"
									value={this.state.usuario.email}
									fullWidth
									label="Ingrese su email"
									onChange={this.onChange}
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									type="password"
									name="password"
									value={this.state.usuario.password}
									fullWidth
									label="Ingrese su password"
									onChange={this.onChange}
								/>
							</Grid>
						</Grid>
						<Grid container justify="center">
							<Grid item md={6} xs={12}>
								<Button
									type="submit"
									variant="contained"
									fullWidth
									size="large"
									color="primary"
									style={style.submit}
									onClick={this.registrarUsuario}
								>
									Registrar
								</Button>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		);
	}
}
export default compose(consumerFirebase)(RegistrarUsuario);
