import { create } from "zustand";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
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
    set((state) => ({
      paginatedTodos: [...state.paginatedTodos, ...newTodos],
    }));
  },
  fetchAllTodos: async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
    const allTodos = await response.json();
    set({ todos: allTodos });
  },
  addTodo: (title: string) =>
    set((state) => {
      const newTodo = {
        userId: 1,
        id: state.todos.length + 1,
        title,
        completed: false,
      };
      return {
        todos: [newTodo, ...state.todos],
        paginatedTodos: [newTodo, ...state.paginatedTodos],
      };
    }),
  toggleTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
      paginatedTodos: state.paginatedTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  deleteTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
      paginatedTodos: state.paginatedTodos.filter((todo) => todo.id !== id),
    })),
}));
