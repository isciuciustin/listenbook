import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button, Container, Row, Col, Card, InputGroup, FormControl
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
const auth = firebase.auth();
const db = firebase.firestore();


function Search() {
  const { text } = useParams();
  const [data, setdata] = useState();
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
  });
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
  return (

    <Container>
      <Row>
        {
          text != '0' ?
            data ? data.filter((val) => {
                if (val.title.toLowerCase().includes(text.toLowerCase()))
                  return val;
            }).map((val) => {
                return (
                  <Col className="col-lg-2 col-md-3 col-6 mt-3 mt-3">
                    <Link style={{ textDecoration: 'none', color: "black" }} to={`/${val.id}/book`}>
                      <Card bg="dark" text="light" style={{ borderRadius: "5%" }} border="light">
                        <Card.Img style={{
                          background: "50% 50% no-repeat", objectFit: "cover", height: "200px",
                          borderRadius: '3%'
                        }} variant="top" src={val.imgurl} />
                        <Card.Footer><h6>{val.title}</h6></Card.Footer>
                      </Card>
                    </Link>
                  </Col>
                )
             
            }) : <h1>Nothing found!</h1> : <h1>Nothing found!</h1>
           
        }
      </Row>
    </Container>
  );
}
export default Search;