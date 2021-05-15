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
import firebase from './firebase'
import 'firebase/firestore'
import 'firebase/auth'
import Display from './Display'
import { useAuthState } from "react-firebase-hooks/auth";
import ReactAudioPlayer from 'react-audio-player';

const auth = firebase.auth();
const db = firebase.firestore();

function Saved() {
  const { name } = useParams();
  const [v, setv] = useState([]);
  const [data, setdata] = useState();
  useEffect(() => {
    const newitems = [];
    const Ref = firebase.database().ref("/users/" + name + "/saved");
    Ref.on('value', (snapshot) => {
      const todos = snapshot.val();
      const items = [];
      for (let id in todos) {
        if(todos[id])
        newitems.push({id : id,value: todos[id]});
      }
      newitems.sort(function(a, b){return b.value - a.value});
      setdata(newitems);
    });

  }, []);
  return (
    <Container>
      <Row>
        {
          data ? data.map((val) => {
            return (
              <Display id = {val.id} />
            )
          }) : ''
        }
      </Row>
    </Container>
  )

}
export default Saved;
