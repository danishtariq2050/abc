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
import Blog from '../components/Blog/Blog';
import BlogDetails from "../components/Blog/BlogDetails";
import NotFound from "../components/NotFound/NotFound";
import Dashboard from "../components/Dashboard/Dashboard";

function Nav() {
    return (
        // fixed-top
        <Router>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark ">
                <Link className="navbar-brand" to={"/"}>Shopping Mart</Link>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/"}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/shop"}>Shop</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/blogs"}>Blogs</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/about"}>About Us</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/contact"}>Contact Us</Link>
                    </li>
                </ul >

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/login"}>Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/register"}>Register</Link>
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
                <Route path="/blogs" element={<Blog />} />
                <Route path="/blogs/:desc" element={<BlogDetails />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router >
    )
}

export default Nav;