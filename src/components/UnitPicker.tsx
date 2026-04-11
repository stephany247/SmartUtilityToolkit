import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { colors, radius, spacing } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  visible: boolean;
  units: string[];
  selected: string;
  onSelect: (unit: string) => void;
  onClose: () => void;
  title?: string;
}

export function UnitPicker({
  visible,
  units,
  selected,
  onSelect,
  onClose,
  title,
}: Props) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.backdrop}
        onPress={onClose}
        activeOpacity={1}
      />
      <SafeAreaView style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={styles.title}>Select Unit</Text>
        <FlatList
          data={units}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.item, item === selected && styles.itemActive]}
              onPress={() => {
                onSelect(item);
                onClose();
              }}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.itemText,
                  item === selected && styles.itemTextActive,
                ]}
              >
                {item}
              </Text>
              {item === selected && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 32 }}
        />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    paddingHorizontal: spacing.xl,
    maxHeight: "60%",
    borderTopWidth: 0.5,
    borderColor: colors.border2,
    overflow: 'hidden',
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border2,
    alignSelf: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.text3,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: radius.sm,
    marginBottom: 4,
    backgroundColor: "transparent",
  },
  itemActive: {
    backgroundColor: "rgba(124,111,255,0.12)",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.text,
  },
  itemTextActive: {
    color: colors.accent2,
    fontWeight: "500",
  },
  checkmark: {
    fontSize: 16,
    color: colors.accent,
    fontWeight: "600",
  },
});
