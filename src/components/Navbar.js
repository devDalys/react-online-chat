import React from 'react';
import {AppBar, Button, Grid, Toolbar} from "@mui/material";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/const";

const Navbar = () => {
    const user = false;
    return (
        <AppBar color={'secondary'} position="static">
            <Toolbar >
                <Grid container justifyContent={'flex-end'}>
                    {user
                        ?<Button variant="contained">Выход</Button>
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