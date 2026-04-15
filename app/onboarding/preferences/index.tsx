import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { OnboardingStep } from '@/components/ui/OnboardingStep';
import { LifestyleCard } from '@/ui/LifestyleCard';
import { useOnboarding, PreferenceId } from '@/hooks/useOnboarding';

const PREFERENCES: { id: PreferenceId; label: string }[] = [
  { id: 'vegan', label: 'Vegan' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'pescatarian', label: 'Pescatarian' },
  { id: 'lowcarb', label: 'Low Carb' },
  { id: 'highprotein', label: 'High Protein' },
  { id: 'balanced', label: 'Balanced Diet' },
  { id: 'dairyfree', label: 'Dairy-Free' },
  { id: 'glutenfree', label: 'Gluten-Free' },
  { id: 'nopork', label: 'No Pork' },
  { id: 'nobeef', label: 'No Beef' },
  { id: 'noseafood', label: 'No Seafood' },
  { id: 'highfiber', label: 'High Fiber' },
];

export default function PreferencesScreen() {
  const { data, togglePreference } = useOnboarding();

  const handleToggle = (id: PreferenceId) => {
    Haptics.selectionAsync();
    togglePreference(id);
  };

  const handleContinue = () => {
    router.push('/onboarding/lifestyle');
  };

  // Cleaned preferences (no duplicates, no empty values)
  const cleanedPreferences = Array.from(
    new Set(
      data.preferences
        .filter((p) => typeof p === 'string' && p.trim().length > 0)
        .map((p) => p.trim().toLowerCase())
    )
  );

  return (
    <OnboardingStep
      step={2}
      totalSteps={4}
      title="Your Preferences"
      subtitle="Select all that apply"
      canContinue={cleanedPreferences.length > 0}
      onContinue={handleContinue}
    >
      {PREFERENCES.map((pref) => (
        <View key={pref.id} style={styles.cardWrapper}>
          <LifestyleCard
            label={pref.label}
            selected={cleanedPreferences.includes(pref.id)}
            onSelect={() => handleToggle(pref.id)}
          />
        </View>
      ))}
    </OnboardingStep>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 20,
  },
});
