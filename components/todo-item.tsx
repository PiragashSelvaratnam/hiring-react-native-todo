import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import type { Todo } from "./todo-list";

type TodoItemProps = {
  item: Todo;
  onToggleTodo: (id: string) => void;
  onEditTodo: (id: string) => void;
};

export default function TodoItem({
  item,
  onToggleTodo,
  onEditTodo,
}: TodoItemProps) {
  return (
    <View style={styles.todoItem}>
      <TouchableOpacity
        onPress={() => onToggleTodo(item.id)}
        activeOpacity={0.7}
      >
        <View
          style={[styles.checkbox, item.completed && styles.checkboxCompleted]}
        >
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onEditTodo(item.id)}
        activeOpacity={0.7}
        style={styles.todoTextContainer}
      >
        <Text
          style={[styles.todoText, item.completed && styles.todoTextCompleted]}
        >
          {item.text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 4,
    backgroundColor: "#FFFFFF",
  },
  todoTextContainer: {
    flex: 1,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxCompleted: {
    backgroundColor: "#51ACB4",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  todoText: {
    fontSize: 18,
    color: "#000000",
    fontFamily: "Manrope_500Medium",
  },
  todoTextCompleted: {
    textDecorationLine: "line-through",
    color: "#8A8A8A",
  },
});
