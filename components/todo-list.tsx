import { StyleSheet, View, FlatList } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import ButtonWithIcon from "./button-with-icon";
import TodoItem from "./todo-item";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type TodoListProps = {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onEditTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
};

export default function TodoList({
  todos,
  onToggleTodo,
  onEditTodo,
  onDeleteTodo,
}: TodoListProps) {
  const renderRightActions = (id: string) => {
    return (
      <View style={styles.swipeActions}>
        <ButtonWithIcon
          icon={<MaterialIcons name="delete" size={20} color="#FFFFFF" />}
          onPress={() => onDeleteTodo(id)}
          buttonStyle={[styles.swipeAction, styles.deleteAction]}
        />
      </View>
    );
  };

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <ReanimatedSwipeable
      renderRightActions={() => renderRightActions(item.id)}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
    >
      <TodoItem
        item={item}
        onToggleTodo={onToggleTodo}
        onEditTodo={onEditTodo}
      />
    </ReanimatedSwipeable>
  );

  return (
    <FlatList
      data={todos}
      renderItem={renderTodoItem}
      keyExtractor={(item) => item.id}
      style={styles.todoList}
      contentContainerStyle={styles.todoListContent}
    />
  );
}

const styles = StyleSheet.create({
  todoList: {
    flex: 1,
  },
  todoListContent: {
    paddingHorizontal: 24,
    gap: 16,
  },
  swipeActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  swipeAction: {
    width: 40,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  editAction: {
    backgroundColor: "#51ACB4",
  },
  deleteAction: {
    backgroundColor: "#E74C3C",
  },
});
