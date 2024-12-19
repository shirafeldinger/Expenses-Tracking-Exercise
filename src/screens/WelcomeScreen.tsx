import React, {useState} from 'react';
import {View, Text, Button, TextInput, Alert, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = ({navigation}) => {
  const [fullName, setFullName] = useState<string>('');

  const handleSubmit = async () => {
    if (fullName.trim()) {
      await AsyncStorage.setItem('fullName', fullName);
      // Ensure the navigation.replace works as expected
      navigation.replace('HomeTabs');
    } else {
      Alert.alert('Error', 'Please enter your full name.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to the App!</Text>
      <Text style={styles.subHeading}>Please enter your full name:</Text>
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Full Name"
        style={styles.input}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 5,
  },
});

export default WelcomeScreen;
