import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import { Link } from "react-router-dom";
import { userActions } from "../Actions";
import { history } from '../Helpers';

export class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.options = [];

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout() {
    userActions.logout();
    history.push('/login');
  }

  render() {
    const { props } = this.props;
    return (
      <Navbar color="primary" dark expand="md">
        <NavbarBrand href="/">The Great Escape Admin Portal</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/order">
                Orders
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/newarrivals">
                New Arrival Posts
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/item">
                Items
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/user">
                Users
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                target="_blank"
                href="http://stores.ebay.com/TheGreatEscapeOnLine"
              >
                eBay Store
              </NavLink>
            </NavItem>
            { localStorage.getItem("user") && (
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Settings
              </DropdownToggle>
              <DropdownMenu right>
                {/* <DropdownItem>{JSON.parse(localStorage.user).Credential.email}</DropdownItem> */}
                <DropdownItem divider />
                <DropdownItem
                  onClick={() => {
                    this.logout();
                  }}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
