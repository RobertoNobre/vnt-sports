import React, { PureComponent, Fragment } from 'react';
import {
  Panel,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import { PagingState, CustomPaging, FilteringState, IntegratedFiltering } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
} from '@devexpress/dx-react-grid-bootstrap3';

import ActionComponent, { ActionButton } from '../commons/ActionComponent';
import { pageSizes } from '../utils/ConstatnsUtil';
import ConfirmDelete, { handleModalDelete, handleModalClose } from '../commons/ConfirmDelete';
import Message from '../commons/Message';
import Loading from '../commons/Loading';

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
        <Panel>
          <Panel.Heading>
            <h3 style={{marginTop: '0px'}}>Users</h3>
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
                    <ActionComponent>
                      <ActionButton onClick={this.onEdit} icon='edit' bsStyle="warning" name="Editar" />
                      <ActionButton onClick={this.onDelete} icon='trash' bsStyle="danger" name="Excluir" />
                    </ActionComponent>
                    <FilteringState defaultFilters={[]} />
                    <IntegratedFiltering />
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
                    <TableFilterRow />
                    <PagingPanel pageSizes={pageSizes} />
                  </Grid>
                </Fragment>
              }
            </Row>
          </Panel.Body>
        </Panel>
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
