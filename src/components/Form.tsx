import React, { useState } from "react";
import style from "styled-components";
import { useStore } from "../store";

const TodoListForm = style.form`
    display: flex;
    justify-content: center;
`;
const TodoInput = style.input`
    padding: 1rem 2rem 1rem 1rem;
    border-radius: 0.5rem;
    border: 2px solid rgb(211,211,211);
    outline: none;
    width: 50%;
    height: 50%;
    margin: 1rem;
`;
const AddTodoButton = style.button`
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    outline: none;
    text-transform: capitalize;
    margin: 1rem;
    background-color: rgb(211,211,211)
`;

export function Form() {
  const { addTodo } = useStore((state) => state);
  const [input, setInput] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (input.length > 0) {
      addTodo(input);
      setInput("");
    }
  };

  return (
    <TodoListForm onSubmit={handleSubmit}>
      <TodoInput
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const target = e.target as HTMLInputElement;
          setInput(target.value);
        }}
        placeholder="Add a todo"
      />
      <AddTodoButton type="submit">Add Todo</AddTodoButton>
    </TodoListForm>
  );
}
