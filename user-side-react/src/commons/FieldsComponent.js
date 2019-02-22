import React, { PureComponent, Fragment } from 'react';
import { Col, Row, FormGroup, ControlLabel } from 'react-bootstrap';
import { Field, ErrorMessage } from 'formik';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';


const sanitizeIsArray = (item) => {
  if (Object.keys(item).length === 0) {
    item = [];
  }


  if (!(item instanceof Array)) {
    let res = [];
    res.push(item);
    return res;
  } else {
    return item;
  }
}

const SwitchComponent = ({ item, errors }) => {
  switch (item.type) {
    
    case 'checkbox':
    return (
      <Field style={{marginLeft: '10px'}} type="checkbox" name={item.name} disabled={item.disabled} />
      )
      case 'select':
      return (
        <Field component={item.type} className="form-control" name={item.name} disabled={item.disabled}>
          {!!item.options && item.options.map(item => <option key={item.id} value={item.name}>{item.value}</option>)}
        </Field>
      );
      
    case 'autocomplete':    
      return <AsyncTypeahead
        defaultSelected={ (!!item.defaultSelected && sanitizeIsArray(item.defaultSelected)) || [] }
        minLength={item.minLength || 3}
        caseSensitive={item.caseSensitive || false}
        searchText={item.searchText || 'Pesquisando...'}
        labelKey={ item.labelKey || 'value'}
        placeholder={ item.placeholder || 'Digite no mínimo 3 caracteres' }
        isLoading={ item.isLoading || false }
        allowNew={ item.allowNew || false }
        multiple={ item.multiple || false }
        onChange={ item.onChange }
        onSearch={ item.onSearch }
        options={ item.options } />

    default:
      return (
        <Field {...item} type={item.type} className="form-control" name={item.name} disabled={item.disabled} />
      );
  }
}

export default class FieldsComponent extends PureComponent {

  render() {
    const { fields, errors } = this.props;
    return (
      <Fragment>
        {
          fields.map((row, idx) => {
            return (
              <Row key={`row-${idx}`} md={12}>
                {
                  row.map((item) => {
                    if (item.type === 'separation') {
                      return (<Col key={`sep-${item.name}`} md={12}><hr></hr></Col>)
                    }
                    return (<Col key={`others-${item.name}`} md={(!!item.size && item.size.md) || 4}>
                        <FormGroup validationState={!!errors && errors[item.name] ? 'error' : null}>
                          <ControlLabel>{item.label}</ControlLabel>
                          <SwitchComponent {...item} item={item} errors={errors} />
                          <ErrorMessage name={item.name} />
                        </FormGroup>
                      </Col>
                      )
                  })
                }
              </Row>
            )
          })
        }
      </Fragment>
    );
  }
}
