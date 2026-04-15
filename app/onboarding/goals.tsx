import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { OnboardingStep } from '@/components/ui/OnboardingStep';
import { LifestyleCard } from '@/ui/LifestyleCard';
import { useOnboarding, GoalId } from '@/hooks/useOnboarding';
import { View, StyleSheet } from 'react-native';

const GOALS: { id: GoalId; label: string }[] = [
  { id: 'lose', label: 'Lose Weight' },
  { id: 'gain', label: 'Gain Muscle' },
  { id: 'weight', label: 'Gain Weight' },
  { id: 'maintain', label: 'Maintain Weight' },
  { id: 'energy', label: 'Increase Energy' },
  { id: 'health', label: 'Improve Health' },
];

export default function GoalsScreen() {
  const { data, setGoal } = useOnboarding();

  const handleSelect = (id: GoalId) => {
    Haptics.selectionAsync();
    setGoal(id);
  };

  const handleContinue = () => {
    router.push('/onboarding/preferences');
  };

  // ⭐ THIS IS THE IMPORTANT PART ⭐
  // Continue button stays grey until ONE goal is selected
  const canContinue = data.goal !== null;

  return (
    <OnboardingStep
      step={1}
      totalSteps={4}
      title="Your Goal"
      subtitle="Select one option"
      canContinue={canContinue}
      onContinue={handleContinue}
    >
      {GOALS.map((goal) => (
        <View key={goal.id} style={styles.cardWrapper}>
          <LifestyleCard
            label={goal.label}
            selected={data.goal === goal.id}
            onSelect={() => handleSelect(goal.id)}
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
