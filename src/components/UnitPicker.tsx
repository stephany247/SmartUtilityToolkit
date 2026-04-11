import React, { useEffect } from "react";
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
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

interface Props {
  visible: boolean;
  units: string[];
  unitLabels?: Record<string, string>;
  selected: string;
  onSelect: (unit: string) => void;
  onClose: () => void;
  title?: string;
}

export function UnitPicker({
  visible,
  units,
  unitLabels,
  selected,
  onSelect,
  onClose,
  title,
}: Props) {
  const translateY = useSharedValue(0);
  const pan = Gesture.Pan()
    .runOnJS(true) // 👈 whole gesture runs on JS thread
    .onUpdate((e) => {
      if (e.translationY > 0) {
        translateY.value = e.translationY;
      }
    })
    .onEnd((e) => {
      if (e.translationY > 120 || e.velocityY > 800) {
        translateY.value = withSpring(0);
        onClose(); // just call it directly
      } else {
        translateY.value = withSpring(0, { damping: 30 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // Reset position when modal opens
  useEffect(() => {
    if (visible) translateY.value = 0;
  }, [visible]);

  const backdropStyle = useAnimatedStyle(() => {
    const opacity = 1 - Math.min(translateY.value / 300, 1);
    return {
      opacity,
    };
  });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={onClose}
          activeOpacity={1}
        />
      </Animated.View>

      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.sheet, animatedStyle]}>
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
                <View style={styles.itemTextContainer}>
                  <Text
                    style={[
                      styles.itemText,
                      item === selected && styles.itemTextActive,
                    ]}
                  >
                    {unitLabels?.[item] ? `${unitLabels[item]}` : item}
                  </Text>
                  <Text
                    style={[
                      styles.itemText,
                      item === selected && styles.itemTextActive,
                      { fontSize: 14, color: colors.text3 },
                    ]}
                  >
                    {item}
                  </Text>
                </View>

                {item === selected && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 32 }}
          />
        </Animated.View>
      </GestureDetector>
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
    overflow: "hidden",
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: radius.sm,
    marginBottom: 4,
    backgroundColor: "transparent",
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  itemActive: {
    // backgroundColor: "rgba(124,111,255,0.12)",
  },
  itemTextContainer: {
    flexDirection: "column",
    gap: 4,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.text,
  },
  itemTextActive: {
    color: colors.accent,
    fontWeight: "500",
  },
  checkmark: {
    fontSize: 16,
    color: colors.accent,
    fontWeight: "600",
  },
});
