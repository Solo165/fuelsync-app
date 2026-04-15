import { createContext, useContext, useState, ReactNode } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────

export type GoalId =
  | 'lose'
  | 'gain'
  | 'weight'
  | 'maintain'
  | 'energy'
  | 'health';

export type PreferenceId =
  | 'vegan'
  | 'vegetarian'
  | 'pescatarian'
  | 'lowcarb'
  | 'highprotein'
  | 'balanced'
  | 'dairyfree'
  | 'glutenfree'
  | 'nopork'
  | 'nobeef'
  | 'noseafood'
  | 'highfiber';

export type ActivityLevel =
  | 'sedentary'
  | 'lightly-active'
  | 'active'
  | 'very-active';

export type SleepQuality = 'poor' | 'fair' | 'good' | 'excellent';

export type DailyRoutine = 'unstructured' | 'flexible' | 'structured';

export type EatingPattern = 'irregular' | 'balanced' | 'strict';

export type SexOption = 'male' | 'female' | 'none';

export interface OnboardingData {
  // Step 1
  goal: GoalId | null;
  // Step 2
  preferences: PreferenceId[];
  // Step 3
  activity: ActivityLevel | null;
  sleep: SleepQuality | null;
  routine: DailyRoutine | null;
  eating: EatingPattern | null;
  // Step 4
  height: string;
  weight: string;
  age: string;
  sex: SexOption | null;
}

interface OnboardingContextValue {
  data: OnboardingData;
  setGoal: (goal: GoalId) => void;
  togglePreference: (id: PreferenceId) => void;
  setActivity: (val: ActivityLevel) => void;
  setSleep: (val: SleepQuality) => void;
  setRoutine: (val: DailyRoutine) => void;
  setEating: (val: EatingPattern) => void;
  setHeight: (val: string) => void;
  setWeight: (val: string) => void;
  setAge: (val: string) => void;
  setSex: (val: SexOption) => void;
  reset: () => void;
}

// ── Initial State ──────────────────────────────────────────────────────────

const initialData: OnboardingData = {
  goal: null,
  preferences: [],
  activity: null,
  sleep: null,
  routine: null,
  eating: null,
  height: '',
  weight: '',
  age: '',
  sex: null,
};

// ── Context ────────────────────────────────────────────────────────────────

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

// ── Provider ───────────────────────────────────────────────────────────────

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<OnboardingData>(initialData);

  const setGoal = (goal: GoalId) =>
    setData((prev) => ({ ...prev, goal }));

  const togglePreference = (id: PreferenceId) =>
    setData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(id)
        ? prev.preferences.filter((p) => p !== id)
        : [...prev.preferences, id],
    }));

  const setActivity = (activity: ActivityLevel) =>
    setData((prev) => ({ ...prev, activity }));

  const setSleep = (sleep: SleepQuality) =>
    setData((prev) => ({ ...prev, sleep }));

  const setRoutine = (routine: DailyRoutine) =>
    setData((prev) => ({ ...prev, routine }));

  const setEating = (eating: EatingPattern) =>
    setData((prev) => ({ ...prev, eating }));

  const setHeight = (height: string) =>
    setData((prev) => ({ ...prev, height }));

  const setWeight = (weight: string) =>
    setData((prev) => ({ ...prev, weight }));

  const setAge = (age: string) =>
    setData((prev) => ({ ...prev, age }));

  const setSex = (sex: SexOption) =>
    setData((prev) => ({ ...prev, sex }));

  const reset = () => setData(initialData);

  return (
    <OnboardingContext.Provider
      value={{
        data,
        setGoal,
        togglePreference,
        setActivity,
        setSleep,
        setRoutine,
        setEating,
        setHeight,
        setWeight,
        setAge,
        setSex,
        reset,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────────────────────────

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) {
    throw new Error('useOnboarding must be used inside <OnboardingProvider>');
  }
  return ctx;
}
