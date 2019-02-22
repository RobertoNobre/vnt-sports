import React, { PureComponent, Fragment } from 'react';
import { Col, Row, FormGroup, ControlLabel } from 'react-bootstrap';

import MaskedInput from 'react-text-mask'

import 'react-bootstrap-typeahead/css/Typeahead.css';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
import { formatUserDate } from '../utils/formatDateUtil';
const autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy')

const sanitizeIsArray = (item, multiple) => {
  if (item === null) {
    return [];
  }
  
  if (!!multiple) {
    //array
    return item;
  } else {
    //obj
    let res = [];
    res.push(item);
    return res;
  }
}

const SwitchComponent = ({ item, values, handleChange, }) => {
  switch (item.type) {

    case 'checkbox':
    return (
        <input 
          type={item.type} 
          style={{marginLeft: '10px'}} 
          name={item.name}
          value={!!values[item.name]}
          checked={!!values[item.name]}
          onChange={e => {
            const target = { name: item.name, value: e.target.checked };
            const resp = { target , currentTarget: target }
            return handleChange(resp);
          } }
          disabled={item.disabled} 
        />
      )
    
    case 'radio': 
      return (
        !!item.options && item.options.map(opt => (
            <Fragment key={`frg-${opt.id}`}>
              <input
                key={`inp-${opt.id}`}
                style={{margin: '0 5px 0 20px'}} 
                type={item.type} 
                name={item.name} 
                value={opt.name} 
                checked={values[item.name] === opt.name}
                onChange={handleChange}
              />{opt.value}
            </Fragment>)
        )
      )
    
    case 'select':
      return (
        <select className="form-control" name={item.name} onChange={handleChange} disabled={item.disabled}>
          {!!item.options && item.options.map(opt => <option key={opt.id} value={opt.name}>{opt.value}</option>)}
        </select>
      );

    case 'autocomplete':
      return <AsyncTypeahead
        defaultSelected={ sanitizeIsArray(values[item.name], item.multiple) }
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

    case 'date':
      return <MaskedInput
        className="form-control"
        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        pipe={autoCorrectedDatePipe}
        name={item.name}
        placeholder="05/06/2003"
        value={formatUserDate(values[item.name])}
        onChange={handleChange}
        disabled={item.disabled} />

      case 'mobile':
        return <MaskedInput
        className="form-control"
        mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholder="(11) 91234-1234"
        name={item.name}
        value={values[item.name]}
        onChange={handleChange}
        disabled={item.disabled} />

      case 'phone':
        return <MaskedInput
        className="form-control"
        mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholder="(11) 1234-1234"
        name={item.name}
        value={values[item.name]}
        onChange={handleChange}
        disabled={item.disabled} />

      case 'postalcode':
        return <MaskedInput
        className="form-control"
        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
        placeholder="12345-000"
        name={item.name}
        value={values[item.name]}
        onChange={handleChange}
        disabled={item.disabled} />

      case 'textarea':
        return <textarea {...item}
          className="form-control"
          name={item.name}
          value={values[item.name] || ''}
          onChange={handleChange}
          disabled={item.disabled} />

    default:
      return (
        <input {...item}
          type={item.type}
          className="form-control"
          name={item.name}
          value={values[item.name] || ''}
          onChange={handleChange}
          disabled={item.disabled} />
      );
  }
}

export default class FieldsComponent extends PureComponent {

  render() {
    const { fields, values, handleChange } = this.props;
    
    return (
      <Fragment>
        {
          !!fields && fields.map((row, idx) => {
            return (
              <Row key={`row-${idx}`} md={12}>
                {
                  row.map((item, index) => {
                    if (item.type === 'separation') {
                      return (<Col key={`sep-${item.name}-${index}`} md={12}><hr></hr></Col>)
                    }
                    return (<Col key={`others-${item.name}`} md={(!!item.size && item.size.md) || 4}>
                        <FormGroup validationState={null}>
                          {(item.type !== 'table') && <ControlLabel>{item.label}</ControlLabel>}
                          <SwitchComponent  {...item} item={item} values={values} handleChange={handleChange} />
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
