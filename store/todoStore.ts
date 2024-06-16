import { create } from "zustand";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

interface TodoState {
  todos: Todo[];
  paginatedTodos: Todo[];
  fetchTodos: (page: number) => Promise<void>;
  fetchAllTodos: () => Promise<void>;
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  paginatedTodos: [],
  fetchTodos: async (page: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=20`
    );
    const newTodos = await response.json();
    const todosWithTimestamps = newTodos.map((todo: Todo) => ({
      ...todo,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
    set((state) => ({
      paginatedTodos: [...state.paginatedTodos, ...todosWithTimestamps],
    }));
  },
  fetchAllTodos: async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
    const allTodos = await response.json();
    const todosWithTimestamps = allTodos.map((todo: Todo) => ({
      ...todo,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
    set({ todos: todosWithTimestamps });
  },
  addTodo: (title: string) =>
    set((state) => {
      const now = new Date().toISOString();
      const newTodo: Todo = {
        userId: 1,
        id: state.todos.length + 1,
        title,
        completed: false,
        created_at: now,
        updated_at: now,
      };
      return {
        todos: [newTodo, ...state.todos],
        paginatedTodos: [newTodo, ...state.paginatedTodos],
      };
    }),
  toggleTodo: (id: number) =>
    set((state) => {
      const now = new Date().toISOString();
      return {
        todos: state.todos.map((todo) =>
          todo.id === id
            ? { ...todo, completed: !todo.completed, updated_at: now }
            : todo
        ),
        paginatedTodos: state.paginatedTodos.map((todo) =>
          todo.id === id
            ? { ...todo, completed: !todo.completed, updated_at: now }
            : todo
        ),
      };
    }),
  deleteTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
      paginatedTodos: state.paginatedTodos.filter((todo) => todo.id !== id),
    })),
}));
