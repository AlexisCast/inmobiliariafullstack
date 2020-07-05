import React, { Component } from "react";
import {
	Container,
	Avatar,
	Typography,
	Grid,
	TextField,
	Button,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

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

export default class RegistrarUsuario extends Component {
	state = {
		usuario: {
			nombre: "",
			apellido: "",
			email: "",
			password: "",
		},
	};

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

	registrarUsuario = (e) => {
		e.preventDefault();
		console.log("imprimir objeto usuario state", this.state.usuario);
	};

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
