import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors, radius, spacing, typography } from '../theme';
import { UnitPicker } from './UnitPicker';

interface Props {
  label: string;
  value: string;
  unit: string;
  units: string[];
  editable?: boolean;
  isResult?: boolean;
  onChangeValue?: (v: string) => void;
  onChangeUnit: (u: string) => void;
}

export function ConvertField({
  label,
  value,
  unit,
  units,
  editable = true,
  isResult = false,
  onChangeValue,
  onChangeUnit,
}: Props) {
  const [focused, setFocused] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);

  return (
    <>
      <View style={[styles.card, focused && styles.cardFocused]}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, isResult && styles.inputResult]}
            value={value}
            onChangeText={onChangeValue}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor={colors.text3}
            editable={editable}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={styles.unitBtn}
            onPress={() => setPickerVisible(true)}
            activeOpacity={0.75}
          >
            <Text style={styles.unitText}>{unit}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      <UnitPicker
        visible={pickerVisible}
        units={units}
        selected={unit}
        onSelect={onChangeUnit}
        onClose={() => setPickerVisible(false)}
        title={`Select ${label} unit`}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg + 2,
    paddingTop: spacing.lg + 2,
    paddingBottom: spacing.md + 4,
  },
  cardFocused: {
    borderColor: colors.accent,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  label: {
    ...typography.label,
    marginBottom: spacing.md - 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 28,
    fontWeight: '500',
    color: colors.text,
    padding: 0,
    margin: 0,
  },
  inputResult: {
    color: colors.green,
  },
  unitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surface2,
    borderWidth: 0.5,
    borderColor: colors.border2,
    borderRadius: radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 72,
    justifyContent: 'center',
  },
  unitText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  chevron: {
    fontSize: 16,
    color: colors.text3,
    marginTop: -1,
  },
});
