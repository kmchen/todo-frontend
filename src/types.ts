export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  important: boolean;
  createdAt?: number;
  lastEdit?: number;
};

export type TodoProperty = {
  important: boolean;
  completed: boolean;
};

export type Store = {
  todos: Todo[];
  fetchTodo: () => void;
  addTodo: (text: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (key: string) => (id: string) => void;
};
