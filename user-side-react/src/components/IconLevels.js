import React, { PureComponent } from 'react';
import {
        Panel,
        Row,
        Col,
    } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default class IconLevels extends PureComponent {
    render(){
        return(
            <Row style={{backgroundColor: '#A3E1D4', height: '120px', paddingTop: '15px'}}>
                <Col sm={3} md={2} xs={4} className='box-part fi'>
                    <Col sm={4} className='icon'>
                    <FontAwesomeIcon icon="puzzle-piece" size='3x' />
                    </Col>
                    <Col sm={8}>
                    <p>Sport type</p>
                    <h3>Cycling</h3>
                    </Col>
                </Col>
                <Col sm={3} md={2} xs={4} className='box-part'>
                    <Col sm={4} className='icon'>
                    <FontAwesomeIcon icon="trophy" size='3x' />
                    </Col>
                    <Col sm={8}>
                    <p>Mode</p>
                    <h3>Advanced</h3>
                    </Col>
                </Col>
                <Col sm={3} md={3} xs={4} className='box-part'>
                    <Col sm={4} className='icon'>
                    <FontAwesomeIcon icon="map-signs" size='3x' />
                    </Col>
                    <Col sm={8}>
                    <p>Route</p>
                    <h3>30 miles</h3>
                    </Col>
                </Col>
            </Row>
        );
    }
}