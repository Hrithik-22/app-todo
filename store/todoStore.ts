import {create} from 'zustand';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  fetchTodos: async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await response.json();
    set({ todos });
  },
  addTodo: (title: string) => set((state) => {
    const newTodo = { userId: 1, id: state.todos.length + 1, title, completed: false };
    return { todos: [newTodo, ...state.todos] };
  }),
  toggleTodo: (id: number) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ),
  })),
  deleteTodo: (id: number) => set((state) => ({
    todos: state.todos.filter(todo => todo.id !== id),
  })),
}));
