import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Nav,
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { onSelect } from '../utils/MenuUtil';
import styled from 'styled-components';
import logo from '../assets/img/logo.png'; 
import Breadcrumbs from './Breadcrumbs';

const MenuDesign = styled.div`  
  .navbar {
    padding-top: 12px;
    min-height: 50px;    
  }

  .navbar-nav>li>.dropdown-menu>li>a:hover {
    color: #18A689;
  }

  .navbar-nav>li{
    margin-right: 30px;
  }

  .navbar-default {
    background-color: #ffffff;
    border: none;
  } 

  .navbar-default .navbar-nav>.open>a, 
  .navbar-default .navbar-nav>.open>a:focus, 
  .navbar-default .navbar-nav>.open>a:hover {
    background-color: #ffffff;
  }
`;

const Logo = styled.img`
  margin-top: -17px;
`

class Menu extends PureComponent {
  onSelectClick = key => onSelect(key, this.props.history);

  render() {
    return (
      <Fragment>
        <MenuDesign>
          <Navbar fixedTop collapseOnSelect fluid>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">
                  <Logo src={logo} />
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>

              <Nav pullRight>
                <NavDropdown 
                  id="reports" 
                  eventKey={3} 
                  title={ <label><FontAwesomeIcon icon="user-circle"/> Roberto Nobre</label>} 
                  onSelect={this.onSelectClick}>
                  <MenuItem eventKey={3.1}>Friends List</MenuItem>
                  <MenuItem eventKey={3.2}>Saved Items</MenuItem>
                  <MenuItem eventKey={3.3}>Notifications</MenuItem>
                  <MenuItem eventKey={3.4}>User Preferences</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.4}>Logout</MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </MenuDesign>
        <Breadcrumbs {...this.props}/>
      </Fragment>
    );
  }
}

export default Menu;
