import React, { PureComponent, Fragment } from 'react';
import {
  Panel,
  Row,
  Col,
} from 'react-bootstrap';
import { PagingState, CustomPaging, SearchState, IntegratedFiltering } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  SearchPanel,
  Toolbar,
  VirtualTable,
  TableColumnResizing
} from '@devexpress/dx-react-grid-bootstrap3';

import ActionComponent, { ActionButton } from '../commons/ActionComponent';
import { pageSizes } from '../utils/ConstatnsUtil';
import ConfirmDelete, { handleModalDelete, handleModalClose } from '../commons/ConfirmDelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import PageTitle from './../components/PageTitle';
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

button.hide-hover {
  display: none;
}

tr:hover button.hide-hover {
  display: inline-block;
}

.panel-default {
  height: 400px;
}

@media (min-width:768px) {

  .icon {
    text-align: end;
   }

  .box-part {
    padding-top: 15px;
  }

  .fi{
    margin-left: 40px;
  }

  hr{
    margin-top: 40px;
  }

  .addBtn{
    margin-top: 25px;
    margin-left: 50px;
  }

  .row{
    margin-left: 0px;
    margin-right: 0px;
  }
}
`;

const TableComponent = ({ ...restProps }) => (
  <Table.Table
    {...restProps}
    className="table-striped"
  />
);

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
    { name: 'actions', title: "#" },
  ];
  
  defaultColumnWidths = [
    { columnName: 'username', width: 130 },
    { columnName: 'name', width: 130 },
    { columnName: 'email', width: 130 },
    { columnName: 'city', width: 130 },
    { columnName: 'rideInGroup', width: 130 },
    { columnName: 'dayWeek', width: 130 },
    { columnName: 'posts', width: 130 },
    { columnName: 'albums', width: 130 },
    { columnName: 'photos', width: 130 },
    { columnName: 'actions', width: 130 },
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
    rows.push({name:'roberto', username: 'roberto'},{name:'roberto', username: 'roberto'},{name:'roberto', username: 'roberto'},)
    return (
      <Fragment>
        <PanelStyles>
        <Panel>
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
          <Panel.Body>
            <Row>
              <Col md={1} className='fi'><h1>Users</h1><Loading loading={this.props.loading} /></Col> 
              <Col md={10}>
                <hr style={{backgroundSize: '4px', borderTop: '4px solid #C7C7C7', borderColor: '#C7C7C7'}} />
              </Col>{/*
              <Col className="text-right" md={3} sm={4}>
                <Button bsStyle="primary btn-block" className="addBtn" onClick={this.onCreate}>
                  <span className="glyphicon glyphicon-plus"/> Adicionar
                </Button>
              </Col>*/}
            </Row>
            <Row>
              <Col md={12} className=''>
              { rows && rows.length>0 &&
                <Fragment>
                  <Grid
                    rows={rows}
                    columns={this.columns}>
                    <SearchState defaultValue="" />
                    <IntegratedFiltering />
                    <ActionComponent>
                      <ActionButton className="hide-hover btn-sm" onClick={this.onEdit} icon='edit' bsStyle="warning" />
                      <ActionButton className="hide-hover btn-sm" onClick={this.onDelete} icon='trash' bsStyle="danger" />
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
                    <Table tableComponent={TableComponent}/>
                    <VirtualTable />
                    <TableColumnResizing defaultColumnWidths={this.defaultColumnWidths} />
                    <TableHeaderRow />
                    <PagingPanel pageSizes={pageSizes} />
                    <Toolbar />
                    <SearchPanel />
                  </Grid>
                </Fragment>
              }
              </Col>
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
