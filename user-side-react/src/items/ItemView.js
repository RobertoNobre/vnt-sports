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
  ];

  PostsColumns = [
    { name: 'title', title: "Title" },
    { name: 'text', title: "Text" },
  ];
  
  defaultColumnWidthsAlbums = [
    { columnName: 'titlePhoto', width: 300 },
    { columnName: 'titleAlbum', width: 300 },
  ];

  defaultColumnWidthsPosts = [
    { columnName: 'title', width: 300 },
    { columnName: 'text', width: 300 },
  ];

  render() {
    const albums = [
      { titlePhoto: 'Foto 1', titleAlbum: 'Album 1'  },
      { titlePhoto: 'Foto 2', titleAlbum: 'Album 1'  },
      { titlePhoto: 'Foto 3', titleAlbum: 'Album 1'  },
      { titlePhoto: 'Foto 4', titleAlbum: 'Album 1'  },
      { titlePhoto: 'Foto 5', titleAlbum: 'Album 1'  },
      { titlePhoto: 'Foto 6', titleAlbum: 'Album 1'  },
      { titlePhoto: 'Foto 1', titleAlbum: 'Album 2'  },
      { titlePhoto: 'Foto 2', titleAlbum: 'Album 2'  },
      { titlePhoto: 'Foto 3', titleAlbum: 'Album 2'  },
      { titlePhoto: 'Foto 4', titleAlbum: 'Album 2'  },
      { titlePhoto: 'Foto 5', titleAlbum: 'Album 2'  },
      { titlePhoto: 'Foto 6', titleAlbum: 'Album 2'  },
      { titlePhoto: 'Foto 1', titleAlbum: 'Album 3'  },
      { titlePhoto: 'Foto 2', titleAlbum: 'Album 3'  },
      { titlePhoto: 'Foto 3', titleAlbum: 'Album 3'  },
      { titlePhoto: 'Foto 4', titleAlbum: 'Album 3'  },
      { titlePhoto: 'Foto 5', titleAlbum: 'Album 3'  },
      { titlePhoto: 'Foto 6', titleAlbum: 'Album 3'  },
    ]    
    
    const posts = [
      { title: 'Post 1', text: 'Post Text with a unnormal content 1'  },
      { title: 'Post 2', text: 'Post Text with a unnormal content 2'  },
      { title: 'Post 3', text: 'Post Text with a unnormal content 3'  },
      { title: 'Post 4', text: 'Post Text with a unnormal content 4'  },
      { title: 'Post 5', text: 'Post Text with a unnormal content 5'  },
      { title: 'Post 6', text: 'Post Text with a unnormal content 6'  },
      { title: 'Post 7', text: 'Post Text with a unnormal content 7'  },
      { title: 'Post 8', text: 'Post Text with a unnormal content 8'  },
      { title: 'Post 9', text: 'Post Text with a unnormal content 9'  },
      { title: 'Post 10', text: 'Post Text with a unnormal content 10'  },
      { title: 'Post 11', text: 'Post Text with a unnormal content 11'  },
      { title: 'Post 12', text: 'Post Text with a unnormal content 12'  },
      { title: 'Post 13', text: 'Post Text with a unnormal content 13'  },
      { title: 'Post 14', text: 'Post Text with a unnormal content 14'  },
      { title: 'Post 15', text: 'Post Text with a unnormal content 15'  },
      { title: 'Post 16', text: 'Post Text with a unnormal content 16'  },
      { title: 'Post 17', text: 'Post Text with a unnormal content 17'  },
      { title: 'Post 18', text: 'Post Text with a unnormal content 18'  },
    ] 
    
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
