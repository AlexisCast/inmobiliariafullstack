import app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_MESSAGING_APP_ID,
	measurementId: process.env.REACT_APP_MESSAGING_MEASUREMENT_ID,
};

class Firebase {
	constructor() {
		app.initializeApp(config);
		this.db = app.firestore();
		this.auth = app.auth();
		this.storage = app.storage();
	}
	estaIniciado() {
		return new Promise((resolve) => {
			this.auth.onAuthStateChanged(resolve);
		});
	}
	guardarDocumento = (nombreDocumento, documento) =>
		this.storage.ref().child(nombreDocumento).put(documento);

	devolverDocumento = (documentoUrl) =>
		this.storage.ref().child(documentoUrl).getDownloadURL();

	guardarDocumentos = (documentos) =>
		this.storage.ref().guardarDocumentos(documentos);

	eliminarDocumento = (documento) =>
		this.storage.ref().child(documento).delete();
}

export default Firebase;
