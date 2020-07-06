import app from 'firebase/app';
import 'firebase/firestore';

const config= {
    apiKey: "AIzaSyA9tJg61u6LuQzul05Y9k3moDj_iRh0CBg",
    authDomain: "rhfirematdes-fullstackextremo.firebaseapp.com",
    databaseURL: "https://rhfirematdes-fullstackextremo.firebaseio.com",
    projectId: "rhfirematdes-fullstackextremo",
    storageBucket: "rhfirematdes-fullstackextremo.appspot.com",
    messagingSenderId: "729274428358",
    appId: "1:729274428358:web:50bad628dcb2a1c9b7a0c7",
    measurementId: "G-QTWWFDE1BX"
  };

class Firebase{
    constructor(){
        app.initializeApp(config);
        this.db=app.firestore();
    }
}

export default Firebase;