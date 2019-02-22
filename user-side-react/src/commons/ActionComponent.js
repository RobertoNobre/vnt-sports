import React from 'react';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import {  Button } from 'react-bootstrap';

export default props => (
  <DataTypeProvider
    formatterComponent={fc => {
      const { children } = props;
      const childrenWithValue = React.Children.map(children, child => (
        React.cloneElement(child, { value: fc.row.id, row: fc.row })
      ));
      return childrenWithValue;
    }}
    for={!!props.for ? props.for : ['actions']}
    {...props}
  />
);

export const ActionButton = ({onClick, value, row, className, bsStyle, icon, name, ...props})  => (
  <Button 
    className={!!className ? className : 'btn-xs'} 
    bsStyle={!!bsStyle ? bsStyle : 'default'} 
    onClick={() => onClick(value, row)}
    style={{marginRight: '10px'}}
    {...props}
  >
    <span className={`glyphicon glyphicon-${icon}`} /> { name }
  </Button>
)