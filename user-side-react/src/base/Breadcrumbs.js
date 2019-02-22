import React, { PureComponent, Fragment } from 'react';

import { Grid, Button, Breadcrumb } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Index extends PureComponent {
  render() {
     const url = this.props.history.location.pathname.split('/').splice(1);
    return (
        <Breadcrumb>
          <Breadcrumb.Item 
            style={{fontSize: '18px', marginLeft: '20px', color: '#18A689'}}
            href=''>
            <FontAwesomeIcon icon="home"/>
          </Breadcrumb.Item>
        { url.map( (item, index) => {
              if(!parseInt(item) > 0){
                if( (url.length -1) !== index ){
                  return <Breadcrumb.Item 
                            style={{fontSize: '18px', color: '#18A689'}}
                            href={`${window.location.origin}/${item}`}>
                            {item}
                          </Breadcrumb.Item>
                }else{
                  return <Breadcrumb.Item 
                            style={{fontSize: '18px'}}
                            active>
                            {item}
                          </Breadcrumb.Item>
                }
              }
            }  ) }
      </Breadcrumb>
    );
  }
}

export default Index;

