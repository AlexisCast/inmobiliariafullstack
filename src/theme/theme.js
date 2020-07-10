import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	typography: {
		useNextVariants: true,
	},
	palette: {
		primary: {
			// main: "#10A75F", //verde
			main: "#33FAFF"//azul
		},
		common: {
			white: "white"//blanco
		},
		secondary: {
			main: "#C70039"//rojo oscuro
		},
	},
	spacing: 10,
});
export default theme;
