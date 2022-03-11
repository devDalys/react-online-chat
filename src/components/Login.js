import React, {useContext} from 'react';
import {Box, Button, Container, Grid} from "@mui/material";
import {Context} from "../index";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import firebase from "firebase/compat/app";

const Login = () => {
    const {auth} = useContext(Context)

    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        const {user} = await firebase.auth().signInWithPopup(provider);
        console.log(user)
    }

    return (
        <div>
            <Container>
                <Grid container
                      style={{height: window.innerHeight - 50}}
                      alignItems={'center'}
                      justifyContent={'center'}
                >
                    <Grid style={{width: 400, background: 'lightgrey'}}
                    container
                    alignItems={'center'}
                          direction={'column'}
                          borderRadius={'4px'}
                    >
                        <Box p={5}>
                            <Button onClick={login} variant={'outlined'}>
                                Войти с помощью Google
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Login;