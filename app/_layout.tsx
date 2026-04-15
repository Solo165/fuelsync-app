import { Stack } from 'expo-router';
import { OnboardingProvider } from '@/hooks/useOnboarding';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OnboardingProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
      </OnboardingProvider>
    </GestureHandlerRootView>
  );
}
