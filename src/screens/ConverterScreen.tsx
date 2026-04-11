import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CATEGORIES,
  Category,
  convert,
  formatResult,
} from "../utils/conversions";
import { CategoryPill } from "../components/CategoryPill";
import { ConvertField } from "../components/ConvertField";
import { QuickRefs } from "../components/QuickRefs";
import { colors, spacing, radius } from "../theme";

export function ConverterScreen() {
  const [activeCategory, setActiveCategory] = useState<Category>("length");
  const [fromValue, setFromValue] = useState("");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");
  const [result, setResult] = useState("");
  const [formula, setFormula] = useState("");

  const categoryData = CATEGORIES[activeCategory];

  const handleConvert = useCallback(
    (value: string, fUnit: string, tUnit: string, cat: Category) => {
      const num = parseFloat(value);
      if (!value || isNaN(num)) {
        setResult("");
        setFormula("");
        return;
      }
      const res = convert(num, fUnit, tUnit, cat);
      if (res === null) return;
      const formatted = formatResult(res);
      setResult(formatted);
      setFormula(`${num} ${fUnit} = ${formatted} ${tUnit}`);
    },
    [],
  );

  const handleCategoryChange = (cat: Category) => {
    const units = CATEGORIES[cat].units;
    const newFromUnit = units[0];
    const newToUnit = units[1] ?? units[0];
    setActiveCategory(cat);
    setFromUnit(newFromUnit);
    setToUnit(newToUnit);
    setFromValue("");
    setResult("");
    setFormula("");
    Keyboard.dismiss();
  };

  const handleFromValueChange = (value: string) => {
    setFromValue(value);
    handleConvert(value, fromUnit, toUnit, activeCategory);
  };

  const handleFromUnitChange = (unit: string) => {
    setFromUnit(unit);
    handleConvert(fromValue, unit, toUnit, activeCategory);
  };

  const handleToUnitChange = (unit: string) => {
    setToUnit(unit);
    handleConvert(fromValue, fromUnit, unit, activeCategory);
  };

  const handleSwap = () => {
    const oldFrom = fromUnit;
    const oldTo = toUnit;
    const oldResult = result;
    setFromUnit(oldTo);
    setToUnit(oldFrom);
    if (oldResult) {
      setFromValue(oldResult);
      handleConvert(oldResult, oldTo, oldFrom, activeCategory);
    }
  };

  const handleRefPress = (ref: { val: string; label: string }) => {
    // Parse the "from" part of the ref e.g. "1 ft = 0.305 m"
    // and populate the from field
    const match = ref.val.match(/^([\d.]+)\s+(\S+)/);
    if (!match) return;
    const val = match[1];
    const unit = match[2].replace(/°/g, "°");
    if (categoryData.units.includes(unit)) {
      setFromValue(val);
      setFromUnit(unit);
      handleConvert(val, unit, toUnit, activeCategory);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>Smart Toolkit</Text>
          <Text style={styles.subheading}>Unit converter</Text>
        </View>
        <TouchableOpacity style={styles.settingsBtn}>
          <Text style={{ fontSize: 18 }}>⚙</Text>
        </TouchableOpacity>
      </View>

      {/* Category pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.catScroll}
        keyboardShouldPersistTaps="handled"
        style={styles.catScrollView}
      >
        {(Object.keys(CATEGORIES) as Category[]).map((cat) => (
          <CategoryPill
            key={cat}
            label={CATEGORIES[cat].label}
            emoji={CATEGORIES[cat].emoji}
            active={activeCategory === cat}
            onPress={() => handleCategoryChange(cat)}
          />
        ))}
      </ScrollView>

      {/* Main content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* From field */}
        <ConvertField
          label="From"
          value={fromValue}
          unit={fromUnit}
          units={categoryData.units}
          editable
          onChangeValue={handleFromValueChange}
          onChangeUnit={handleFromUnitChange}
        />

        {/* Swap row */}
        <View style={styles.swapRow}>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.swapBtn}
            onPress={handleSwap}
            activeOpacity={0.7}
          >
            <Text style={styles.swapIcon}>⇅</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
        </View>

        {/* To field */}
        <ConvertField
          label="To"
          value={result}
          unit={toUnit}
          units={categoryData.units}
          editable={false}
          isResult
          onChangeUnit={handleToUnitChange}
        />

        {/* Formula badge */}
        {formula ? (
          <View style={styles.formulaBadge}>
            <Text style={styles.formulaText}>{formula}</Text>
          </View>
        ) : null}

        {/* Quick refs */}
        <QuickRefs refs={categoryData.quickRefs} onRefPress={handleRefPress} />

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  heading: {
    fontSize: 26,
    fontWeight: "600",
    letterSpacing: -0.5,
    color: colors.text,
  },
  subheading: {
    fontSize: 14,
    fontWeight: "300",
    color: colors.text2,
    marginTop: 2,
  },
  settingsBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 0.5,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  catScrollView: {
    flexGrow: 0,
    flexShrink: 0,
  },
  catScroll: {
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.xl,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    gap: 12,
  },
  swapRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  divider: {
    flex: 1,
    height: 0.5,
    backgroundColor: colors.border,
  },
  swapBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface2,
    borderWidth: 0.5,
    borderColor: colors.border2,
    alignItems: "center",
    justifyContent: "center",
  },
  swapIcon: {
    fontSize: 18,
    color: colors.text2,
  },
  formulaBadge: {
    backgroundColor: "rgba(52,201,138,0.1)",
    borderWidth: 0.5,
    borderColor: "rgba(52,201,138,0.2)",
    borderRadius: radius.sm,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  formulaText: {
    fontSize: 13,
    color: colors.green,
    fontVariant: ["tabular-nums"],
    fontWeight: "500",
  },
});
