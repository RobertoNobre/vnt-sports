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
import ReactDOM from 'react-dom';
import PageTitle from './../components/PageTitle';
import Message from '../commons/Message';
import IconLevels from '../components/IconLevels';

const PanelStyles = styled.div`
.panel-default { border: none; }

.icon { color: #1AB394; }

p { margin: 0 0 0px; }

h3 { margin-top: 0px; font-weight: bold; }

button.hide-hover { display: none; }

tr:hover button.hide-hover { display: inline-block; }

.panel-default { height: 400px; }

tr:nth-child(even) { background-color: #f2f2f2 }

th { background-color: white; }

@media (min-width:768px) {
  .icon { text-align: end; }
  .box-part { padding-top: 15px; }
  .fi{ margin-left: 40px; }
  .addBtn{ margin-top: 25px; margin-left: 50px; }
  .row{ margin-left: 0px; margin-right: 0px; }
  hr{ margin-top: 40px; }
} `;

export default class UserView extends PureComponent {
  
  columns = [
    { name: 'username', title: "Username" },
    { name: 'name', title: "Name" },
    { name: 'email', title: "E-mail" },
    { name: 'city', title: "City" },
    { name: 'ride_group', title: "Ride in group" },
    { name: 'days_week', title: "Day of the week" },
    { name: 'posts', title: "Posts" },
    { name: 'albums', title: "Albums" },
    { name: 'photos', title: "Photos" },
    { name: 'actions', title: "#" },
  ];
  
  defaultColumnWidths = [
    { columnName: 'username', width: 120 },
    { columnName: 'name', width: 120 },
    { columnName: 'email', width: 120 },
    { columnName: 'city', width: 120 },
    { columnName: 'ride_group', width: 120 },
    { columnName: 'days_week', width: 120 },
    { columnName: 'posts', width: 120 },
    { columnName: 'albums', width: 120 },
    { columnName: 'photos', width: 120 },
    { columnName: 'actions', width: 120 },
  ];

  onCreate = () => (this.props.history.push('/users/new'));
  onEdit = (id) => (this.props.history.push(`/users/${id}/edit`));
  onDelete = (id) => (this.props.onAdd('row', { id }));

  onCurrentPageChange = (page) => {
    this.props.onSearch( page, this.props.pageable.itemsCountPerPage, '' );
  }

  onChangePageSize = (pageSize) => {
    this.props.onSearch( 0, pageSize, '' );
  }


  render() {
    const { rows, pageable } = this.props;
    console.log(this.props)
    return (
      <Fragment>
        <PanelStyles>
          <Panel>
            <IconLevels />
            <Panel.Body>
              <PageTitle title="Users" />
              <Message messages={this.props.messages} failures={this.props.failures} />

              <Row>
                { rows && rows.length>0 &&
                  <Fragment>
                    <Grid
                      rows={rows}
                      columns={this.columns}>
                      <SearchState defaultValue="" />
                      <IntegratedFiltering />
                      <ActionComponent>
                        {/*<ActionButton className="hide-hover btn-sm" onClick={this.onEdit} icon='edit' bsStyle="warning" />*/}
                        <ActionButton className="hide-hover btn-sm" onClick={this.onDelete} icon='trash' bsStyle="danger" />
                      </ActionComponent>
                      <PagingState
                        currentPage={pageable.activePage}
                        onCurrentPageChange={this.onCurrentPageChange}
                        pageSize={pageable.itemsCountPerPage}
                        onPageSizeChange={this.onChangePageSize}
                      />
                      <VirtualTable />
                      <CustomPaging
                        totalCount={pageable.totalItemsCount}
                      />
                      <Table />
                      <VirtualTable />
                      <TableColumnResizing defaultColumnWidths={this.defaultColumnWidths} />
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
