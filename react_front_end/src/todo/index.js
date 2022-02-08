import axios from "axios";
import React, { Component } from "react";
import AddToDO from "./addToDOModal";
import EditToDo from "./editToDOModal";
import { Table, Button } from "reactstrap";

export default class ToDos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addModalOpen: false,
      editModalOpen: false,
      AddToDoButtonLabel: "Add Todo",
      EditToDoButtonLabel: "Edit Todo",
      todos: [],

      newTodo: {
        title: "",
        completed: false,
      },
      editToDoId: null,

      editTodo: {
        title: "",
        completed: false,
      },
    };
  }

  componentDidMount() {
    this.getTodos();
  }

  getTodos = async () => {
    await axios
      .get("http://localhost:8000/todo/task-list/")
      .then((response) => {
        if (response.data) {
          this.setState({ todos: response.data });
        }
      });
  };

  toggleAddModal = () => {
    this.setState({ addModalOpen: !this.state.addModalOpen });
  };

  toggleEditModal = () => {
    alert();
    this.setState({ editModalOpen: !this.state.editModalOpen });
  };

  onChangeAddToDoHandler = (e) => {
    const { newTodo } = this.state;
    newTodo[e.target.name] = e.target.value;
    this.setState({ newTodo });
  };

  onChangeEditToDoHandler = (e) => {
    console.log(e.target.value, e.target.name);
    const { editTodo } = this.state;
    editTodo[e.target.name] = e.target.value;
    this.setState({ editTodo });
  };

  addToDo = () => {
    console.log(this.state.newTodo);
    axios
      .post("http://localhost:8000/todo/task-create/", this.state.newTodo)
      .then((response) => {
        this.setState({ addModalOpen: !this.state.addModalOpen });
        this.getTodos();
      });
  };

  editTodo = (todo) => {
    console.log(todo);
    this.setState({ editToDoId: todo.id });
    this.setState({ editTodo: todo });
    this.setState({ editModalOpen: !this.state.editModalOpen });
  };

  updateRecord = () => {
    axios
      .post(
        "http://localhost:8000/todo/task-update/" + this.state.editToDoId + "/",
        this.state.editTodo
      )
      .then((response) => {
        this.setState({ editModalOpen: !this.state.editModalOpen });
        this.getTodos();
      });
  };

  deleteTodo = (id) => {
    axios
      .delete("http://localhost:8000/todo/task-delete/" + id + "/")
      .then((response) => {
        this.getTodos();
      });
  };

  render() {
    const {
      addModalOpen,
      editModalOpen,
      AddToDoButtonLabel,
      EditToDoButtonLabel,
      todos,
      editTodo,
    } = this.state;

    let allTodos = [];

    if (todos.length) {
      allTodos = todos.map((todo) => {
        return (
          <tr>
            <td>{todo.title}</td>
            <td>{todo.completed ? "Completed" : "InProgress"}</td>
            <td>
              <Button
                color="warning"
                className="mr-3"
                size="sm"
                onClick={() => this.editTodo(todo)}
              >
                Edit
              </Button>
            </td>
            <td>
              <Button
                color="danger"
                className="mr-3"
                size="sm"
                onClick={() => this.deleteTodo(todo.id)}
              >
                Edit
              </Button>
            </td>
          </tr>
        );
      });
    }

    return (
      <div>
        <AddToDO
          addModalOpen={addModalOpen}
          toggleAddModal={this.toggleAddModal}
          buttonLabel={AddToDoButtonLabel}
          onChangeAddToDoHandler={this.onChangeAddToDoHandler}
          addToDo={this.addToDo}
        />
        <EditToDo
          buttonLabel={EditToDoButtonLabel}
          editModalOpen={editModalOpen}
          toggleEditModal={this.toggleEditModal}
          updateRecord={this.updateRecord}
          editTodo={editTodo}
          onChangeEditToDoHandler={this.onChangeEditToDoHandler}
        />

        <Table>
          <thead>
            <th>Title</th>
            <th>Completed</th>
            <th>Edit</th>
            <th>Delete</th>
          </thead>

          {todos.length === 0 ? (
            <tbody>
              <h3>noDataFound</h3>
            </tbody>
          ) : (
            <tbody>{allTodos}</tbody>
          )}
        </Table>
      </div>
    );
  }
}
