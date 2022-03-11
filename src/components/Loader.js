import React from 'react';
import {CircularProgress, Container, Grid} from "@mui/material";

const Loader = () => {
    return (
        <div>
            <Container>
                <Grid container
                      style={{height: window.innerHeight - 50}}
                      alignItems={'center'}
                      justifyContent={'center'}
                >
                    <Grid
                        container
                        alignItems={'center'}
                        direction={'column'}
                        borderRadius={'4px'}
                    >
                        <CircularProgress color="secondary" />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Loader;