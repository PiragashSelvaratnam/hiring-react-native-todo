import { StyleSheet, View, FlatList } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import ButtonWithIcon from "./button-with-icon";
import TodoItem from "./todo-item";
import Animated, {
  LinearTransition,
  FadeInDown,
  FadeOutUp,
} from "react-native-reanimated";
import { TodoColors } from "@/constants/Colors";

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
    <Animated.View
      entering={FadeInDown.duration(300).springify()}
      exiting={FadeOutUp.duration(300)}
      layout={LinearTransition}
    >
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
    </Animated.View>
  );

  return (
    <Animated.FlatList
      data={todos}
      renderItem={renderTodoItem}
      keyExtractor={(item) => item.id}
      style={styles.todoList}
      contentContainerStyle={styles.todoListContent}
      itemLayoutAnimation={LinearTransition}
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
  deleteAction: {
    backgroundColor: TodoColors.deleteAction,
  },
});
