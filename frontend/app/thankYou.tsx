// app/thank-you.tsx
import { View, Text, StyleSheet, Button } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { colorScheme } from 'react-native-css-interop';

const colors = Colors[(colorScheme.get?.() ?? 'light') as 'light' | 'dark'];

export default function ThankYou() {
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ title: 'Thank You' }} />
      <Text style={[styles.text, { color: colors.text }]}>Thank you for filling out the form!</Text>
      <Button
        title="Back to Home"
        onPress={() => router.push('/')}
        color={colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});