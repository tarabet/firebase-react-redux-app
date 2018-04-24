import React from "react";
import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import NavbarUserPanel from "../nav-user-panel";

export default class NavbarComponent extends React.Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a>React-Bootstrap</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <LinkContainer to="/">
                        <NavItem>Home</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/about-us">
                        <NavItem>About</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/private">
                        <NavItem>Private</NavItem>
                    </LinkContainer>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <MenuItem>Action</MenuItem>
                        <MenuItem>Another action</MenuItem>
                        <MenuItem>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem>Separated link</MenuItem>
                    </NavDropdown>
                </Nav>
                <NavbarUserPanel />
            </Navbar>
        )
    }
}