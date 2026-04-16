import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { colors, radius, spacing } from "../theme";
import { Task } from "../utils/taskStorage";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onEdit, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  const commitEdit = () => {
    const trimmed = draft.trim();
    if (trimmed.length === 0) {
      setDraft(task.title); // revert if empty
    } else {
      onEdit(task.id, trimmed);
    }
    setEditing(false);
  };

  return (
    <View style={styles.row}>
      {/* Checkbox */}
      <TouchableOpacity
        style={[styles.checkbox, task.completed && styles.checkboxDone]}
        onPress={() => onToggle(task.id)}
        activeOpacity={0.7}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        {task.completed && <AntDesign name="check" size={14} color="white" />}
      </TouchableOpacity>

      {/* Title / edit input */}
      {editing ? (
        <TextInput
          style={styles.editInput}
          value={draft}
          onChangeText={setDraft}
          onBlur={commitEdit}
          onSubmitEditing={commitEdit}
          autoFocus
          returnKeyType="done"
          selectTextOnFocus
        />
      ) : (
        <TouchableOpacity
          style={styles.titleWrapper}
          onPress={() => {
            if (!task.completed) {
              setDraft(task.title);
              setEditing(true);
            }
          }}
          activeOpacity={0.6}
        >
          <Text
            style={[styles.title, task.completed && styles.titleDone]}
            numberOfLines={2}
          >
            {task.title}
          </Text>
        </TouchableOpacity>
      )}

      {/* Delete */}
      {!editing && (
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => onDelete(task.id)}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Entypo name="cross" size={24} color={colors.text2} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 0.5,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md + 2,
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.border2,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  checkboxDone: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  titleWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "400",
    color: colors.text,
    lineHeight: 21,
  },
  titleDone: {
    color: colors.text3,
    textDecorationLine: "line-through",
  },
  editInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: "400",
    color: colors.text,
    borderBottomWidth: 1,
    borderBottomColor: colors.accent,
    paddingVertical: 2,
    padding: 0,
  },
  deleteBtn: {
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: colors.surface2,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  deleteIcon: {
    fontSize: 11,
    color: colors.text3,
    fontWeight: "600",
  },
});
