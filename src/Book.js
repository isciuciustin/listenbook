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
import ReactAudioPlayer from 'react-audio-player';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Book() {
  const { id } = useParams();
  const [data, setdata] = useState();
  const [like, setlike] = useState(false);
  const [save, setsave] = useState(false)
  const user = firebase.auth().currentUser ? firebase.auth().currentUser : false;
  useEffect(() => {
    const newitems = [];
    const Ref = firebase.database().ref("/books/" + id);
    Ref.on('value', (snapshot) => {
      setdata(snapshot.val())
    });

  }, []);

  useEffect(() => {
    const userRef = firebase.database().ref("users/" + user.displayName + "/liked/" + id);
    const saveRef = firebase.database().ref("users/" + user.displayName + "/saved/" + id);
    userRef.on('value', (val) => {
      if (val.val())
        setlike(true)
      else
        setlike(false)
    });
    saveRef.on('value', (val) => {
      if (val.val())
        setsave(true)
      else
        setsave(false)
    })
  })
  const Save = () => {
    if (!save) {
      var updates = {};
      updates['/users/' + user.displayName + "/saved/" + id] = Date.now();
      firebase.database().ref().update(updates);
    }
    else {
      var updates = {};
      updates['/users/' + user.displayName + "/saved/" + id] = false;
      firebase.database().ref().update(updates);
    }
    setsave(!save);
  }
  const Like = () => {
    if (!like) {
      var updates = {};
      updates['/users/' + user.displayName + "/liked/" + id] = true;
      firebase.database().ref().update(updates);
      var bookRef = firebase.database().ref("/books/" + id + '/likes/');
      bookRef.set(firebase.database.ServerValue.increment(1));
    }
    else {
      var updates = {};
      updates['/users/' + user.displayName + "/liked/" + id] = false;
      firebase.database().ref().update(updates);
      var bookRef = firebase.database().ref("/books/" + id + '/likes/');
      bookRef.set(firebase.database.ServerValue.increment(-1));
    }
    setlike(!like)
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
                src={data ? data.imgurl : ''}

                alt="Second slide"
              />
            </Col>
            <Col className="col-md-8">
              <Card.Body>
                <Card.Title className="d-flex justify-content-center">{data ? data.title : ''}</Card.Title>
                <Card.Text>
                  <dt>
                    By : {data ? data.author : ''}
                  </dt>
                  <dt>
                    Narrated by: {data ? data.name : ''}
                  </dt>
                  <dt>
                    Category: {data ? data.category : ''}
                  </dt>
                  <dt>
                    Description
                              </dt>
                  <dd>
                    {data ? data.desc : ''}
                  </dd>
                  <dt>
                    Released date : {data ? data.rdate : ''}
                  </dt>
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
          <Card.Footer>
            <Row>
              <Col className="col-md-4">
                <Row>
                  <h6 className="mt-2 mr-5">Likes : {data ? data.likes : ''}</h6>
                  <Button variant="danger" size="sm" className="ms-5" disabled={user ? false : true} onClick={Like}>{like ? 'Unlike' : 'Like'}</Button>
                  <button disabled={user ? false : true} style={{ border: 0 }} className="mr-0" onClick={Save}>
                    {save ? <i class="fas fa-bookmark fa-2x"></i> : <i class="far fa-bookmark fa-2x"></i>}

                  </button>
                </Row>
              </Col>
              <Col className="col-md-8 d-flex justify-content-center">
                <ReactAudioPlayer
                  src={data ? data.mp3url : ''}
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