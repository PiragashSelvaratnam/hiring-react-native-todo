import { TodoColors } from "@/constants/Colors";
import { StyleSheet, View, TextInput, TextInputProps } from "react-native";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type TodoInputProps = TextInputProps & {
  onSubmit: () => void;
};

export default function TodoInput({
  value,
  onChangeText,
  onSubmit,
  autoFocus = true,
  placeholder = "",
}: TodoInputProps) {
  const isFocused = useSharedValue(autoFocus ? 1 : 0);

  const animatedInputStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withTiming(isFocused.value ? 1.02 : 1, { duration: 200 }) },
      ],
      opacity: withTiming(isFocused.value ? 1 : 0.7, { duration: 200 }),
      borderWidth: withTiming(isFocused.value ? 1 : 0, { duration: 200 }),
      borderColor: withTiming(isFocused.value ? TodoColors.primary : TodoColors.background, { duration: 200 }),
      borderRadius: withTiming(isFocused.value ? 8 : 0, { duration: 200 }),
      padding: withTiming(isFocused.value ? 8 : 0, { duration: 200 }),
    };
  });

  const handleFocus = () => {
    isFocused.value = 1;
  };

  const handleBlur = () => {
    isFocused.value = 0;
  };

  return (
    <View style={styles.addTodoContainer}>
      <Animated.View style={styles.addTodoRow}>
        <Animated.View
          entering={FadeIn.duration(300).delay(100)}
          style={styles.checkboxPlaceholder}
        />
        <Animated.View style={[styles.inputWrapper, animatedInputStyle]}>
          <TextInput
            style={styles.addTodoInput}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            autoFocus={autoFocus}
            onSubmitEditing={onSubmit}
            onFocus={handleFocus}
            onBlur={handleBlur}
            returnKeyType="done"
            placeholderTextColor="#999"
            autoCapitalize="none"
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  addTodoContainer: {
    backgroundColor: TodoColors.background,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  addTodoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  checkboxPlaceholder: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#1A1A1A",
  },
  inputWrapper: {
    flex: 1,
  },
  addTodoInput: {
    fontSize: 18,
    color: TodoColors.text,
    fontFamily: "Manrope_500Medium",
    padding: 0,
  },
});
