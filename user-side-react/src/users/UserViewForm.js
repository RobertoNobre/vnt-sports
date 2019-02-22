import React, { PureComponent, Fragment } from 'react';
import {
  Glyphicon,
  Panel,
  Button,
} from 'react-bootstrap';
import { withFormik, Form } from 'formik';
//import Yup from 'yup';

import Message from '../commons/Message';
import Loading from '../commons/Loading';
import FieldsComponent from '../commons/FieldsComponent';

class UserViewForm extends PureComponent {
  fields = [
    [
      { type: 'text',   label: 'Username', name: 'username',   size: { md: 2 } },
      { type: 'text',  label: 'Name',   name: 'name', size: { md: 7 } },
    ],
  ];

  handleSave = async () => {
    const { isEdit, values, resetForm, onPut, onPost } = this.props;
    if (!!isEdit) {
      await onPut(values.id, values);
    } else {
      const {errors} = await onPost(values);
      if (!errors) {
        resetForm();
      }
    }
  }

  handleCancel = () => {
    this.props.history.push('/users');
  }

  render() {
    const { isEdit, errors, touched } = this.props;
    return (
      <Fragment>
        <Form>
          <Panel>
            <Panel.Heading>
              <h3 style={{marginTop: '0px'}}>{ isEdit ? 'Alterar' : 'Registration' }</h3>
              <Loading loading={this.props.loading} />
            </Panel.Heading>
            <Panel.Body>
              <FieldsComponent
                fields={this.fields}
                errors={errors}
                touched={touched}
                isEdit={isEdit}
              />
            </Panel.Body>
            <Panel.Footer className="text-right">
              <Button onClick={this.handleCancel} style={{ marginRight: '10px' }}>
                Cancelar
              </Button>
              <Button bsStyle="success" onClick={this.handleSave}>
                <Glyphicon glyph="floppy-disk" /> Salvar
              </Button>
            </Panel.Footer>
          </Panel>
        </Form>
        <Message messages={this.props.messages} failures={this.props.failures} />
      </Fragment>
    );
  }
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    const { row } = props;
    return {
      code: row.code || '',
      description: row.description || '',
    }
  },

  // handleSubmit: (values, {setSubmitting, props}) => {
  // },

  // validationSchema: Yup.object().shape({
  //   type: Yup.string().trim().required('Obrigatório'),
  //   name: Yup.string().trim().required('Obrigatório')
  // }),

})(UserViewForm);
