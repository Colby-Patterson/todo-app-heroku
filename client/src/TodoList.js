import React from "react";
import axios from "axios"
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
    todos: [],
  };

  async componentDidMount(){
    try {
      let res = await axios.get('/api/todos')
      this.setState({
        todos:res.data
      })
    }catch(err) {
      alert("Error occurred")
      console.log(err)
    }
  }

  handleSubmit = async (e) => {
    let res = await axios.post('/api/todos', {name:this.state.name})
    let newTodos = [
      res.data,
      ...this.state.todos,
    ];
    this.setState({
      todos: newTodos,
      name: "",
    });
  };

  toggleTodo = async (id) => {
    let res = await axios.put(`/api/todos/${id}`)
    let newTodos = this.state.todos.map((t) => {
      return t.id !== id ? t : res.data
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
                style={{ textDecoration: t.complete ? "line-through" : "" }}
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