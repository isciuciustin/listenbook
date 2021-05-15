import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button, Container, Row, Col, InputGroup, FormControl, Form, Navbar,
  NavDropdown, Item, NavLink, Nav, Image, NavbarBrand, Dropdown, NavItem, DropdownButton, ButtonGroup, Table
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
function Navigation() {
  const [filter, setfilter] = useState(0);
  const [user] = useAuthState(auth);
  const [data, setdata] = useState();
  function SignIn() {

    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }

    return (
      <>
        <button className="btn btn-outline-dark" onClick={signInWithGoogle}>Login</button>
      </>
    )

  }
  useEffect(() => {
    if (user) {
      const Ref = firebase.database().ref("/users/" + user.displayName);
      Ref.on('value', (snapshot) => {
        if (snapshot.val()) {
        }
        else {
          var updates = {};
          updates['/users/' + user.displayName + "/liked/" + "/saved/"] = false;
          firebase.database().ref().update(updates);
        }
      });
    }
  })
  useEffect(() => {
    const items = [];
    const Ref = firebase.database().ref("books");
    Ref.on('value', (snapshot) => {
      const todos = snapshot.val();
      for (let id in todos) {
        items.push({ id, ...todos[id] });
      }
      setdata(items)
    });
  }, []);
  const Btn = () => {
    if (user) {
      return (
        <DropdownButton
          variant="light"
          menuAlign={{ lg: 'right' }}
          title={<Image roundedCircle className="img" width="30" height="30" id="img" src={user.photoURL} />}
          id="dropdown-menu-align-responsive-1"
        >
          <Dropdown.Item variant="light"><Link style={{ textDecoration: 'none', color: "black" }} to={`/${user.displayName}/settings`}><Row className="mx-auto">Settings</Row></Link></Dropdown.Item>
          <Dropdown.Item><Link style={{ textDecoration: 'none', color: "black" }} to={`/${user.displayName}/saved`}><Row className="mx-auto">Saved books</Row></Link> </Dropdown.Item>
          <Dropdown.Item><Link style={{ textDecoration: 'none', color: "black" }} to={`/${user.displayName}/upload`}><Row className="mx-auto">Upload</Row></Link></Dropdown.Item>
          <NavDropdown.Divider />
          <Dropdown.Item><Link style={{ textDecoration: 'none', color: "black" }} to="/"><Row className="mx-auto" onClick={() => auth.signOut()}>Logout</Row></Link></Dropdown.Item>

        </DropdownButton>
      )
    }
    else
      return (
        <SignIn />
      )
  }
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand ><Link to="/" style={{ textDecoration: 'none', color: "black" }}>Listenbook</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline className="mx-auto">
            <InputGroup>
              <FormControl
                type="text" placeholder="Search"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => { setfilter(e.target.value) }}
              />
              <InputGroup.Prepend>
                <Link style={{ textDecoration: 'none', color: "black" }} to={`/${filter}/search`}><Button variant="outline-dark" id="basic-addon1">Search</Button></Link>

              </InputGroup.Prepend>
            </InputGroup>

          </Form>
          <Nav className="float-end">
            <Btn />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Navigation;