import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Form, Task } from "./components";
import style from "styled-components";
import { useStore } from "./store";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  important: boolean;
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
  const { todos, fetchTodo } = useStore((state) => state);

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <TodoAppContainer>
      <h1>Todo List</h1>
      <Form />
      {todos.map((todo) => (
        <Task todo={todo} key={todo.id} />
      ))}
    </TodoAppContainer>
  );
}
export default App;
