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
import firebase from './firebase'
import Items from './Item'
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const auth = firebase.auth();
const db = firebase.firestore();

function Home() {
    const [data, setdata] = useState([]);
    const [best, setbest] = useState();
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
        const newitems = [];
        const Ref = firebase.database().ref("books");
        Ref.on('value', (snapshot) => {
            const todos = snapshot.val();
            const items = [];
            for (let id in todos) {
                items.push({ id, ...todos[id] });
            }
            items.reverse();
            items.length = 10;
            setdata(items);
        });
    }, []);
    useEffect(() => {
        const newitems = [];
        const Ref = firebase.database().ref("books");
        Ref.on('value', (snapshot) => {
            const todos = snapshot.val();
            const items = [];
            for (let id in todos) {
                items.push({ id, ...todos[id] });
            }
            items.length = 10;
            items.sort(function(a, b){return b.likes - a.likes});
            setbest(items);
        });
    }, []);

    return (
        <Container fluid>
            <Container className="mt-5">
                <Row className="mx-1"><h3>Category</h3></Row>
                <Row className="mt-2">
                    <Col className="col-lg-2 col-4">
                        <Link style={{ textDecoration: 'none', color: "black" }} to="/science" > <Button variant="light" size="md" block>Science</Button></Link>
                    </Col>
                    <Col className="col-lg-2 col-4">
                        <Link style={{ textDecoration: 'none', color: "black" }} to="/literature" > <Button variant="light" size="md" block>Literature</Button></Link>
                    </Col>
                    <Col className="col-lg-2 col-4">
                        <Link style={{ textDecoration: 'none', color: "black" }} to="/economy" > <Button variant="light" size="md" block>Economy</Button></Link>
                    </Col>
                    <Col className="col-lg-2 mt-lg-0 col-4 mt-3">
                        <Link style={{ textDecoration: 'none', color: "black" }} to="/fantasy" > <Button variant="light" size="md" block>Fantasy</Button></Link>
                    </Col>
                    <Col className="col-lg-2 mt-lg-0 col-4 mt-3">
                        <Link style={{ textDecoration: 'none', color: "black" }} to="/history" > <Button variant="light" size="md" block>History</Button></Link>
                    </Col>
                    <Col className="col-lg-2 mt-lg-0 col-4 mt-3">
                        <Link style={{ textDecoration: 'none', color: "black" }} to="/self-help" > <Button variant="light" size="md" block>Self-Help</Button></Link>
                    </Col>
                </Row>
            </Container>
            <Container className="mt-5">
                <Row className="mx-1"><h3>New</h3></Row>
                <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={125}
                    totalSlides={data.length}
                    visibleSlides={nr}
                >
                    <Slider>
                        {
                            data ?
                                data.map((val) => {
                                    return (
                                        <Slide index={0} key = {val.id}>
                                            <div className="mr-lg-5">
                                                <Link style={{ textDecoration: 'none', color: "black" }} to={`/${val.id}/book`}>
                                                    <img
                                                        style={{
                                                            background: "50% 50% no-repeat", objectFit: "cover", height: "200px",
                                                            borderRadius: '3%'
                                                        }}
                                                        className="d-block w-100"
                                                        src={val.imgurl}

                                                        alt="Second slide"
                                                    />
                                                </Link>
                                            </div>
                                        </Slide>
                                    )
                                }) :
                                <Slide index={0}>Loading...</Slide>
                        }
                    </Slider>
                </CarouselProvider>
            </Container>
            <Container className="mt-5 mb-4">
                <Row className="mx-1"><h3>Best</h3></Row>
                <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={125}
                    totalSlides={data.length}
                    visibleSlides={nr}
                >
                    <Slider>
                        {
                            best ?
                                best.map((val) => {
                                    return (
                                        <Slide index={0} key = {val.id}>
                                            <div className="mr-lg-5">
                                                <Link style={{ textDecoration: 'none', color: "black" }} to={`/${val.id}/book`}>
                                                    <img
                                                        style={{
                                                            background: "50% 50% no-repeat", objectFit: "cover", height: "200px",
                                                            borderRadius: '3%'
                                                        }}
                                                        className="d-block w-100"
                                                        src={val.imgurl}

                                                        alt="Second slide"
                                                    />
                                                </Link>
                                            </div>
                                        </Slide>
                                    )
                                }) :
                                <Slide index={0}>Loading...</Slide>
                        }
                    </Slider>
                </CarouselProvider>
            </Container>
        </Container>


    );
}

export default Home;