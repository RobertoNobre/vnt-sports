import React, { PureComponent } from 'react';
import {
        Row,
        Col,
    } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default class IconLevels extends PureComponent {
    render(){
        return(
            <Row style={{height: '120px', paddingTop: '15px'}}>
                <Col sm={12} md={4} xs={4} className='box-part'>
                    <h3>Need help?</h3>
                    <Col sm={4} md={3} className='icon'>
                        <FontAwesomeIcon icon={['far', 'life-ring']} size='4x' />
                    </Col>
                    <Col sm={8} md={9}>
                        <p>Lorem ipsum dolor sit amet, 
                            consectetur adipisicing elit, 
                            sed do eiusmod tempor incididunt ut 
                            labore et dolore magna aliqua.
                        </p>
                    </Col>
                </Col>
                <Col sm={12} md={4} xs={4} className='box-part'>
                    <h3>Why Register?</h3>
                    <Col sm={4} md={3} className='icon'>
                    <FontAwesomeIcon icon="heartbeat" size='4x' />
                    </Col>
                    <Col sm={8} md={9}>
                        <p>Lorem ipsum dolor sit amet, 
                            consectetur adipisicing elit, 
                            sed do eiusmod tempor incididunt ut 
                            labore et dolore magna aliqua.
                        </p>
                    </Col>
                </Col>
                <Col sm={12} md={4} xs={4} className='box-part'>
                    <h3>What people are saying...</h3>
                    <Col sm={4} md={3} className='icon'>
                    <FontAwesomeIcon icon={['far', 'smile']} size='4x' />
                    </Col>
                    <Col sm={8} md={9}>
                        <p>Lorem ipsum dolor sit amet, 
                            consectetur adipisicing elit, 
                            sed do eiusmod tempor incididunt ut 
                            labore et dolore magna aliqua.
                        </p>
                    </Col>
                </Col>
            </Row>
        );
    }
}