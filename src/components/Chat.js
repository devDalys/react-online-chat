import React, {useContext, useEffect, useState} from 'react';
import {getAuth} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {Avatar, Button, Container, Grid, TextField} from "@mui/material";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Context} from "../index";
import {getFirestore, collection, orderBy, getDocs} from 'firebase/firestore'
import Loader from "./Loader";

const Chat = () => {
    const [messages, setMessage] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const db = getFirestore();
    const auth = getAuth(firebase.firebaseapp);
    const [user] = useAuthState(auth);
    const [value, setValue] = useState('');
    const sendMessage = async () => {
        await firebase.firestore().collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setValue('');
    }
    const getMessage = async () => {
        const data = await collection(db, 'messages')
        getDocs(data).then(async (snapshot) => {
                const msg = [];
                await snapshot.docs.forEach((doc) => {
                    if (doc.data().createdAt != null) {
                        // console.log(doc.data())
                        msg.push({...doc.data()})
                    }
                    ;
                })
                setMessage(msg.sort((a, b) => {
                    return a.createdAt.seconds - b.createdAt.seconds
                }));
            }
        )
    }
    getMessage();
    // const [messages] = useCollectionData(collection(db, 'messages'));
    // getMessage();
    useEffect( () => {
        if (messages) {
            // console.log(messages)
            setIsLoading(false);
        }
    },[messages] )
    // setDataMessages(messages.sort((a, b) => a.createdAt.nanoseconds > b.createdAt.nanoseconds))

    // if(!loading){console.log(messages.sort((a,b) => a.createdAt.nanoseconds > b.createdAt.nanoseconds));}
    if (isLoading) {
        return <Loader/>
    } else if (!isLoading) {
        return (
            <Container>
                <Grid container
                      justifyContent={"center"}
                      style={{height: window.innerHeight - 50, marginTop: '20px'}}>
                    <div style={{width: '100%', height: '70vh', border: '1px solid gray', overflowY: 'auto'}}>
                        {messages?.map(message =>
                            <div style={{
                                margin: 10,
                                border: user.uid === message.uid ? '1px solid green' : '1px solid red',
                                marginLeft: user.uid === message.uid ? 'auto' : '10px',
                                width: 'fit-content',
                                padding: 5,
                                maxWidth:'50%',
                                minWidth:'20%',
                                borderRadius:'4px'
                            }}>
                                <Grid container alignItems={"center"}>
                                    <Avatar src={message.photoURL} style={{marginRight:'10px'}}  />
                                    <div>{message.displayName}</div>

                                </Grid>
                                <div  >{message.text}</div>
                                <div style={{display:'flex', right:'0', justifyContent:'flex-end'}}>
                                    <span>{new Date(message.createdAt.seconds * 1000).getHours()}</span>:
                                    <span>{new Date(message.createdAt.seconds * 1000).getMinutes()}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <Grid
                        container
                        direction={'column'}
                        alignItems={'flex-end'}
                        style={{width: '100%'}}
                    >
                        <TextField value={value} onChange={e => setValue(e.target.value)} fullWidth
                                   variant={"outlined"}></TextField>
                        <Button onClick={sendMessage} style={{marginTop: '5px'}} variant={'outlined'}>Отправить</Button>
                    </Grid>
                </Grid>
            </Container>
        )
    }
    ;
};

export default Chat;