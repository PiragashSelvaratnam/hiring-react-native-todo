import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV({
  id: "todo-app-storage",
});

export const STORAGE_KEYS = {
  TODOS: "todos",
} as const;

export const setStorage = (key: string, value: any) => {
  return storage.set(key, JSON.stringify(value));
};

export const getStorage = <T>(key: string): T | null => {
  const value = storage.getString(key);
  return value ? JSON.parse(value) : null;
};

export const deleteStorage = (key: string) => {
  return storage.remove(key);
};
