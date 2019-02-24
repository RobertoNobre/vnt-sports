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
import { PanelStylesJS } from './userViewStyle';
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

const PanelStyles = PanelStylesJS;
  
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
