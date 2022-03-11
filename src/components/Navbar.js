import React from 'react';
import {AppBar, Button, Grid, Toolbar} from "@mui/material";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/const";
import {getAuth} from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {useAuthState} from "react-firebase-hooks/auth";

const Navbar = () => {
    const auth = getAuth(firebase.firebaseapp);
    const [user, loading, error] = useAuthState(auth);
    return (
        <AppBar color={'secondary'} position="static">
            <Toolbar >
                <Grid container justifyContent={'flex-end'}>
                    {user
                        ?<Button onClick={()=>{auth.signOut()}
                        } variant="contained">Выход</Button>
                        :<NavLink to={LOGIN_ROUTE}>
                            <Button variant="contained">Логин</Button>
                        </NavLink>
                    }

                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;