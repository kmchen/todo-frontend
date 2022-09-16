import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Form, Task } from "./components";
import style from "styled-components";

type Todo = {
  id: string;
  text: string;
  completed?: boolean;
  important?: boolean;
  createdAt?: number;
  deleted?: boolean;
  lastEdit?: number;
};

const TodoAppContainer = style.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  min-height: 600px;
  background: white;
  text-align: center;
  margin: 5px auto;
  border-radius: 1rem;
  padding-bottom: 2rem;
`;

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("/api/v1/task", {})
      .then((response) => response.json())
      .then((taskList: Todo[]) => {
        setTodos(taskList);
      });
  }, []);

  const addTodo = (text: string) => {
    fetch("/api/v1/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })
      .then((response) => response.text())
      .then((id: string) => {
        let todo = {
          id,
          text,
          deleted: false,
          completed: false,
          important: false,
        };
        const newTodos = [todo, ...todos];
        setTodos(newTodos);
      });
  };

  const removeTodo = (id: string) => {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    fetch(`api/v1/task/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => setTodos(updatedTodos));
  };

  const markImportantTodo = (id: string) => {
    let important;
    let completed;
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.important = !todo.important;
        completed = todo.completed;
      }
      return todo;
    });
    fetch("/api/v1/task/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, important, completed }),
    })
      .then((response) => response.text())
      .then(() => {
        setTodos(updatedTodos);
      });
  };
  const completeTodo = (id: string) => {
    let important;
    let completed;
    let updatedTodos = todos.map((todo, update: any) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        important = todo.important;
      }
      return todo;
    });
    fetch("/api/v1/task/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, important, completed }),
    })
      .then((response) => response.text())
      .then(() => {
        setTodos(updatedTodos);
      });
  };

  return (
    <TodoAppContainer>
      <h1>Todo List</h1>
      <Form addTodo={addTodo} />
      {todos.map((todo) => (
        <Task
          removeTodo={removeTodo}
          markImportantTodo={markImportantTodo}
          completeTodo={completeTodo}
          todo={todo}
          key={todo.id}
        />
      ))}
    </TodoAppContainer>
  );
}
export default App;
