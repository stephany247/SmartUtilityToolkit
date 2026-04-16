import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { TaskItem } from "../components/TaskItem";
import { colors, spacing } from "../theme";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Buy food", completed: false },
    { id: "2", title: "Finish app UI", completed: true },
  ]);

  const [input, setInput] = useState("");

  const addTask = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setTasks((prev) => [
      { id: Date.now().toString(), title: trimmed, completed: false },
      ...prev,
    ]);
    setInput("");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const editTask = (id: string, newTitle: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Input */}
      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Add a task..."
          placeholderTextColor={colors.text3}
          style={styles.input}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTask}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: spacing.md }}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={toggleTask}
            onEdit={editTask}
            onDelete={deleteTask}
          />
        )}
      />

      {tasks.length === 0 && (
        <Text style={styles.empty}>No tasks yet</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.bg,
  },
  inputRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: spacing.lg,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: colors.text,
  },
  addBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 8,
  },
  addText: {
    color: "#fff",
    fontWeight: "600",
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: colors.text3,
  },
});