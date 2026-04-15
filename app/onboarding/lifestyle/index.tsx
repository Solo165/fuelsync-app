import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { OnboardingStep } from '@/components/ui/OnboardingStep';
import { CategoryBlock } from '@/ui/CategoryBlock';
import { useOnboarding, ActivityLevel, SleepQuality, DailyRoutine, EatingPattern } from '@/hooks/useOnboarding';

const CATEGORIES = [
  {
    id: 'activity',
    icon: '🏃',
    title: 'Activity Level',
    description: 'How much you move throughout the day.',
    options: [
      { id: 'sedentary', label: 'Sedentary' },
      { id: 'lightly-active', label: 'Lightly Active' },
      { id: 'active', label: 'Active' },
      { id: 'very-active', label: 'Very Active' },
    ],
  },
  {
    id: 'sleep',
    icon: '😴',
    title: 'Sleep Quality',
    description: 'How well you usually sleep.',
    options: [
      { id: 'poor', label: 'Poor' },
      { id: 'fair', label: 'Fair' },
      { id: 'good', label: 'Good' },
      { id: 'excellent', label: 'Excellent' },
    ],
  },
  {
    id: 'routine',
    icon: '📅',
    title: 'Daily Routine',
    description: 'How structured your day typically is.',
    options: [
      { id: 'unstructured', label: 'Unstructured' },
      { id: 'flexible', label: 'Flexible' },
      { id: 'structured', label: 'Structured' },
    ],
  },
  {
    id: 'eating',
    icon: '🍽️',
    title: 'Eating Pattern',
    description: 'How consistent your meals usually are.',
    options: [
      { id: 'irregular', label: 'Irregular' },
      { id: 'balanced', label: 'Balanced' },
      { id: 'strict', label: 'Strict Routine' },
    ],
  },
];

export default function LifestyleScreen() {
  const { data, setActivity, setSleep, setRoutine, setEating } = useOnboarding();

  const allSelected =
    data.activity !== null &&
    data.sleep !== null &&
    data.routine !== null &&
    data.eating !== null;

  const handleContinue = () => {
    router.push('/onboarding/metrics');
  };

  return (
    <OnboardingStep
      step={3}
      totalSteps={4}
      title="Your Lifestyle"
      subtitle="We'll personalize your plan based on your habits."
      canContinue={allSelected}
      onContinue={handleContinue}
    >
      {CATEGORIES.map((cat) => {
        const selectedValue =
          cat.id === 'activity' ? data.activity :
          cat.id === 'sleep' ? data.sleep :
          cat.id === 'routine' ? data.routine :
          cat.id === 'eating' ? data.eating :
          null;

        const handleSelect = (id: string) => {
          Haptics.selectionAsync();
          if (cat.id === 'activity') setActivity(id as ActivityLevel);
          if (cat.id === 'sleep') setSleep(id as SleepQuality);
          if (cat.id === 'routine') setRoutine(id as DailyRoutine);
          if (cat.id === 'eating') setEating(id as EatingPattern);
        };

        return (
          <CategoryBlock
            key={cat.id}
            icon={cat.icon}
            title={cat.title}
            description={cat.description}
            options={cat.options}
            selectedValue={selectedValue}
            onSelect={handleSelect}
          />
        );
      })}
    </OnboardingStep>
  );
}