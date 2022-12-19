import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
	databaseURL: `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com`,
	storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const initFirebase = () => {
	if (!firebase.apps.length) {
		firebase.initializeApp(config);
	}
};

initFirebase();

export { firebase };
