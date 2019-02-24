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
import IconLevelsRegister from '../components/IconLevelsRegister';

const initialState = {
  row: {
    username: '',
    name: '',
    city: '',
    sun: false,
    tue: false,
    mon: false,
    thu: false,
    wed: false,
    fri: false,
    sat: false,
    ride_group: RideInGroup.ALWAYS.name,
    password: '',
    added_by: 0
  }
}

const PanelStyles = styled.div`
  .panel-default {
    border: none;
  }
  .btn-success { background-color: #1AB394; }
  .btn-success:hover { background-color: #1AB394; }
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
    border-radius: 5px;
    background-color: white;
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
  }
  h3 {
    margin-top: 0px;
    margin-bottom: 10px;
    color: #1AB394;
  }
  .icon { color: #1AB394; }
  body { padding-top: 40px }

  /*** radio ***/
  .container-radio {
    display: table-cell;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding-right: 35px;
  }
  
  /* Hide the browser's default radio button */
  .container-radio input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  
  /* Create a custom radio button */
  .checkmark-radio {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background-color: white;
    border: solid 1px #1AB394;
  }
  
  /* On mouse-over, add a grey background color */
  .container-radio:hover input ~ .checkmark-radio {
    background-color: white;
  }
  
  /* When the radio button is checked, add a blue background */
  .container-radio input:checked ~ .checkmark-radio {
    background-color: white;
  }
  
  /* Create the indicator (the dot/circle - hidden when not checked) */
  .checkmark-radio:after {
    content: "";
    position: absolute;
    display: none;
  }
  
  /* Show the indicator (dot/circle) when checked */
  .container-radio input:checked ~ .checkmark-radio:after {
    display: block;
  }
  
  /* Style the indicator (dot/circle) */
  .container-radio .checkmark-radio:after {
    top: 7px;
    left: 8px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: black;
  }

  .btn-default {
    color: #333;
    background-color: #ccc;;
    border: none;
  }
  .btn-default:hover{
    background-color: #ccc;
  }
  .col-md-1 {
    width: 7%;
  }

  .col2, .col3, .col4, .col5, .col6, .col7{
    padding-top: 50px;
  }

  .check2, .check3, .check4, .check5, .check6, .check7{
    display: none;
  }

  .labelsun {
    margin-top: 50px 
  }
  `;
  
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
      { type: 'email', label: 'E-mail', name: 'email', size: { md: 5 }},
      { type: 'checkbox', label: 'Sun', name: 'sun', className: 'ok', size: { md: 1 }},
      { type: 'checkbox', label: 'Mon', name: 'mon', size: { md: 1 }},
      { type: 'checkbox', label: 'Tue', name: 'tue', size: { md: 1 }},
      { type: 'checkbox', label: 'Wed', name: 'wed', size: { md: 1 }},
      { type: 'checkbox', label: 'Thu', name: 'thu', size: { md: 1 }},
      { type: 'checkbox', label: 'Fri', name: 'fri', size: { md: 1 }},
      { type: 'checkbox', label: 'Sat', name: 'sat', size: { md: 1 }},
    ],
    [
      { type: 'password', label: 'Password', name: 'password', size: { md: 5 }}
    ]
  ];

  // general handle change
  handleChange = (e) => this.setState({ ...this.state, row: { ...this.state.row, [e.target.name]: e.target.value } });

  handleSubmit = async (e) => {
    e.preventDefault();
    const { isEdit, onPut, onPost } = this.props;
    if (!!isEdit) {
      onPut(this.state.row.id, this.state.row);
    } else {
      await onPost(this.state.row);
      if (this.props.failures.length === 0) {
        this.props.history.push('/auth/signin')
      }
      console.log(this.props)
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
              <IconLevelsRegister />
              <Col mdOffset={1} md={10}>
                <hr style={{backgroundSize: '4px', borderTop: '4px solid #C7C7C7', borderColor: '#C7C7C7'}} />
              </Col>
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
