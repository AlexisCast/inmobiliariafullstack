import app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_MESSAGING_APP_ID,
    measurementId:process.env.REACT_APP_MESSAGING_MEASUREMENT_ID
};


class Firebase {
	constructor() {
		app.initializeApp(config);
		this.db = app.firestore();
		this.auth = app.auth();
	}
	estaIniciado() {
		return new Promise((resolve) => {
			this.auth.onAuthStateChanged(resolve);
		});
	}
}

export default Firebase;