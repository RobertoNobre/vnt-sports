import React, { PureComponent } from 'react';
import { Button, FormGroup, ControlLabel } from 'react-bootstrap';
import { withFormik, Form, Field } from 'formik';
import styled from 'styled-components';
import logo from '../assets/img/logo.png';

import Message from '../commons/Message';

const StyledLogin = styled.div`
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
  }
`;

const LoginBox = styled.div`
  .login {
    background-color: #fff;
    padding: 0px 20px;
    border-radius: 10px;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.5);
    min-width: 300px;
    max-width: 300px;
  }
`;

class LoginView extends PureComponent {
  state = {

  }

  handleForgot = () => {
    this.props.history.push('/auth/forgot');
  }

  handleRegister = () =>{
    this.props.history.push('/register');
  }

  render() {
    return (
      <StyledLogin>
        <div className="container wrapper">
          <LoginBox>
            <div className="login">
              <Form>
                <div className="form-group">
                  <fieldset>
                    <div className='text-center' style={{ margin: '10px 0'}}>
                      <img src={logo} className="App-logo" alt="logotipo" style={{width: '260px'}} />
                    </div>

                    <FormGroup>
                      <ControlLabel>User</ControlLabel>
                      <Field className="form-control" name="usernameOrEmail" />
                    </FormGroup>

                    <FormGroup>
                      <ControlLabel>Password</ControlLabel>
                      <Field type="password" className="form-control" name="password" />
                    </FormGroup>

                    <div>
                      <Button
                        type="submit" 
                        className="btn btn-primary btn-block"
                        style={{marginTop: '35px'}}>
                        Get in
                      </Button>  
                    </div>
                    <div className="form-group text-center" style={{margin: '20px'}}>
                      <Button 
                        bsStyle="link" 
                        style={{color: '#000'}}
                        onClick={this.handleRegister}
                        >
                        Register
                      </Button>
                      <Button 
                        bsStyle="link" 
                        style={{color: '#000'}}
                        onClick={this.handleForgot}
                        >
                        I forgot my pass
                      </Button>
                    </div>
                    <div className='clearfix' />
                    {console.log(this.props)}
                    <Message failures={this.props.failures} messages={this.props.errors} />
                  </fieldset>
                </div>
              </Form>
            </div>
          </LoginBox>
        </div>
      </StyledLogin>
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
    const { onLogin } = props;
    
    const res = await onLogin(values);
    if (!!res && !!res.data) {
      setSubmitting(false);
      props.history.push('/');
    }
  }
})(LoginView);
