import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { OnboardingStep } from '@/components/ui/OnboardingStep';
import { useOnboarding } from '@/hooks/useOnboarding';

export default function SummaryScreen() {
  const { data } = useOnboarding();

  const handleFinish = () => {
    router.push('/feed' as any);
  };

  // ─────────────────────────────────────────────
  // CLEAN PREFERENCES LOGIC
  // ─────────────────────────────────────────────

  const MAX_VISIBLE = 3;

  const cleanedPreferences = useMemo(() => {
    return Array.from(
      new Set(
        data.preferences
          .filter((p) => typeof p === 'string' && p.trim().length > 0)
          .map((p) => p.trim().toLowerCase())
      )
    ).sort();
  }, [data.preferences]);

  const overflowCount = Math.max(cleanedPreferences.length - MAX_VISIBLE, 0);

  // ─────────────────────────────────────────────
  // AUTO‑HEIGHT ANIMATION STATE
  // ─────────────────────────────────────────────

  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const animatedHeight = useState(new Animated.Value(0))[0];
  const animatedOpacity = useState(new Animated.Value(0))[0];
  const chevronRotation = useState(new Animated.Value(0))[0];

  const toggleExpand = () => {
    Haptics.selectionAsync();

    const toHeight = expanded ? 0 : contentHeight;
    const toOpacity = expanded ? 0 : 1;
    const toRotate = expanded ? 0 : 1;

    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue: toHeight,
        duration: 260,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(animatedOpacity, {
        toValue: toOpacity,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(chevronRotation, {
        toValue: toRotate,
        duration: 260,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
    ]).start();

    setExpanded(!expanded);
  };

  const rotateInterpolate = chevronRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <OnboardingStep
      step={4}
      totalSteps={4}
      title="Summary"
      subtitle="Review your details before we personalize your meals."
      canContinue={true}
      onContinue={handleFinish}
    >
      <View style={styles.container}>

        {/* GOAL */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🎯</Text>
            <Text style={styles.sectionTitle}>Your Goal</Text>
          </View>

          <Text style={styles.valueLarge}>{formatGoal(data.goal)}</Text>
        </View>

        {/* PREFERENCES */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🍽️</Text>
            <Text style={styles.sectionTitle}>Your Preferences</Text>
          </View>

          <View style={styles.preferenceList}>

            {/* Always show first 3 */}
            {cleanedPreferences.slice(0, 3).map((pref) => {
              const icon = prefIcons[pref] ?? '•';
              const bg = prefColors[pref] ?? '#F0F0F0';

              return (
                <View key={pref} style={[styles.prefItem, { backgroundColor: bg }]}>
                  <Text style={styles.prefText}>
                    {icon} {formatPreference(pref)}
                  </Text>
                </View>
              );
            })}

            {/* Hidden measuring view */}
            <View
              style={{ position: 'absolute', opacity: 0, zIndex: -1 }}
              onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
            >
              {cleanedPreferences.slice(3).map((pref) => {
                const icon = prefIcons[pref] ?? '•';
                const bg = prefColors[pref] ?? '#F0F0F0';

                return (
                  <View key={pref} style={[styles.prefItem, { backgroundColor: bg }]}>
                    <Text style={styles.prefText}>
                      {icon} {formatPreference(pref)}
                    </Text>
                  </View>
                );
              })}
            </View>

            {/* Animated expanded section */}
            <Animated.View
              style={{
                overflow: 'hidden',
                height: animatedHeight,
                opacity: animatedOpacity,
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {cleanedPreferences.slice(3).map((pref) => {
                const icon = prefIcons[pref] ?? '•';
                const bg = prefColors[pref] ?? '#F0F0F0';

                return (
                  <View key={pref} style={[styles.prefItem, { backgroundColor: bg }]}>
                    <Text style={styles.prefText}>
                      {icon} {formatPreference(pref)}
                    </Text>
                  </View>
                );
              })}
            </Animated.View>

            {/* Expand / Collapse Button */}
            {cleanedPreferences.length > MAX_VISIBLE && (
              <Pressable
                onPress={toggleExpand}
                style={[
                  styles.prefItem,
                  {
                    backgroundColor: '#E0E0E0',
                    flexDirection: 'row',
                    alignItems: 'center',
                  },
                ]}
              >
                <Text style={styles.prefText}>
                  {expanded ? 'Show less' : `+${overflowCount} more`}
                </Text>

                <Animated.View
                  style={{
                    marginLeft: 6,
                    transform: [{ rotate: rotateInterpolate }],
                  }}
                >
                  <Text style={{ fontSize: 14 }}>⌄</Text>
                </Animated.View>
              </Pressable>
            )}
          </View>
        </View>

        {/* LIFESTYLE */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🧬</Text>
            <Text style={styles.sectionTitle}>Your Lifestyle</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Activity Level</Text>
            <Text style={styles.value}>{formatActivity(data.activity)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Sleep Quality</Text>
            <Text style={styles.value}>{formatSleep(data.sleep)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Daily Routine</Text>
            <Text style={styles.value}>{formatRoutine(data.routine)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Eating Pattern</Text>
            <Text style={styles.value}>{formatEating(data.eating)}</Text>
          </View>
        </View>

        {/* METRICS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📏</Text>
            <Text style={styles.sectionTitle}>Your Metrics</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Height</Text>
            <Text style={styles.value}>{data.height} cm</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Weight</Text>
            <Text style={styles.value}>{data.weight} kg</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Age</Text>
            <Text style={styles.value}>{data.age}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Sex</Text>
            <Text style={styles.value}>{formatSex(data.sex)}</Text>
          </View>
        </View>

      </View>
    </OnboardingStep>
  );
}

/* ───────────────────────────────────────────── */
/* FORMATTERS */
/* ───────────────────────────────────────────── */

function formatGoal(goal: string | null): string {
  const map: Record<string, string> = {
    lose: 'Lose Weight',
    gain: 'Gain Muscle',
    weight: 'Gain Weight',
    maintain: 'Maintain Weight',
    energy: 'Increase Energy',
    health: 'Improve Health',
  };
  return goal ? map[goal] ?? '—' : '—';
}

function formatPreference(pref: string | null): string {
  const map: Record<string, string> = {
    vegan: 'Vegan',
    vegetarian: 'Vegetarian',
    pescatarian: 'Pescatarian',
    lowcarb: 'Low Carb',
    highprotein: 'High Protein',
    balanced: 'Balanced Diet',
    dairyfree: 'Dairy-Free',
    glutenfree: 'Gluten-Free',
    nopork: 'No Pork',
    nobeef: 'No Beef',
    noseafood: 'No Seafood',
    highfiber: 'High Fiber',
  };
  return pref ? map[pref] ?? '—' : '—';
}

function formatActivity(val: string | null): string {
  const map: Record<string, string> = {
    sedentary: 'Sedentary',
    'lightly-active': 'Lightly Active',
    active: 'Active',
    'very-active': 'Very Active',
  };
  return val ? map[val] ?? '—' : '—';
}

function formatSleep(val: string | null): string {
  const map: Record<string, string> = {
    poor: 'Poor',
    fair: 'Fair',
    good: 'Good',
    excellent: 'Excellent',
  };
  return val ? map[val] ?? '—' : '—';
}

function formatRoutine(val: string | null): string {
  const map: Record<string, string> = {
    unstructured: 'Unstructured',
    flexible: 'Flexible',
    structured: 'Structured',
  };
  return val ? map[val] ?? '—' : '—';
}

function formatEating(val: string | null): string {
  const map: Record<string, string> = {
    irregular: 'Irregular',
    balanced: 'Balanced',
    strict: 'Strict Routine',
  };
  return val ? map[val] ?? '—' : '—';
}

function formatSex(val: string | null): string {
  const map: Record<string, string> = {
    male: 'Male',
    female: 'Female',
    none: 'Prefer not to say',
  };
  return val ? map[val] ?? '—' : '—';
}

/* ───────────────────────────────────────────── */
/* ICONS + COLORS FOR PREFERENCES */
/* ───────────────────────────────────────────── */

const prefIcons: Record<string, string> = {
  vegan: '🌱',
  vegetarian: '🥗',
  pescatarian: '🐟',
  lowcarb: '🥑',
  highprotein: '🍗',
  balanced: '⚖️',
  dairyfree: '🥛🚫',
  glutenfree: '🌾🚫',
  nopork: '🐖🚫',
  nobeef: '🐄🚫',
  noseafood: '🦐🚫',
  highfiber: '🌾',
};

const prefColors: Record<string, string> = {
  vegan: '#E8F5E9',
  vegetarian: '#F1F8E9',
  pescatarian: '#E3F2FD',
  lowcarb: '#FFF3E0',
  highprotein: '#FBE9E7',
  balanced: '#F5F5F5',
  dairyfree: '#FFFDE7',
  glutenfree: '#FFF8E1',
  nopork: '#F3E5F5',
  nobeef: '#EDE7F6',
  noseafood: '#E0F7FA',
  highfiber: '#F1F8E9',
};

/* ───────────────────────────────────────────── */
/* PREMIUM STYLES */
/* ───────────────────────────────────────────── */

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 28,
    paddingBottom: 40,
  },

  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  sectionIcon: {
    fontSize: 22,
    marginRight: 6,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

  preferenceList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },

  prefItem: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },

  prefText: {
    color: '#222',
    fontSize: 15,
    fontWeight: '500',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  label: {
    color: '#555',
    fontSize: 15,
  },

  value: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },

  valueLarge: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
    textAlign: 'center',
  },
});
