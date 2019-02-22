import React, { PureComponent, Fragment } from 'react';
import {
  Panel,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import { PagingState, CustomPaging, SearchState, IntegratedFiltering } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  SearchPanel,
  Toolbar
} from '@devexpress/dx-react-grid-bootstrap3';

import ActionComponent, { ActionButton } from '../commons/ActionComponent';
import { pageSizes } from '../utils/ConstatnsUtil';
import ConfirmDelete, { handleModalDelete, handleModalClose } from '../commons/ConfirmDelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import Message from '../commons/Message';
import Loading from '../commons/Loading';

const PanelStyles = styled.div`
.panel-default {
  border: none;
}

.icon {
  color: #1AB394;
}

p {
  margin: 0 0 0px;
}

h3 {
  margin-top: 0px; 
  font-weight: bold;
}

@media (min-width:768px) {

  .icon {
    text-align: end;
   }

  .box-part {
    padding-top: 15px;
  }
}
`;

export default class UserView extends PureComponent {
  columns = [
    { name: 'username', title: "Username" },
    { name: 'name', title: "Name" },
    { name: 'email', title: "E-mail" },
    { name: 'city', title: "City" },
    { name: 'rideInGroup', title: "Ride in group" },
    { name: 'dayWeek', title: "Day of the week" },
    { name: 'posts', title: "Posts" },
    { name: 'albums', title: "Albums" },
    { name: 'photos', title: "Photos" },
    { name: 'actions', title: "Actions" },
  ];

  onCreate = () => (this.props.history.push('/users/new'));
  onEdit = (id) => (this.props.history.push(`/users/${id}/edit`));
  onDelete = (id) => (this.props.onAdd('row', { id }));

  onCurrentPageChange = (page) => {
    this.props.onSearch(
      page,
      this.props.pageable.itemsCountPerPage,
      ''
    );
  }

  onChangePageSize = (pageSize) => {
    this.props.onSearch(
      0,
      pageSize,
      ''
    );
  }

  render() {
    const { rows, pageable } = this.props;
    return (
      <Fragment>
        <PanelStyles>
        <Panel>
          <Row style={{backgroundColor: '#A3E1D4', height: '120px', paddingTop: '15px'}}>
            <Col sm={3} md={2} xs={4} className='box-part'>
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
            <Col sm={3} md={2} xs={4} className='box-part'>
              <Col sm={4} className='icon'>
                <FontAwesomeIcon icon="map-signs" size='3x' />
              </Col>
              <Col sm={8}>
                <p>Route</p>
                <h3>30 miles</h3>
              </Col>
            </Col>
          </Row>
          <Panel.Heading>
            <h3>Users</h3>
            <Loading loading={this.props.loading} />
          </Panel.Heading>
          <Panel.Body>
            <Row>
              <Col className="text-right" md={12} style={{margin: '-55px 0 15px 0'}}>
                <Button bsStyle="primary" onClick={this.onCreate}>
                  <span className="glyphicon glyphicon-plus"/> Adicionar
                </Button>
              </Col>

              { rows && rows.length>0 &&
                <Fragment>
                  <Grid
                    style={{margin: '0 -1px -15px -1px'}}
                    rows={rows}
                    columns={this.columns}>
                    <SearchState defaultValue="Paris" />
                    <IntegratedFiltering />
                    <ActionComponent>
                      <ActionButton onClick={this.onEdit} icon='edit' bsStyle="warning" name="Editar" />
                      <ActionButton onClick={this.onDelete} icon='trash' bsStyle="danger" name="Excluir" />
                    </ActionComponent>
                    <PagingState
                      currentPage={pageable.activePage}
                      onCurrentPageChange={this.onCurrentPageChange}
                      pageSize={pageable.itemsCountPerPage}
                      onPageSizeChange={this.onChangePageSize}
                    />
                    <CustomPaging
                      totalCount={pageable.totalItemsCount}
                    />
                    <Table />
                    <TableHeaderRow />
                    <PagingPanel pageSizes={pageSizes} />
                    <Toolbar />
                    <SearchPanel />
                  </Grid>
                </Fragment>
              }
            </Row>
          </Panel.Body>
        </Panel>
        </PanelStyles>
        <Message messages={this.props.messages} failures={this.props.failures} />
        <ConfirmDelete
          show={!!this.props.row.id}
          onDelete={() =>
            handleModalDelete(this.props.onDelete, this.props.onReset, this.onChangePageSize)('row', this.props.row.id, this.props.pageable.activePage)}
          onClose={() =>
            handleModalClose(this.props.onReset, this.onChangePageSize)('row', false, 0)}
        />
      </Fragment>
    );
  }
}
