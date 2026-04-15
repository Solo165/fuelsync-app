import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { OnboardingStep } from '@/components/ui/OnboardingStep';
import { useOnboarding, SexOption } from '@/hooks/useOnboarding';
import { Colors } from '@/constants/theme';
import { MAX_WIDTH } from '@/constants/layout';

const formatNumber = (value: string) => {
  return value.replace(/[^0-9]/g, '').replace(/^0+/, '');
};

const isValidAge = (val: string) => {
  const n = parseInt(val);
  return n >= 1 && n <= 120;
};

const isValidHeight = (val: string) => {
  const n = parseInt(val);
  return n >= 50 && n <= 300;
};

const isValidWeight = (val: string) => {
  const n = parseInt(val);
  return n >= 20 && n <= 500;
};

const SEX_OPTIONS: { id: SexOption; label: string }[] = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'none', label: 'Prefer not to say' },
];

export default function MetricsScreen() {
  const { data, setHeight, setWeight, setAge, setSex } = useOnboarding();

  const allFilled =
    isValidHeight(data.height) &&
    isValidWeight(data.weight) &&
    isValidAge(data.age) &&
    data.sex !== null;

  const handleContinue = () => {
    router.push('/onboarding/summary');
  };

  return (
    <OnboardingStep
      step={4}
      totalSteps={4}
      title="Your Metrics"
      subtitle="This helps us personalize your plan."
      canContinue={allFilled}
      onContinue={handleContinue}
    >
      <View style={styles.wrapper}>

        {/* HEIGHT */}
        <View style={styles.inputBlock}>
          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={data.height}
            onChangeText={(v) => setHeight(formatNumber(v))}
            placeholder="e.g. 175"
            placeholderTextColor={Colors.textMuted}
            returnKeyType="next"
          />
        </View>

        {/* WEIGHT */}
        <View style={styles.inputBlock}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={data.weight}
            onChangeText={(v) => setWeight(formatNumber(v))}
            placeholder="e.g. 70"
            placeholderTextColor={Colors.textMuted}
            returnKeyType="next"
          />
        </View>

        {/* AGE */}
        <View style={styles.inputBlock}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={data.age}
            onChangeText={(v) => setAge(formatNumber(v))}
            placeholder="e.g. 28"
            placeholderTextColor={Colors.textMuted}
            returnKeyType="done"
          />
        </View>

        {/* SEX */}
        <View style={styles.sexBlock}>
          <Text style={styles.label}>Sex</Text>
          {SEX_OPTIONS.map((opt) => {
            const selected = data.sex === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                style={[styles.sexCard, selected && styles.sexCardSelected]}
                onPress={() => {
                  Haptics.selectionAsync();
                  setSex(opt.id);
                }}
              >
                <Text style={[styles.sexText, selected && styles.sexTextSelected]}>
                  {opt.label}
                </Text>
                {selected && <Text style={styles.tick}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* EXTRA BOTTOM SPACING */}
        <View style={styles.bottomSpacer} />

      </View>
    </OnboardingStep>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: MAX_WIDTH,
    alignSelf: 'center',
  },

  inputBlock: {
    marginBottom: 24,
    width: '100%',
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: Colors.textPrimary,
    textAlign: 'center',
  },

  input: {
    width: '100%',
    backgroundColor: Colors.surface,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 14,
    fontSize: 18,
    color: Colors.textPrimary,
    textAlign: 'center',
  },

  sexBlock: {
    marginTop: 10,
    width: '100%',
  },

  sexCard: {
    width: '100%',
    backgroundColor: Colors.surface,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sexCardSelected: {
    backgroundColor: Colors.primary,
  },

  sexText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },

  sexTextSelected: {
    color: Colors.white,
    fontWeight: '600',
  },

  tick: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
  },

  bottomSpacer: {
    height: 30, // adjust if you want more or less space
  },
});
