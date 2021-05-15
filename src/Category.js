import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button, Container, Row, Col, InputGroup, FormControl, Form, Navbar,
    NavDropdown, Item, NavLink, Nav, Image, NavbarBrand, Dropdown, NavItem, DropdownButton, ButtonGroup,
    FormFile, Carousel, Card
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

function Category() {
    const { cat } = useParams();
    const [data, setdata] = useState([]);
    useEffect(() => {
        const newitems = [];
        const Ref = firebase.database().ref("books");
        Ref.on('value', (snapshot) => {
            const todos = snapshot.val();
            const items = [];
            for (let id in todos) {
                if(todos[id].category == cat){
                    items.push({ id, ...todos[id] })
                }
            }
            setdata(items)
        });
    }, []);
    return (
        <Container>
            <Row>
                {
                    data.map((val) => {
                        return (
                            <Col className="col-lg-2 col-md-3 col-6 mt-3 mt-3">
                            <Link style={{ textDecoration: 'none', color: "black" }} to={`/${val.id}/book`}>
                              <Card bg="dark" text="light" style = {{borderRadius : "5%"}} border="light">
                                <Card.Img style={{
                                  background: "50% 50% no-repeat", objectFit: "cover", height: "200px",
                                  borderRadius: '3%'
                                }} variant="top" src={val.imgurl} />
                                <Card.Footer className = "d-flex justify-content-center">{val.title}</Card.Footer>
                              </Card>
                            </Link>
                          </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}
export default Category;
