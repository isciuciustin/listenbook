import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button, Container, Row, Col, InputGroup, FormControl, Form, Navbar,
  NavDropdown, ListGroup, ListGroupItem, Item, NavLink, Nav, Image, NavbarBrand, Dropdown, NavItem, DropdownButton, ButtonGroup,
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


const Display = ({ id }) => {
  const [data , setdata] = useState() 
  useEffect(() => {
    const Ref = firebase.database().ref("/books/" + id);
    Ref.on('value', (doc) => {
      setdata(doc.val())
    });
  }, []);
  return (
    <Col className="col-lg-2 col-md-3 col-6 mt-3 mt-3">
      <Link style={{ textDecoration: 'none', color: "black" }} to={`/${id}/book`}>
        <Card bg="dark" text="light" style = {{borderRadius : "5%"}} border="light">
          <Card.Img style={{
            background: "50% 50% no-repeat", objectFit: "cover", height: "200px",
            borderRadius: '3%'
          }} variant="top"  src = {data ? data.imgurl : ''} />
          <Card.Footer><h6>{data ? data.title : ''}</h6></Card.Footer>
        </Card>
      </Link>
    </Col>
  )
}
export default Display;