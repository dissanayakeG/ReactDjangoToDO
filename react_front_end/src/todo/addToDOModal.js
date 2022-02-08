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
  buttonLabel,
  className,
  onChangeAddToDoHandler,
  title,
  completed,
  addToDo,
  addModalOpen,
  toggleAddModal,
}) => {
  return (
    <div className="mt-5 mb-5">
      <Button color="primary" onClick={toggleAddModal}>
        {buttonLabel}
      </Button>
      <Modal
        isOpen={addModalOpen}
        toggle={toggleAddModal}
        className={className}
      >
        <ModalHeader toggle={toggleAddModal}>Modal title</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={onChangeAddToDoHandler}
            />
          </FormGroup>

          <FormGroup>
            <Label for="completed">Completes</Label>
            <Input
              id="completed"
              name="completed"
              value={completed}
              onChange={onChangeAddToDoHandler}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={addToDo}>
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={toggleAddModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
