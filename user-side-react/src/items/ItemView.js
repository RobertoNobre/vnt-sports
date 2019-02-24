import React, { PureComponent, Fragment } from 'react';
import {
  Panel,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import { 
  SearchState, 
  IntegratedFiltering,
  GroupingState,
  IntegratedGrouping } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  SearchPanel,
  Toolbar,
  VirtualTable,
  TableColumnResizing,
  TableGroupRow,
} from '@devexpress/dx-react-grid-bootstrap3';

import ActionComponent, { ActionButton } from '../commons/ActionComponent';
import ConfirmDelete, { handleModalDelete, handleModalClose } from '../commons/ConfirmDelete';
import styled from 'styled-components';
import PageTitle from '../components/PageTitle';

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
  hr{ margin-top: 40px; }
  .fi{ margin-left: 40px; padding-top: 30px }
} 
.addBtn{
  margin-top: 50px;
  float: right;
}
`;

export default class UserView extends PureComponent {

  AlbumsColumns = [
    { name: 'titlePhoto', title: "Photo" },
    { name: 'titleAlbum', title: "Album" },
    { name: 'actions', title: "#" },
  ];

  PostsColumns = [
    { name: 'title', title: "Title" },
    { name: 'text', title: "Text" },
    { name: 'actions', title: "#" },
  ];
  
  defaultColumnWidthsAlbums = [
    { columnName: 'titlePhoto', width: 120 },
    { columnName: 'titleAlbum', width: 120 },
    { columnName: 'actions', width: 120 },
  ];

  defaultColumnWidthsPosts = [
    { columnName: 'title', width: 120 },
    { columnName: 'text', width: 120 },
    { columnName: 'actions', width: 120 },
  ];

  render() {
    console.log(this.props)
    const { albums, posts } = this.props;
    return (
      <Fragment>
        <PanelStyles>
          <Panel>
            <Panel.Body>
              <PageTitle className='fi' title="Items Base" />
              <Row>
                <Col md={7}>
                <Row>
                  <Col md={6}>
                  <h2 className='fi'>Albums</h2>
                  </Col>
                  <Col md={6}>
                  <Button bsStyle="primary" className="addBtn" onClick={()=>console.log('go to New Photo')} style={{marginLeft: '10px'}}>
                    <span className="glyphicon glyphicon-plus"/> New Photo
                  </Button>
                  <Button bsStyle="primary" className="addBtn" onClick={()=>console.log('go to New Album')}>
                    <span className="glyphicon glyphicon-plus"/> New Album
                  </Button>
                  </Col>
                </Row>
                {
                  <Fragment>
                    <Grid
                      rows={albums}
                      columns={this.AlbumsColumns}>
                      <SearchState id='test' defaultValue="" />
                      <IntegratedFiltering />
                      <GroupingState
                        grouping={[{ columnName: 'titleAlbum' }]}
                      />
                      <VirtualTable />
                      <IntegratedGrouping />
                      <Table />
                      <VirtualTable />
                      <TableColumnResizing defaultColumnWidths={this.defaultColumnWidthsAlbums} />
                      <TableHeaderRow />
                      <TableGroupRow />
                      <Toolbar />
                      <SearchPanel />
                    </Grid>
                  </Fragment>
                }
                </Col>
                <Col md={5}>
                  <Row>
                    <Col md={6}>
                    <h2 className='fi'>Posts</h2>
                    </Col>
                    <Col md={6}>
                    <Button bsStyle="primary" className="addBtn" onClick={()=>console.log('go to New Post')} style={{marginLeft: '10px'}}>
                      <span className="glyphicon glyphicon-plus"/> New Post
                    </Button>
                    </Col>
                  </Row>
                  {
                    <Fragment>
                      <Grid
                        rows={posts}
                        columns={this.PostsColumns}>
                        <SearchState id='test' defaultValue="" />
                        <IntegratedFiltering />
                        <VirtualTable />
                        <Table />
                        <VirtualTable />
                        <TableColumnResizing defaultColumnWidths={this.defaultColumnWidthsPosts} />
                        <TableHeaderRow />
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

      </Fragment>
    );
  }
}
