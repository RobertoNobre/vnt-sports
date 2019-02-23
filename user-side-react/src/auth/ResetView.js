import React, { PureComponent } from 'react';
import { Button, FormGroup, ControlLabel } from 'react-bootstrap';
import { withFormik, Form, Field } from 'formik';
import styled from 'styled-components';
import logo from '../assets/img/logo.png';

import Message from '../commons/Message';

const StyledReset = styled.div`
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
    background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
    background-size: 1800% 1800%;
    
    -webkit-animation: rainbow 18s ease infinite;
    -z-animation: rainbow 18s ease infinite;
    -o-animation: rainbow 18s ease infinite;
      animation: rainbow 18s ease infinite;}
    
    @-webkit-keyframes rainbow {
        0%{background-position:0% 82%}
        50%{background-position:100% 19%}
        100%{background-position:0% 82%}
    }
    @-moz-keyframes rainbow {
        0%{background-position:0% 82%}
        50%{background-position:100% 19%}
        100%{background-position:0% 82%}
    }
    @-o-keyframes rainbow {
        0%{background-position:0% 82%}
        50%{background-position:100% 19%}
        100%{background-position:0% 82%}
    }
    @keyframes rainbow { 
        0%{background-position:0% 82%}
        50%{background-position:100% 19%}
        100%{background-position:0% 82%}
    }
`;

const ResetBox = styled.div`
  .login {
    background-color: #fff;
    padding: 0px 20px;
    border-radius: 10px;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.5);
    min-width: 300px;
    max-width: 300px;
  }
`;

class ResetView extends PureComponent {
  state = {

  }

  handleLogin = () => {
    this.props.history.push('/auth/signin');
  }

  render() {
    return (
      <StyledReset>
        <div className="container wrapper">
          <ResetBox>
            <div className="login">
              <Form>
                <div className="form-group">
                  <fieldset>
                    <div className='text-center' style={{ margin: '10px 0'}}>
                      <img src={logo} className="App-logo" alt="logotipo" style={{width: '260px'}} />
                    </div>

                    <FormGroup>
                      <ControlLabel>Senha</ControlLabel>
                      <Field type="password" className="form-control" name="password" />
                    </FormGroup>

                    <FormGroup>
                      <ControlLabel>Confirmar Senha</ControlLabel>
                      <Field type="password" className="form-control" name="confirmPassword" />
                    </FormGroup>

                    <div>
                      <Button
                        type="submit" 
                        className="btn btn-primary btn-block"
                        style={{marginTop: '35px'}}>
                        Salvar
                      </Button>  
                    </div>
                    <div className="form-group text-center" style={{margin: '20px'}}>
                      <Button 
                        bsStyle="link" 
                        style={{color: '#000'}}
                        onClick={this.handleLogin}
                        >
                        Ir para tela de Login
                      </Button>
                    </div>
                    <div className='clearfix' />
                    <Message failures={this.props.failures} messages={this.props.errors} />
                  </fieldset>
                </div>
              </Form>
            </div>
          </ResetBox>
        </div>
      </StyledReset>
    );
  }
}


export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => {
    return {
      password: '',
      confirmPassword: '',
    }
  },
  handleSubmit: async (values, { setSubmitting, props }) => {
    const { onReset } = props;
    
    const res = await onReset(values);
    if (!!res && !!res.data) {
      setSubmitting(false);
      props.history.push('/');
    }
  }
})(ResetView);
