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
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Items({val}) {
    return (
        <div className="item mr-lg-5 mr-3">
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
    )
}