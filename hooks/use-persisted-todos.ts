import { useState, useEffect, useCallback } from "react";
import { STORAGE_KEYS, setStorage, getStorage } from "@/utils/storage";
import type { Todo } from "@/components/todo-list";

export function usePersistedTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTodos = () => {
      const storedTodos = getStorage<Todo[]>(STORAGE_KEYS.TODOS);

      if (storedTodos && Array.isArray(storedTodos)) {
        setTodos(storedTodos);
      }

      setIsLoaded(true);
    };

    loadTodos();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setStorage(STORAGE_KEYS.TODOS, todos);
    }
  }, [todos, isLoaded]);

  const addTodo = useCallback((text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
    };
    console.log("newTodo", newTodo);
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  }, []);

  const updateTodo = useCallback((id: string, text: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: text.trim() } : todo
      )
    );
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  return {
    todos,
    isLoaded,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
  };
}
