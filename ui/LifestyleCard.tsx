import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import * as Haptics from 'expo-haptics';

export function LifestyleCard({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const scale = useSharedValue(1);
  const highlight = useSharedValue(0);
  const glow = useSharedValue(0);
  const checkmark = useSharedValue(0);

  // ⭐ FIX: Move all animation writes into useEffect
  useEffect(() => {
    scale.value = withSpring(selected ? 0.96 : 1, {
      damping: 18,
      stiffness: 260,
    });

    highlight.value = withTiming(selected ? 1 : 0, { duration: 200 });
    glow.value = withTiming(selected ? 1 : 0, { duration: 250 });
    checkmark.value = withTiming(selected ? 1 : 0, { duration: 220 });
  }, [selected]);

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const highlightStyle = useAnimatedStyle(() => ({
    opacity: highlight.value,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
  }));

  const checkmarkStyle = useAnimatedStyle(() => ({
    opacity: checkmark.value,
    transform: [{ translateY: selected ? 0 : -4 }],
  }));

  const handlePress = () => {
    Haptics.selectionAsync();
    onSelect();
  };

  return (
    <Animated.View style={[styles.wrapper, scaleStyle]}>
      <Animated.View style={[styles.glow, glowStyle]} />

      <TouchableOpacity
        style={[styles.card, selected && styles.cardSelected]}
        onPress={handlePress}
        activeOpacity={0.9}
      >
        <Animated.View style={[styles.highlight, highlightStyle]} />

        {/* CHECKMARK */}
        <Animated.View style={[styles.checkmarkContainer, checkmarkStyle]}>
          <View style={styles.checkmarkCircle}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        </Animated.View>

        <Text style={[styles.label, selected && styles.labelSelected]}>
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
    position: 'relative',
  },
  glow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.18)',
    borderRadius: 16,
    zIndex: -1,
  },
  card: {
    padding: 18,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    overflow: 'hidden',
  },
  cardSelected: {
    backgroundColor: '#000',
  },
  highlight: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  checkmarkContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  checkmarkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  labelSelected: {
    color: '#fff',
  },
});