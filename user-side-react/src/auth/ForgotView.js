import React, { PureComponent } from 'react';
import { Button, FormGroup, ControlLabel } from 'react-bootstrap';
import { withFormik, Field } from 'formik';
import styled from 'styled-components';
import logo from '../assets/img/logo.png';

import Message from '../commons/Message';

const StyledForgot = styled.div`
  .container {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    background-color: #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .wrapper { 
    height: 100%;
    width: 100%;
    left:0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    background-color: #18A689;
`;

const ForgotBox = styled.div`
  .login {
    background-color: #fff;
    padding: 0px 20px;
    border-radius: 10px;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.5);
    min-width: 300px;
    max-width: 300px;
  }
`;

class ForgotView extends PureComponent {
  state = {

  }

  handleLogin = () => {
    this.props.history.push('/auth/signin');
  }

  render() {
    return (
      <StyledForgot>
        <div className="container wrapper">
          <ForgotBox>
            <div className="login">
                <div className="form-group">
                  <fieldset>
                    <div className='text-center' style={{ margin: '10px 0'}}>
                      <img src={logo} className="App-logo" alt="logotipo" style={{width: '260px'}} />
                    </div>

                    <FormGroup>
                      <ControlLabel>User or E-mail</ControlLabel>
                      <Field className="form-control" name="usernameOrEmail" />
                    </FormGroup>

                    <div>
                      <Button
                        type="submit" 
                        className="btn btn-primary btn-block"
                        style={{marginTop: '35px'}}
                        onClick={this.handleLogin}>
                        Send my password in my Mail!
                      </Button>  
                    </div>
                    <div className="form-group text-center" style={{margin: '20px'}}>
                      <Button 
                        bsStyle="link" 
                        style={{color: '#000'}}
                        onClick={this.handleLogin}
                        >
                        Back to login page
                      </Button>
                    </div>
                    <div className='clearfix' />
                    <Message failures={this.props.failures} messages={this.props.errors} />
                  </fieldset>
                </div>
            </div>
          </ForgotBox>
        </div>
      </StyledForgot>
    );
  }
}


export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => {
    return {
      usernameOrEmail: '',
      password: ''
    }
  },
  handleSubmit: async (values, { setSubmitting, props }) => {
    const { onForgot } = props;
    
    const res = await onForgot(values);
    if (!!res && !!res.data) {
      setSubmitting(false);
      props.history.push('/');
    }
  }
})(ForgotView);
