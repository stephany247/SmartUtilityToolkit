import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CATEGORIES,
  Category,
  convert,
  convertCurrency,
  DEFAULT_CURRENCY_REFS,
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
  const [loading, setLoading] = useState(false);
  const [currencyQuickRefs, setCurrencyQuickRefs] = useState<
    { val: string; label: string }[] | null
  >(null);

  const categoryData = CATEGORIES[activeCategory];

  const handleConvert = useCallback(
    async (value: string, fUnit: string, tUnit: string, cat: Category) => {
      const num = parseFloat(value);

      if (!value || isNaN(num)) {
        setResult("");
        setFormula("");
        return;
      }

      if (cat === "currency") {
        setLoading(true);

        try {
          const res = await convertCurrency(num, fUnit, tUnit);

          if (!res) return;

          const formatted = formatResult(res);
          setResult(formatted);
          setFormula(`${num} ${fUnit} = ${formatted} ${tUnit}`);
        } finally {
          setLoading(false);
        }

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

  const loadCurrencyRefs = async () => {
    if (currencyQuickRefs) return;

    try {
      const data = await fetch("https://open.er-api.com/v6/latest/USD").then(
        (r) => r.json(),
      );

      const rates = data.rates;

      const refs = [
        { val: `1 USD = ${rates.NGN.toFixed(2)} NGN`, label: "USD → NGN" },
        {
          val: `1 GBP = ${(rates.NGN / rates.GBP).toFixed(2)} NGN`,
          label: "GBP → NGN",
        },
        {
          val: `1 EUR = ${(rates.NGN / rates.EUR).toFixed(2)} NGN`,
          label: "EUR → NGN",
        },
      ];

      setCurrencyQuickRefs(refs);
    } catch (e) {
      console.log("Failed to load currency refs");
    }
  };

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
    if (cat === "currency" && !currencyQuickRefs) {
      loadCurrencyRefs();
    }
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
          <Text style={{ fontSize: 18, color: colors.text }}>⚙</Text>
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
          unitLabels={categoryData.unitLabels}
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
          value={loading ? "..." : result}
          unit={toUnit}
          units={categoryData.units}
          unitLabels={categoryData.unitLabels}
          editable={false}
          isResult
          onChangeUnit={handleToUnitChange}
        />

        {/* Formula badge */}
        {formula ? (
          <View style={styles.formulaBadge}>
            <Text style={styles.formulaText}>
              {loading ? (
                <ActivityIndicator color={colors.accent2} size="small" />
              ) : (
                formula
              )}
            </Text>
          </View>
        ) : null}

        {/* Quick refs */}
        <QuickRefs
          refs={
            activeCategory === "currency"
              ? currencyQuickRefs || DEFAULT_CURRENCY_REFS
              : categoryData.quickRefs
          }
        />
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
    paddingTop: spacing.lg,
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
    backgroundColor: "rgba(255,159,10,0.12)",
    borderWidth: 0.5,
    borderColor: "rgba(255,159,10,0.25)",
    borderRadius: radius.sm,
    paddingVertical: 14,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  formulaText: {
    fontSize: 13,
    color: colors.accent,
    fontVariant: ["tabular-nums"],
    fontWeight: "500",
  },
});
