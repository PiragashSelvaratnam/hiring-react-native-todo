import ButtonWithIcon from "@/components/button-with-icon";
import TodoInput from "@/components/todo-input";
import TodoList from "@/components/todo-list";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { usePersistedTodos } from "@/hooks/use-persisted-todos";

export default function Index() {
  const { top, bottom } = useSafeAreaInsets();
  const { todos, addTodo, updateTodo, toggleTodo, deleteTodo } =
    usePersistedTodos();

  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [newTodoText, setNewTodoText] = useState("");
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const fabRotation = useSharedValue(0);
  const fabPosition = useSharedValue(bottom + 24);

  useEffect(() => {
    fabRotation.value = withTiming(isAddingTodo ? 1 : 0, {
      duration: 300,
    });
    console.log("fabRotation", fabPosition.value);
    fabPosition.value = withTiming(isAddingTodo ? 10 : bottom + 24, {
      duration: 300,
    });
    console.log("fabPosition", fabPosition.value);
  }, [isAddingTodo, bottom]);

  const fabIconStyle = useAnimatedStyle(() => {
    const rotation = interpolate(fabRotation.value, [0, 1], [0, 45]);

    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  const fabButtonStyle = useAnimatedStyle(() => {
    return {
      bottom: fabPosition.value,
    };
  });

  const toggleAddTodo = () => {
    if (isAddingTodo) {
      setIsAddingTodo(false);
      setNewTodoText("");
      setEditingTodoId(null);
    } else {
      setIsAddingTodo(true);
      setNewTodoText("");
      setEditingTodoId(null);
    }
  };

  const handleEditTodo = (id: string) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setNewTodoText(todoToEdit.text);
      setEditingTodoId(id);
      setIsAddingTodo(true);
    }
  };

  const submitTodo = () => {
    if (newTodoText.trim()) {
      if (editingTodoId) {
        updateTodo(editingTodoId, newTodoText);
      } else {
        addTodo(newTodoText);
      }
      setIsAddingTodo(false);
      setNewTodoText("");
      setEditingTodoId(null);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <View style={styles.container}>
        <View style={[styles.content, { paddingTop: top + 20 }]}>
          <Text style={styles.title}>tasked</Text>

          {isAddingTodo && (
            <TodoInput
              value={newTodoText}
              onChangeText={setNewTodoText}
              onSubmit={submitTodo}
            />
          )}

          <TodoList
            todos={todos}
            onToggleTodo={toggleTodo}
            onEditTodo={handleEditTodo}
            onDeleteTodo={deleteTodo}
          />
        </View>

        <ButtonWithIcon
          icon={<MaterialIcons name="add" size={40} color="#FFFFFF" />}
          onPress={toggleAddTodo}
          buttonStyle={[fabButtonStyle, styles.fab]}
          iconStyle={fabIconStyle}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: "800",
    fontFamily: "Manrope_500Medium",
    marginBottom: 32,
    color: "#000000",
    paddingHorizontal: 24,
  },
  fab: {
    position: "absolute",
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#51ACB4",
    justifyContent: "center",
    alignItems: "center",
  },
});
