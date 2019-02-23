import React, { PureComponent, Fragment } from 'react';
import {
  Panel,
  Button,
  Col,
} from 'react-bootstrap';

import Message from '../commons/Message';
import PageTitle from './../components/PageTitle';
import RideInGroup, { RideInGroupCombo } from '../enums/RideInGroup'
import FieldsComponent from '../commons/FieldsComponentBasic';
import styled from 'styled-components';

const initialState = {
  row: {
    status: RideInGroup.ALWAYS.name,
  }
}

const PanelStyles = styled.div`
  .btn-success { background-color: #1AB394; }
  .form-control:focus {
    border-color: #1AB394;
    outline: 0;
    box-shadow: inset 0 1px 1px rgba(0,0,0,0.5), 0 0 5px #1AB394;
  }
  @media (min-width:768px) {
    .fi{ margin-left: 40px; }
    hr{ margin-top: 40px; }
  } 
  
  .container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  /* Hide the browser's default checkbox */
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  
  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: white;
    border-radius: 5px;
    border: solid 1px #1AB394;
  }
  
  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: white;
  }
  
  /* When the checkbox is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: white;
  }
  
  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  
  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }
  
  /* Style the checkmark/indicator */
  .container .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid black;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }`;
  
class UserViewForm extends PureComponent {
  state = initialState;

  fields = () => [
    [
      { type: 'text', label: 'Username', name: 'username', size: { md: 5 }},
      { type: 'text', label: 'City', name: 'city', size: { md: 5 }},
    ],
    [
      { type: 'text', label: 'Name', name: 'name', size: { md: 5 }},
      { type: 'radio', label: 'Ride in group?', name: 'ride_group', size: { md: 5 }, options: RideInGroupCombo },
    ],
    [
      { type: 'email', label: 'E-mail',  name: 'email', size: { md: 5 }},
      { type: 'checkbox', title: 'Days of the week', label: 'Sun', name: 'sun', size: { md: 1 }},
      { type: 'checkbox', label: 'Mon', name: 'mon', size: { md: 1 }},
      { type: 'checkbox', label: 'Tue', name: 'tue', size: { md: 1 }},
      { type: 'checkbox', label: 'Wed', name: 'wed', size: { md: 1 }},
      { type: 'checkbox', label: 'Thu', name: 'thu', size: { md: 1 }},
      { type: 'checkbox', label: 'Fri', name: 'fri', size: { md: 1 }},
      { type: 'checkbox', label: 'Sat', name: 'sat', size: { md: 1 }},
    ],
  ];

  // general handle change
  handleChange = (e) => this.setState({ ...this.state, row: { ...this.state.row, [e.target.name]: e.target.value } });

  handleSubmit = async (e) => {
    e.preventDefault();
    const { isEdit, onPut, onPost } = this.props;
    if (!!isEdit) {
      onPut(this.state.row.id, this.state.row);
    } else {
      const { errors } = await onPost(this.state.row);
      if (!errors) {
        this.setState({ ...this.initialState });
      }
    }
  }

  handleCancel = () => {
    this.props.history.push('/Users');
  }

  render() {
    console.warn('render')
    const { isEdit } = this.props;
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
        <PanelStyles>
          <Panel>
            <Panel.Body>
              <PageTitle title={ isEdit ? 'Alterar' : 'Registration' } />
              <Col  mdOffset={1}>
              {
                this.fields() && 
                <FieldsComponent fields={this.fields()} values={this.state.row} handleChange={this.handleChange} isEdit={isEdit} />
              }
              <Button type="submit" bsStyle="success" style={{ marginRight: '10px' }}>
                Save
              </Button>
              <Button onClick={this.handleCancel}>
                Discard
              </Button>
            </Col>
            </Panel.Body>
          </Panel>
        </PanelStyles>
        </form>
        <Message messages={this.props.messages} failures={this.props.failures} />
      </Fragment>
    );
  }
}

export default UserViewForm;
