import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Nav,
  Navbar,
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

  .navbar-nav>li>.dropdown-menu {
    margin-top: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 200px;
  }

  .dropdown-menu>li>a {
    display: block;
    padding: 8px 20px;
    clear: both;
    font-weight: 400;
    line-height: 1.42857143;
    color: #333;
    white-space: nowrap;
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

  .menuu-button {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-size: 16px;
    color: #333;
    border: none;
    background-color: transparent;
  }

  .icon-menu{
    font-size: 23px;
    margin-top: -px;
    margin-right: 5px;
    margin-bottom: -3px;
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
                  title={ <button className='menuu-button'><FontAwesomeIcon className='icon-menu' icon="user-circle"/> Roberto Nobre</button>} 
                  onSelect={this.onSelectClick}>
                  <MenuItem eventKey={3.1}>Friends List</MenuItem>
                  <MenuItem eventKey={3.2}>Saved Items</MenuItem>
                  <MenuItem eventKey={3.3}>Notifications</MenuItem>
                  <MenuItem eventKey={3.4}>User Preferences</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.4}>Log out</MenuItem>
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
