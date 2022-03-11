import React, {useContext, useState} from 'react';
import {getAuth} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {Avatar, Button, Container, Grid, TextField} from "@mui/material";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Context} from "../index";
import Loader from "./Loader";

const Chat =  () => {
    const auth = getAuth(firebase.firebaseapp);
    const {firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [value, setValue] = useState('');
    const [messages, loading] = useCollectionData(
         firebase.firestore().collection('messages').orderBy('CreatedAt').get());
    const sendMessage = async () =>{
        await firebase.firestore().collection('messages').add({
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL,
            text:value,
            createdAt:firebase.firestore.FieldValue.serverTimestamp()
        })
        setValue('');
    }
    if(loading) {<Loader/>}
    return (
        <Container>
            <Grid container
                  justifyContent={"center"}
                  style={{height: window.innerHeight - 50, marginTop: '20px'}}>
                <div style={{width: '100%', height: '70vh', border: '1px solid gray', overflowY: 'auto'}}>
                    {messages?.map(message =>
                        <div style={{
                            margin: 10,
                            border: user.uid === message.uid ? '2px solid green' : '2px dashed red',
                            marginLeft: user.uid === message.uid ? 'auto' : '10px',
                            width: 'fit-content',
                            padding: 5,
                        }}>
                            <Grid container>
                                <Avatar src={message.photoURL}/>
                                <div>{message.displayName}</div>
                            </Grid>
                            <div>{message.text}</div>
                        </div>
                    )}
                </div>
                <Grid
                    container
                    direction={'column'}
                    alignItems={'flex-end'}
                    style={{width: '100%'}}
                >
                    <TextField  value={value} onChange={e => setValue(e.target.value)} fullWidth variant={"outlined"}></TextField>
                    <Button onClick={sendMessage} style={{marginTop: '5px'}} variant={'outlined'}>Отправить</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Chat;