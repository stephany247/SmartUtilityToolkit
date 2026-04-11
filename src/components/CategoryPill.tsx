import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors, radius } from "../theme";

interface Props {
  label: string;
  active: boolean;
  onPress: () => void;
}

export function CategoryPill({ label, active, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.pill, active && styles.pillActive]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={[styles.text, active && styles.textActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 0.5,
    borderColor: colors.border,
    marginRight: 8,
  },
  pillActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  text: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.text2,
    letterSpacing: 0.1,
  },
  textActive: {
    color: "#fff",
  },
});
