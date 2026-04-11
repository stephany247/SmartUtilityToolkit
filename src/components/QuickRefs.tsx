import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, radius, spacing } from "../theme";

interface Ref {
  val: string;
  label: string;
}

interface Props {
  refs: Ref[];
}

export function QuickRefs({ refs }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick reference</Text>
      <View style={styles.grid}>
        {refs.map((ref, i) => (
          <View key={i} style={styles.item}>
            <Text style={styles.val}>{ref.val}</Text>
            <Text style={styles.label}>{ref.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  title: {
    fontSize: 11,
    fontWeight: "500",
    color: colors.text3,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  item: {
    width: "48.5%",
    backgroundColor: colors.surface2,
    borderRadius: radius.sm,
    paddingVertical: 9,
    paddingHorizontal: 12,
  },
  val: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 2,
    fontVariant: ["tabular-nums"],
  },
  label: {
    fontSize: 11,
    color: colors.text3,
  },
});
