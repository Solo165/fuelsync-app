import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';

export default function WelcomeScreen() {
  const handleStart = () => {
    Haptics.selectionAsync();
    router.push('/onboarding/goals');
  };

  return (
    <View style={styles.container}>

      {/* Logo + Text */}
      <View style={styles.topSection}>
        <Image
          source={require('../../assets/images/fuelsync.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Fuel Your Body Sync Your Meals</Text>

        <Text style={styles.subtitle}>
          Personalized meals built around your metabolism and lifestyle.
        </Text>
      </View>

      {/* Spacer pushes button down */}
      <View style={{ flex: 1 }} />

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 200,     // moves everything up slightly
  },

  topSection: {
    alignItems: 'center',
    marginTop: 0,      // controls how high the logo + text sit
  },

  logo: {
  width: 1100,
  height: undefined,
  aspectRatio: 4,
  marginBottom: -45,
},

  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  button: {
    backgroundColor: '#000',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 50,   // matches your screenshot spacing
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});