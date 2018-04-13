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
import { connect } from "react-redux";
import { history } from '../Helpers';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.options = [];

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout() {
    console.log("Logging out..");
    this.props.dispatch(userActions.logout());
    history.push('/login');
  }

  render() {
    const { props } = this.props;
    return (
      <Navbar color="primary" dark expand="md">
        <NavbarBrand href="/">The Great Escape</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/newarrivals">
                New Item Posts
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/order">
                Orders
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
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Settings
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Account</DropdownItem>
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
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  //const { registering } = state.registration;
  return {};
}

const connectedNavigation = connect(mapStateToProps)(Navigation);
export { connectedNavigation as Navigation };