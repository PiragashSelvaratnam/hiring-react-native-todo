import { StyleSheet, View, TextInput, TextInputProps } from "react-native";

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
  return (
    <View style={styles.addTodoContainer}>
      <View style={styles.addTodoRow}>
        <View style={styles.checkboxPlaceholder} />
        <TextInput
          style={styles.addTodoInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onSubmitEditing={onSubmit}
          returnKeyType="done"
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addTodoContainer: {
    backgroundColor: "#EEEEEE",
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
  addTodoInput: {
    flex: 1,
    fontSize: 18,
    color: "#000000",
    fontFamily: "Manrope_500Medium",
    padding: 0,
  },
});
