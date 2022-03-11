import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/firestore'
import 'firebase/auth'
firebase.initializeApp(
    {
        apiKey: "AIzaSyAWOTaXhAUDGaVvOLH-1qDbk_pjlYNDE68",
        authDomain: "react-online-chat-73241.firebaseapp.com",
        projectId: "react-online-chat-73241",
        storageBucket: "react-online-chat-73241.appspot.com",
        messagingSenderId: "868333357076",
        appId: "1:868333357076:web:e54d06f87cd4da2407bf01",
        measurementId: "G-CHG6MR8422"
    }
);
export const Context = createContext(null)
// const analytics = getAnalytics(app);
const auth = firebase.auth;

const firestore = firebase.firestore;
ReactDOM.render(
    <Context.Provider value={{
        firebase,
        auth,
        firestore

    }}>
        <App />
    </Context.Provider>,
    document.getElementById('root')
);

