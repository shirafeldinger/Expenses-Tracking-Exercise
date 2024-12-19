// src/screens/WelcomeScreen.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const navigateToHome = () => {
    navigation.reset({
        index: 0, // Set the index of the screen to the first screen in the stack, : We set the HomeTabs as the first screen in the stack
        routes: [{ name: 'HomeTabs' }], // Define the new stack with only HomeTabs
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the App!</Text>
      <Button title="Go to Home" onPress={navigateToHome} />
    </View>
  );
};

export default WelcomeScreen;
