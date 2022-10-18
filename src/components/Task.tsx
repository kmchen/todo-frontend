import React from "react";
import style from "styled-components";
import { RiCloseCircleLine } from "react-icons/ri";
import { BiCheckCircle } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import { useStore } from "../store";
import { Todo, TodoProperty } from "../types";

type TaskProps = {
  todo: Todo;
};

const IconWrapper = style.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
`;

const TaskContainer = style.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.25rem auto;
  color: white;
  background: linear-gradient(
    90deg,
    ${({ important }: TodoProperty) =>
      important ? "rgb(255,127,80)" : "rgba(20, 159, 255, 1)"} 0%,
    ${({ important }: TodoProperty) =>
      important ? "rgb(255,127,80)" : "rgba(17, 122, 255, 1)"} 100%
  );
  padding: 1rem;
  border-radius: 0.25rem;
  width: 90%;
  text-decoration: ${({ completed }: TodoProperty) =>
    completed ? "line-through" : ""};
`;

export function Task({ todo }: TaskProps) {
  const { deleteTodo, updateTodo } = useStore((state) => state);
  return (
    <TaskContainer completed={todo.completed} important={todo.important}>
      {todo.text}
      <IconWrapper>
        <FaRegStar onClick={() => updateTodo("important")(todo.id)} />
        <RiCloseCircleLine
          style={{ marginRight: 5, marginLeft: 5 }}
          onClick={() => deleteTodo(todo.id)}
        />
        <BiCheckCircle onClick={() => updateTodo("completed")(todo.id)} />
      </IconWrapper>
    </TaskContainer>
  );
}
