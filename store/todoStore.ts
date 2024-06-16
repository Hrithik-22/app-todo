import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],
      fetchTodos: async () => {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const todos = await response.json();
        const todosWithTimestamps = todos.map((todo: Todo) => ({
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
            id: state.todos.length
              ? Math.max(...state.todos.map((todo) => todo.id)) + 1
              : 1,
            title,
            completed: false,
            created_at: now,
            updated_at: now,
          };

          return { todos: [newTodo, ...state.todos] };
        }),
      toggleTodo: (id: number) =>
        set((state) => {
          const now = new Date().toISOString();
          const updatedTodos = state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, completed: !todo.completed, updated_at: now }
              : todo
          );

          return { todos: updatedTodos };
        }),
      deleteTodo: (id: number) =>
        set((state) => {
          const updatedTodos = state.todos.filter((todo) => todo.id !== id);

          return { todos: updatedTodos };
        }),
    }),
    {
      name: "todo-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        console.log("Rehydration complete", state);
      },
    }
  )
);
