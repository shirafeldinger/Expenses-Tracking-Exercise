import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState<string>('');
  const navigateToHome = () => {
    navigation.reset({
        index: 0, // Set the index of the screen to the first screen in the stack, : We set the HomeTabs as the first screen in the stack
        routes: [{ name: 'HomeTabs' }], // Define the new stack with only HomeTabs
      });
  };

  const handleSubmit = async () => {
    if (fullName.trim()) {
      await AsyncStorage.setItem('fullName', fullName);
      navigateToHome();
    } else {
      Alert.alert('Error', 'Please enter your full name.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to the App!</Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Please enter your full name:</Text>
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Full Name"
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
          width: '100%',
          borderRadius: 5,
        }}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default WelcomeScreen;
