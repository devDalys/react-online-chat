import React, {useContext} from 'react';
import {Route, Switch, Redirect, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../routes";
import {CHAT_ROUTE, LOGIN_ROUTE} from "../utils/const";
import {Context} from "../index";
import firebase from 'firebase/compat/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import {Box, Button, CircularProgress, Container, Grid, gridClasses} from "@mui/material";
import Loader from "./Loader";

const AppRouter = () => {
    // const auth = getAuth(firebase)
    const auth = getAuth(firebase.firebaseapp);
    const [user, loading, error] = useAuthState(auth);
    if (loading){
        return  <Loader/>
    }
    return <Routes>
        {user
            ? (
                privateRoutes.map(({path, Element, toPath}) =>
                    <Route key={path} path={path} element={
                        <Element to={toPath ? toPath : ''}/>}
                    />)

            )
            : (
                publicRoutes.map(({path, Element, toPath}) =>
                    <Route key={path} path={path} element={
                        <Element to={toPath ? toPath : ''}/>}
                    />))}
    </Routes>
};

export default AppRouter;