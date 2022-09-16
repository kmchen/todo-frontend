import React from "react";
import style from "styled-components";
import { RiCloseCircleLine } from "react-icons/ri";
import { BiCheckCircle } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";

type TodoTask = {
  id: string;
  index?: number;
  text: string;
  completed?: boolean;
  important?: boolean;
  createdAt?: number;
  deleted?: boolean;
  lastEdit?: number;
};

type TaskProps = {
  todo: TodoTask;
  removeTodo: (id: string) => void;
  completeTodo: (id: string) => void;
  markImportantTodo: (id: string) => void;
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
    ${(props: any) =>
      props.important ? "rgb(255,127,80)" : "rgba(20, 159, 255, 1)"} 0%,
    ${(props: any) =>
      props.important ? "rgb(255,127,80)" : "rgba(17, 122, 255, 1)"} 100%
  );
  padding: 1rem;
  border-radius: 0.25rem;
  width: 90%;
  text-decoration: ${(props: any) => (props.completed ? "line-through" : "")};
`;

export function Task({
  todo,
  markImportantTodo,
  completeTodo,
  removeTodo,
}: TaskProps) {
  return (
    <TaskContainer completed={todo.completed} important={todo.important}>
      {todo.text}
      <IconWrapper>
        <FaRegStar onClick={() => markImportantTodo(todo.id)} />
        <RiCloseCircleLine
          style={{ marginRight: 5, marginLeft: 5 }}
          onClick={() => removeTodo(todo.id)}
        />
        <BiCheckCircle onClick={() => completeTodo(todo.id)} />
      </IconWrapper>
    </TaskContainer>
  );
}
