import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button, Container, Row, Col, InputGroup, FormControl, Form, Navbar,
  NavDropdown, Item, NavLink, Nav, Image, NavbarBrand, Dropdown, NavItem, DropdownButton, ButtonGroup,
  FormFile
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
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const auth = firebase.auth();
const db = firebase.firestore();

function Upload() {
  const [user] = useAuthState(auth);
  const [title, settitle] = useState('');
  const [author, setauth] = useState('');
  const [desc, setdesc] = useState('');
  const [rdate, setrdate] = useState('');
  const [cat, setcat] = useState('science');;
  const [test, settest] = useState([]);
  const [progres1, setpro1] = useState("Mp3 file");
  const [progres2, setpro2] = useState("Thumbnail");
  const [btnclass, setbtnclass] = useState("outline-dark");
  const [mp3url, setmp3] = useState('');
  const [imgurl, setimg] = useState('');
  const mp3file = (e) => {
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref(file.name);
    var x = storageRef.put(file);
    var imageurl = "";
    x.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setpro1("Loding is " + parseInt(progress) + "% complete!");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            ;
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            setbtnclass("outline-dark disabled");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      },
      () => {
        x.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setmp3(downloadURL)
        });
        setbtnclass("outline-dark");

      }
    )
  }
  const thm = (e) => {
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref(file.name);
    var x = storageRef.put(file);
    x.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setpro2("Loding is " + parseInt(progress) + "% complete!");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            ;
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            setbtnclass("outline-dark disabled");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      },
      () => {
        x.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setimg(downloadURL)
        });
        setbtnclass("outline-dark");

      }
    )
  }
  const fun = () => {
    const Ref = firebase.database().ref("books");
    const book = {
      name: user.displayName,
      title: title,
      author: author,
      desc: desc,
      rdate: rdate,
      mp3url: mp3url,
      imgurl: imgurl,
      likes: 0,
      category : cat,
      createdAt: firebase.database.ServerValue.TIMESTAMP
    };
    Ref.push(book).then(() => {
      window.location.reload();
    })
  };

  return (
    <Container className="mt-5" >
      <Form>
        <h2>{test}</h2>
        <h4 mt={5}>Upload an audio book!</h4>
        <Form.Group controlId="form1">
          <Form.Label className="mt-2">Title</Form.Label>
          <Form.Control type="text" placeholder="Title of book" onChange={(e) => {
            settitle(e.target.value);
          }} />
        </Form.Group>
        <Form.Group controlId="form2">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" placeholder="Author of the book" onChange={(e) => {
            setauth(e.target.value);
          }} />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description of the book</Form.Label>
          <Form.Control as="textarea" onChange={(e) => {
            setdesc(e.target.value);
          }} />
          <Form.Group controlId="exampleForm.ControlSelect1" className = "mt-3">
            <Form.Label>Select category</Form.Label>
            <Form.Control as="select" onChange={(e) => {
            setcat(e.target.value);
          }}>
              <option>science</option>
              <option>literature</option>
              <option>economy</option>
              <option>fantasy</option>
              <option>history</option>
              <option>self-help</option>
            </Form.Control>
          </Form.Group>
        </Form.Group>
        <Form.Group controlId="form2">
          <Form.Label>Released Date</Form.Label>
          <Form.Control type="date" onChange={(e) => {
            setrdate(e.target.value);
          }} />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label id="progres1">{progres1}</Form.Label>
              <Form.Control type="file" placeholder="Place file" id="mp3" onChange={mp3file} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label id="progres1">{progres2}</Form.Label>
              <Form.Control type="file" placeholder="Place file" id="image" onChange={thm} />
            </Form.Group>
          </Col>
        </Row>

        <Button variant={btnclass} onClick={fun}>
          Submit
            </Button>
      </Form>
    </Container>
  )
}
export default Upload;