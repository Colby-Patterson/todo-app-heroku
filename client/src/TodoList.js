import React from "react";
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Input,
  List,
  Segment,
} from "semantic-ui-react";

export default class TodoList extends React.Component {
  state = {
    name: "",
    todos: [
      { id: 1, name: "work", completed: true },
      { id: 2, name: "sleep", completed: false },
    ],
  };

  handleSubmit = (e) => {
    let newTodos = [
      { name: this.state.name, complete: false, id: Math.random() },
      ...this.state.todos,
    ];
    this.setState({
      todos: newTodos,
      name: "",
    });
  };

  toggleTodo = (id) => {
    let newTodos = this.state.todos.map((t) => {
      return t.id !== id ? t : { ...t, completed: !t.completed };
    });
    console.log(newTodos);
    this.setState({ todos: newTodos });
  };

  render() {
    return (
      <Container>
        <Segment>
          <Header as="h1">TodoList</Header>
          <Form onSubmit={this.handleSubmit}>
            <Input
              label="Todo name:"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
            <Divider />
            <Button type="submit" color="blue">
              Add
            </Button>
          </Form>
          <Divider />
          <List>
            {this.state.todos.map((t) => (
              <List.Item
                style={{ textDecoration: t.completed ? "line-through" : "" }}
                onClick={() => this.toggleTodo(t.id)}
                key={t.id}
              >
                {t.name}
              </List.Item>
            ))}
          </List>
        </Segment>
      </Container>
    );
  }
}