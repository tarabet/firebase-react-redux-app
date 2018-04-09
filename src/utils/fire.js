import firebase from "firebase";

const config = {
    apiKey: "AIzaSyDLTgQ5bRBtSHnDjNxDrFVYianlQ5HC4dw",
    authDomain: "react-todo-app-1d013.firebaseapp.com",
    databaseURL: "https://react-todo-app-1d013.firebaseio.com",
    projectId: "react-todo-app-1d013",
    storageBucket: "",
    messagingSenderId: "904845357721"
};

const fire = firebase.initializeApp(config);
const facebookProvider = new firebase.auth.FacebookAuthProvider();
export { fire, facebookProvider };