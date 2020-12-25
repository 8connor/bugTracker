import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./index.css"

function TopNav() {
    const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();
    const { isAuthenticated } = useAuth0();

    return (
        <Navbar bg="dark" variant="dark" className="shadow">
            <Navbar.Brand href={`${isAuthenticated ? `/dashboard` : `/`}`}>Bug Tracker</Navbar.Brand>
            <Nav className="mr-auto">
                {isAuthenticated ?
                    <>
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        <Link to="/help" className="nav-link">Help</Link>
                    </>
                    :
                    <>
                        <Link to="/" className="nav-link">Home</Link>
                    </>
                }
                <Link to="/about" className="nav-link">About</Link>
            </Nav>
            <Nav className="ml-auto">
                {isAuthenticated ?
                    <Link to="/logout" className="nav-link loginButton bg-danger text-light rounded" onClick={() => logout({ returnTo: window.location.origin })}>Logout</Link>
                    :
                    <Link to="/login" className="nav-link loginButton bg-success text-light rounded" onClick={() => loginWithRedirect()}>Login</Link>
                }
            </Nav>
        </Navbar>
    )
}

export default TopNav;