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

const Book = () => {
    const user = firebase.auth().currentUser ? firebase.auth().currentUser : false;
    const { id } = useParams();
    const [likes, setlikes] = useState();
    const [data, setdata] = useState(db.collection('books').doc(id).get().then(doc => { setdata(doc.data()) }));
    const [like, setlike] = useState(false);
    const [save, setsave] = useState(false)
    const fetchBlogs = async () => {
        const query = db.collection('books').doc(id).get().then(doc => { setlikes(doc.data().likes) });
        if (user) {
            db.collection("users").doc(user.displayName).get().then((doc) => {
                var map = doc.data().liked;
                var map2 = doc.data().saved;
                if (map2[id])
                    setsave(true);
                else
                    setsave(false);
                if (map[id])
                    setlike(true);
                else
                    setlike(false);
            })
        }
    }
    useEffect(() => {
        fetchBlogs();
    }, [])
    const Like = () => {
        if (!like) {
            db.collection('books').doc(id).update({
                likes: likes + 1
            }).then(
                setlikes(likes + 1),
                db.collection("users").doc(user.displayName).get().then((doc) => {
                    var map = doc.data().liked;
                    map[id] = true;
                    db.collection("users").doc(user.displayName).update({
                        liked: { ...map }
                    })
                })
            )

        }
        else {
            db.collection('books').doc(id).update({
                likes: likes - 1
            }).then(
                setlikes(likes - 1),
                db.collection("users").doc(user.displayName).get().then((doc) => {
                    var map = doc.data().liked;
                    map[id] = false;
                    db.collection("users").doc(user.displayName).update({
                        liked: { ...map }
                    })
                })
            )
        }

        setlike(!like)
    }
    const Save = () => {
        if (!save) {
            db.collection("users").doc(user.displayName).get().then((doc) => {
                var map = doc.data().saved;
                map[id] = true;
                db.collection("users").doc(user.displayName).update({
                    saved: { ...map }
                })
            })
        }
        else {
            db.collection("users").doc(user.displayName).get().then((doc) => {
                var map = doc.data().saved;
                map[id] = false;
                db.collection("users").doc(user.displayName).update({
                    saved: { ...map }
                })
            })
        }
        setsave(!save)
    }
    return (
        <Container fluid>
            <Container>
                <Card className="mt-5" bg="light">
                    <Row>
                        <Col className="col-md-3 col-12 m-auto">
                            <img
                                style={{
                                    background: "50% 50% no-repeat", objectFit: "cover", height: "350px",
                                    borderRadius: '3%'
                                }}
                                className="d-block w-100 img-fluid"
                                src={data.imgurl}

                                alt="Second slide"
                            />
                        </Col>
                        <Col className="col-md-8">
                            <Card.Body>
                                <Card.Title className="d-flex justify-content-center">{data.title}</Card.Title>
                                <Card.Text>
                                    <dt>
                                        By : {data.author}
                                    </dt>
                                    <dt>
                                        Narrated by: {data.name}
                                    </dt>
                                    <dt>
                                        Category: {data.category}
                                    </dt>
                                    <dt>
                                        Description
                                    </dt>
                                    <dd>
                                        {data.desc}
                                    </dd>
                                    <dt>
                                        Released date : {data.rdate}
                                    </dt>
                                </Card.Text>
                            </Card.Body>
                        </Col>
                    </Row>
                    <Card.Footer>
                        <Row>
                        <Col className="col-md-4">
                            <Row>
                                <h6 className="mt-2 mr-5">Likes : {likes}</h6>
                                <Button variant="danger" size="sm" className="ms-5" disabled={user ? false : true} onClick={Like}>{like ? 'Unlike' : 'Like'}</Button>
                                <button disabled={user ? false : true} style={{ border: 0 }} className="mr-0" onClick={Save}>
                                    {save ? <i class="fas fa-bookmark fa-2x"></i> : <i class="far fa-bookmark fa-2x"></i>}

                                </button>
                            </Row>
                        </Col>
                        <Col className="col-md-8 d-flex justify-content-center">
                            <ReactAudioPlayer
                                src={data.mp3url}
                                autoPlay
                                controls
                            />
                        </Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </Container>
        </Container>

    )
}
export default Book;
