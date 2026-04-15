// ui/CategoryBlock.tsx
import { View, Text, StyleSheet } from 'react-native';
import { LifestyleCard } from './LifestyleCard';

export function CategoryBlock({
  icon,
  title,
  description,
  options,
  selectedValue,
  onSelect,
}: {
  icon: string;
  title: string;
  description: string;
  options: { id: string; label: string }[];
  selectedValue: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <View style={styles.block}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {options.map((opt) => (
        <LifestyleCard
          key={opt.id}
          label={opt.label}
          selected={selectedValue === opt.id}
          onSelect={() => onSelect(opt.id)}
        />
      ))}

      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginBottom: 32,
  },
  icon: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginTop: 20,
  },
});