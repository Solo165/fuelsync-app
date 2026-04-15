import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

interface OnboardingStepProps {
  step: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  canContinue: boolean;
  onContinue: () => void;
}

export function OnboardingStep({
  step,
  totalSteps,
  title,
  subtitle,
  children,
  canContinue,
  onContinue,
}: OnboardingStepProps) {
  const insets = useSafeAreaInsets();
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>

      {/* HEADER */}
      <View
        style={styles.header}
        onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
      >
        <Text style={styles.stepText}>
          Step {step} of {totalSteps}
        </Text>

        <Text style={styles.title}>{title}</Text>

        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
      </View>

      {/* TOP FADE */}
      <LinearGradient
        pointerEvents="none"
        colors={['#F7F7F7', 'rgba(247,247,247,0)']}
        style={[styles.topFade, { top: headerHeight + insets.top + 40 }]}
      />

      {/* CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {children}
      </ScrollView>

      {/* BOTTOM FADE */}
      <LinearGradient
        pointerEvents="none"
        colors={['rgba(247,247,247,0)', '#F7F7F7']}
        style={[
          styles.bottomFade,
          { bottom: insets.bottom + 80 }
        ]}
      />

      {/* FOOTER */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: canContinue ? '#000' : '#D9D9D9', // ← FIXED
            },
          ]}
          disabled={!canContinue}
          onPress={onContinue}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
}

/* ───────────────────────────────────────────── */
/* STYLES — premium layout + dynamic fades       */
/* ───────────────────────────────────────────── */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 24,
  },

  header: {
    alignItems: 'center',
    marginBottom: 24,
  },

  stepText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    fontWeight: '500',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    paddingHorizontal: 24,
    lineHeight: 22,
  },

  scrollContent: {
    paddingBottom: 0,
    paddingTop: 10,
  },

  topFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 20,
    zIndex: 5,
  },

  bottomFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 20,
    zIndex: 5,
  },

  footer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },

  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
