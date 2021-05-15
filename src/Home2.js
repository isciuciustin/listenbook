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

function Home() {
    const [nr, setnr] = useState(3);
    useEffect(() => {
        if (window.innerWidth < 576)
            setnr(1);
        else
            setnr(3);
    })
    window.addEventListener('resize', () => {
        if (window.innerWidth < 576)
            setnr(1);
        else
            setnr(3);
    })
    return (
        <Container>
        <OwlCarousel className="owl-theme" items={nr} autoPlay dots>
        
            <div className="item mr-lg-5">
                <img
                    style={{
                        background: "50% 50% no-repeat", objectFit: "cover", height: "350px",
                        borderRadius: '5%'
                    }}
                    className="d-block w-100"
                    src="https://instagram.fsbz1-2.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/167514205_473783607025476_4472841963188034000_n.jpg?tp=1&_nc_ht=instagram.fsbz1-2.fna.fbcdn.net&_nc_cat=100&_nc_ohc=5Mwz98xw00YAX80CDV2&edm=AP_V10EAAAAA&ccb=7-4&oh=88dd651e8e0fb7369dd12b6699980fed&oe=60926534&_nc_sid=4f375e"
                    alt="Second slide"
                />
            </div>
            <div className="item mr-lg-5">
                <img
                    style={{
                        background: "50% 50% no-repeat", objectFit: "cover", height: "350px",
                        borderRadius: '5%'
                    }}
                    className="d-block w-100"
                    src="https://instagram.fsbz1-1.fna.fbcdn.net/v/t51.2885-15/e35/170507959_289489419441735_3361778707106976931_n.jpg?tp=1&_nc_ht=instagram.fsbz1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=_o-4jWblXTcAX-RjSXO&edm=AP_V10EAAAAA&ccb=7-4&oh=1e52e573a8bc68d901e071bcb1398302&oe=60919C0E&_nc_sid=4f375e"
                    alt="Second slide"
                />
            </div>
            <div className="item  mr-lg-5">
                <img
                    style={{
                        background: "50% 50% no-repeat", objectFit: "cover", height: "350px",
                        borderRadius: '5%'
                    }}
                    className="d-block w-100"
                    src="https://instagram.fsbz1-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/167621666_1723829921135212_3728425876679755274_n.jpg?tp=1&_nc_ht=instagram.fsbz1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=EDdtpNbAb10AX8PV5zL&edm=AP_V10EAAAAA&ccb=7-4&oh=b085403908516541bee10a295d442bf9&oe=60924461&_nc_sid=4f375e"
                    alt="Second slide"
                />
            </div>
            <div className="item mr-lg-5">
                <img
                    style={{
                        background: "50% 50% no-repeat", objectFit: "cover", height: "350px",
                        borderRadius: '5%'
                    }}
                    className="d-block w-100"
                    src="https://instagram.fsbz1-2.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/167514205_473783607025476_4472841963188034000_n.jpg?tp=1&_nc_ht=instagram.fsbz1-2.fna.fbcdn.net&_nc_cat=100&_nc_ohc=5Mwz98xw00YAX80CDV2&edm=AP_V10EAAAAA&ccb=7-4&oh=88dd651e8e0fb7369dd12b6699980fed&oe=60926534&_nc_sid=4f375e"
                    alt="Second slide"
                />
            </div>
            <div className="item mr-lg-5">
                <img
                    style={{
                        background: "50% 50% no-repeat", objectFit: "cover", height: "350px",
                        borderRadius: '5%'
                    }}
                    className="d-block w-100"
                    src="https://instagram.fsbz1-2.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/147555815_251685186442393_756210495149576431_n.jpg?tp=1&_nc_ht=instagram.fsbz1-2.fna.fbcdn.net&_nc_cat=101&_nc_ohc=8U1KooiaqOUAX975rNz&edm=AP_V10EAAAAA&ccb=7-4&oh=5c00b094edd7716eca480ff62fc9481e&oe=60963EC7&_nc_sid=4f375e"
                    alt="Second slide"
                />
            </div>
        </OwlCarousel>
        </Container>
    );
}

export default Home;