import React, { useState, useEffect } from "react";
import { useStateValue } from "../../sesion/store";
import {
	Container,
	Typography,
	Grid,
	TextField,
	Avatar,
	Button,
} from "@material-ui/core";

import reactFoto from "../../logo.svg";
import { openMensajePantalla } from "../../sesion/actions/snackbarAction";

import { consumerFirebase } from "../../server";

const style = {
	paper: {
		marginTop: 8,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	form: {
		width: "100%",
		marginTop: 20,
	},
	submit: {
		marginTop: 15,
		marginBottom: 20,
	},
	avatar: {
		margin: 10,
		width: 100,
		height: 100,
	},
};

const PerfilUsuario = (props) => {
	const [{ sesion }, dispatch] = useStateValue();
	const firebase = props.firebase;

	let [estado, cambiarEstado] = useState({
		nombre: "",
		apellido: "",
		email: "",
		telefono: "",
		id: "",
		foto: "",
	});

	const cambiarDato = (e) => {
		const { name, value } = e.target;
		cambiarEstado((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	const guardarCambios = (e) => {
		e.preventDefault();

		firebase.db
			.collection("Users")
			.doc(firebase.auth.currentUser.uid)
			.set(estado, { merge: true })
			.then((success) => {
				dispatch({
					type: "INICIAR_SESION",
					sesion: estado,
					autenticado: true,
				});

				openMensajePantalla(dispatch, {
					open: true,
					mensaje: "Se guardaron los cambios",
				});
			})
			.catch((error) => {
				openMensajePantalla(dispatch, {
					open: true,
					mensaje: "Errores guardando en la base de datos:" + error,
				});
			});
	};

	useEffect(() => {
		if (estado.id === "") {
			if (sesion) {
				cambiarEstado(sesion.usuario);
			}
		}
	});

	return sesion ? (
		<Container component="main" maxWidth="md" justify="center">
			<div style={style.paper}>
				<Avatar style={style.avatar} src={estado.foto || reactFoto} />
				<Typography component="h1" variant="h5">
					Perfil de Cuenta
				</Typography>
				<form style={style.form}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<TextField
								name="nombre"
								variant="outlined"
								fullWidth
								label="Nombre"
								value={estado.nombre}
								onChange={cambiarDato}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								name="apellido"
								variant="outlined"
								fullWidth
								label="Apellidos"
								value={estado.apellido}
								onChange={cambiarDato}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								name="email"
								variant="outlined"
								fullWidth
								label="E-Mail"
								value={estado.email}
								onChange={cambiarDato}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								name="telefono"
								variant="outlined"
								fullWidth
								label="Telefono"
								value={estado.telefono}
								onChange={cambiarDato}
							/>
						</Grid>
					</Grid>
					<Grid container justify="center">
						<Grid item xs={12} md={6}>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								size="large"
								color="primary"
								style={style.submit}
								onClick={guardarCambios}
							>
								Guardar Cambios
							</Button>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	) : null;
};

export default consumerFirebase(PerfilUsuario);
