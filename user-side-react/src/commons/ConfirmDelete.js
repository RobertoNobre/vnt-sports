import React, { PureComponent } from 'react'
import { Modal, Button } from 'react-bootstrap';

export const handleModalDelete = (onDelete, onReset, onSearch) => async (objName, rowId) => {
  await onDelete(rowId);
  handleModalClose(onReset, onSearch)(objName, true, 0);
}

export const handleModalClose = (onReset, onSearch) => (objName, deleted, activePage) => {
  onReset(objName);
  if (!!deleted) {
    onSearch(activePage);
  }
}
export default class ConfirmDelete extends PureComponent {
  render() {
    return (
      !!this.props.show &&
      <Modal show={!!this.props.show} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Excluir</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            { `O registro selecionado será excluído, você confirma?` }
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="danger" onClick={this.props.onDelete}>Excluir</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
