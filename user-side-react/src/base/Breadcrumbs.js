import React, { PureComponent } from 'react';

import { Breadcrumb } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Index extends PureComponent {
  render() {
     const url = this.props.history.location.pathname.split('/').splice(1);
    return (
        <Breadcrumb style={{marginBottom: '0px'}}>
          <Breadcrumb.Item 
            style={{fontSize: '18px', marginLeft: '50px', color: '#18A689'}}
            href=''>
            <FontAwesomeIcon icon="home"/>
          </Breadcrumb.Item>
        { url.map( (item, index) => {
              return !parseInt(item) > 0 ?
                url.length -1 !== index ?
                  <Breadcrumb.Item 
                            key={index}
                            style={{fontSize: '18px', color: '#18A689', textTransform: 'capitalize'}}
                            href={`${window.location.origin}/${item}`}>
                            {item}
                          </Breadcrumb.Item>
                :
                  <Breadcrumb.Item 
                            key={index}
                            style={{fontSize: '18px', textTransform: 'capitalize'}}
                            active>
                            {item}
                          </Breadcrumb.Item>
              : ''
            }  ) }
      </Breadcrumb>
    );
  }
}

export default Index;

