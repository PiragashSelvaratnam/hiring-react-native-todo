import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  interpolateColor,
} from "react-native-reanimated";
import type { Todo } from "./todo-list";
import { TodoColors } from "@/constants/Colors";

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
  const progress = useSharedValue(item.completed ? 1 : 0);

  useEffect(() => {
    progress.value = withSpring(item.completed ? 1 : 0, {
      damping: 15,
      stiffness: 150,
      mass: 0.5,
    });
  }, [item.completed]);

  const checkboxAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ["#1A1A1A", "#51ACB4"]
    );

    return {
      backgroundColor,
    };
  });

  const checkmarkAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 0.5, 1], [0, 1.2, 1]);
    const opacity = interpolate(progress.value, [0, 0.3, 1], [0, 1, 1]);

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      ["#000000", "#8A8A8A"]
    );

    return {
      color,
    };
  });

  return (
    <View style={styles.todoItem}>
      <TouchableOpacity
        onPress={() => onToggleTodo(item.id)}
        activeOpacity={0.7}
      >
        <Animated.View style={[styles.checkbox, checkboxAnimatedStyle]}>
          <Animated.Text style={[styles.checkmark, checkmarkAnimatedStyle]}>
            ✓
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onEditTodo(item.id)}
        activeOpacity={0.7}
        style={styles.todoTextContainer}
      >
        <Animated.Text
          style={[
            styles.todoText,
            textAnimatedStyle,
            item.completed && styles.todoTextCompleted,
          ]}
        >
          {item.text}
        </Animated.Text>
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
    backgroundColor: TodoColors.background,
  },
  todoTextContainer: {
    flex: 1,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    color: TodoColors.icon,
    fontSize: 16,
    fontWeight: "bold",
  },
  todoText: {
    fontSize: 18,
    color: TodoColors.text,
    fontFamily: "Manrope_500Medium",
  },
  todoTextCompleted: {
    textDecorationLine: "line-through",
    color: TodoColors.textCompleted,
  },
});
