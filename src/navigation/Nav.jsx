import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes
} from "react-router-dom";
import Home from '../components/Homepage/Home';
import About from '../components/About/About';
import Contact from '../components/Contact/Contact';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Shop from '../components/Shop/Shop';

function Nav() {
    return (
        // fixed-top
        <Router>
            <nav class="navbar navbar-expand-sm bg-dark navbar-dark ">
                <Link class="navbar-brand" to={"/"}>Shopping Mart</Link>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <Link class="nav-link" to={"/"}>Home</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to={"/shop"}>Shop</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to={"/about"}>About Us</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to={"/contact"}>Contact Us</Link>
                    </li>
                </ul >

                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <Link class="nav-link" to={"/login"}>Login</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to={"/register"}>Register</Link>
                    </li >
                </ul >
            </nav >

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/shop" element={<Shop />} />
            </Routes>
        </Router >
    )
}

export default Nav;