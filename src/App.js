import './App.css';
import firebase from './firebase'
import React from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  Container, Table
} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Home from "./Home";
import Save from "./Saved";
import Navigation from "./Navbar"
import Upload from "./Upload"
import Book from "./Book"
import Search from "./Search"
import Like from './Like'
import Category from "./Category"

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/:text/search">
          <Search />
        </Route>
        <Route path="/:id/book">
          <Book />
        </Route>
        <Route path="/:name/upload">
          <Upload />
        </Route>
        <Route path="/:name/saved">
          <Save />
        </Route>
        <Route path="/:name/settings">
          <h4>Coming soon...</h4>
        </Route>
        <Route path="/:cat">
          <Category />
        </Route>
      </Switch>

    </Router>

  );
}

export default App;

