import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function NavBar(props) {
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand>Todo App Powered By Ethereum BlockChain</Navbar.Brand>
            <Nav className="mr-auto"></Nav>
            <Nav>
                <Navbar.Text>Signed in as: {props.account}</Navbar.Text>
            </Nav>
        </Navbar>
    )
}

export default NavBar;