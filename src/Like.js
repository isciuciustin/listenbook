import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button, Container, Row, Col, InputGroup, FormControl, Form, Navbar,
    NavDropdown, Item, NavLink, Nav, Image, NavbarBrand, Dropdown, NavItem, DropdownButton, ButtonGroup,
    FormFile, Card
} from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { useAuthState } from "react-firebase-hooks/auth";
import ReactAudioPlayer from 'react-audio-player';
import Other from './Other';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyB-M8F5p3aA6EYR1jha2kr03imC8WcuMKo",
        authDomain: "test2-68f21.firebaseapp.com",
        projectId: "test2-68f21",
        storageBucket: "test2-68f21.appspot.com",
        messagingSenderId: "426274490977",
        appId: "1:426274490977:web:3aaeeaf5b2e81e7ba33820"
    })
} else {
    firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore();



const Like = () => {
    const ID = 'lLPFOnL9kutWhFxbHhK0'
    const user =  firebase.auth().currentUser ? firebase.auth().currentUser : false;
    const [status, setstatus] = useState( user ? 
        db.collection("users").doc(user.displayName).get().then((doc) => {
            var map = doc.data().liked;
            if (map[ID])
                setstatus(false);
            else
                setstatus(true)
        }) : true)
    const [likes, setlikes] = useState();
    const query = db.collection('books').doc(ID).get().then(doc => { setlikes(doc.data().likes) })
    const like = () => {
        if (status) {
            db.collection('books').doc(ID).update({
                likes: likes + 1
            }).then(
                setlikes(likes + 1),
                db.collection("users").doc(user.displayName).get().then((doc) => {
                    var map = doc.data().liked;
                    map[ID] = true;
                    db.collection("users").doc(user.displayName).update({
                        liked: { ...map }
                    })
                })
            )
        }
        else {
            db.collection('books').doc(ID).update({
                likes: likes - 1
            }).then(
                setlikes(likes - 1),
                db.collection("users").doc(user.displayName).get().then((doc) => {
                    var map = doc.data().liked;
                    map[ID] = false;
                    db.collection("users").doc(user.displayName).update({
                        liked: { ...map }
                    })
                })
            )
        }
        setstatus(!status);
    }
    return (
        <Container>
            <h1>{likes}</h1>
            <Button disabled = {user ? false : true} onClick={like}>{status ? 'Like' : 'Unlike'}</Button>
        </Container>

    )
}
export default Like;