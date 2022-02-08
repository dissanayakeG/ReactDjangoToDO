import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
  Input,
} from "reactstrap";

const ModalExample = ({
  className,
  editModalOpen,
  toggleEditModal,
  editTodo,
  onChangeEditToDoHandler,
  updateRecord,
}) => {
  return (
    <div>
      <Modal
        isOpen={editModalOpen}
        toggle={toggleEditModal}
        className={className}
      >
        <ModalHeader toggle={toggleEditModal}>Modal title</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={editTodo.title}
              onChange={onChangeEditToDoHandler}
            />
          </FormGroup>

          <FormGroup>
            <Label for="completed">Completes</Label>
            <Input
              id="completed"
              name="completed"
              value={editTodo.completed}
              onChange={onChangeEditToDoHandler}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={updateRecord}>
            Update
          </Button>{" "}
          <Button color="secondary" onClick={toggleEditModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
