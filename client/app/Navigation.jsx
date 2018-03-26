import React from "react";
import { Nav, NavItem, Navbar, NavDropdown, MenuItem } from "react-bootstrap";

export default class Navigation extends React.Component {
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">The Great Escape</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#">
              Orders
            </NavItem>
            <NavItem eventKey={2} href="#">
              New Arrivals
            </NavItem>
            <NavItem eventKey={3} href="#">
              Users
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavDropdown eventKey={4} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={4.1}>Action</MenuItem>
              <MenuItem eventKey={4.2}>Another action</MenuItem>
              <MenuItem eventKey={4.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={4.4}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
