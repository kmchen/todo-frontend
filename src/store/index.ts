import create from "zustand";
import { Todo, Store } from "../types";

export const useStore = create<Store>((set, get) => ({
  todos: [],
  fetchTodo: () => {
    fetch("/api/v1/task", {})
      .then((response) => response.json())
      .then((todos: Todo[]) => {
        set(() => ({ todos }));
      });
  },
  addTodo: (text: string) => {
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
          completed: false,
          important: false,
          createdAt: 1,
          lastEdit: 1,
        };
        set((state: Store) => ({ todos: [...state.todos, todo] }));
      });
  },
  deleteTodo: (id: string) => {
    let updatedTodos = get().todos.filter((todo) => todo.id !== id);
    fetch(`api/v1/task/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => set({ todos: updatedTodos }));
  },
  updateTodo: (key: string) => (id: string) => {
    const todoToUpdate: Todo = get()
      .todos.filter((todo) => todo.id === id)
      .shift() as Todo;
    fetch("/api/v1/task/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, [key]: !todoToUpdate[key as keyof Todo] }),
    })
      .then((response) => response.text())
      .then(() => {
        const updatedTodos = get().todos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              [key]: !todo[key as keyof Todo],
            };
          }
          return todo;
        });
        set({ todos: updatedTodos });
      });
  },
}));
