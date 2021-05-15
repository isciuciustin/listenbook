import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button, Container, Row, Col, InputGroup, FormControl, Form, Navbar,
    NavDropdown, Item, NavLink, Nav, Image, NavbarBrand, Dropdown, NavItem, DropdownButton, ButtonGroup,
    FormFile, Carousel
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
import { useCollectionData } from "react-firebase-hooks/firestore";
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

const Other = ({ cat }) => {
    const [v, setv] = useState([]);
    const query = db.collection("books").orderBy('createdAt', 'desc').where('category', '==' , cat).limit(3);
    const [nr, setnr] = useState(6);
    useEffect(() => {
        if (window.innerWidth < 576)
            setnr(2);
        else
            setnr(6);
    })
    window.addEventListener('resize', () => {
        if (window.innerWidth < 576)
            setnr(2);
        else
            setnr(6);
    })
    function getdocs() {
        query.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({id: doc.id, ...doc.data()});
            })
            setv(items);
        })

    }
    useEffect(() => {
        getdocs();
        return () => {
            setv([]); // This worked for me
          };
    }, []);
    return (
        <Container className="mt-5 mb-3">
        <OwlCarousel className="owl-theme" items={nr} autoPlay dots>
        {
            v.map((val) => {
                return (
                    <div className="item mr-lg-5 mr-3" key = {val.id}>
                        <img
                            style={{
                                background: "50% 50% no-repeat", objectFit: "cover", height: "200px",
                                borderRadius: '3%'
                            }}
                            className="d-block w-100"
                            src={val.imgurl}
                        />
                    </div>
                )

            })
        }
    </OwlCarousel>
    </Container>
    );
}
export default Other;