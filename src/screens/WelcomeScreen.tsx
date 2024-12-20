import React, {useState} from 'react';
import {View, Text, TextInput, Alert, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
import {WELCOME_SCREEN_TEXTS} from '../constants/texts';
import {PURPLE} from '../constants/colors';
import {WelcomeScreenNavigationProp} from '../types/navigation';
import { MAIN_TABS } from '../constants/navigation';

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}
const {heading, subHeading, button, input} = WELCOME_SCREEN_TEXTS;

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
  const [fullName, setFullName] = useState<string>('');
  const handleSubmit = async () => {
    if (fullName.trim()) {
      await AsyncStorage.setItem('fullName', fullName);
      navigation.replace(MAIN_TABS);
    } else {
      Alert.alert('Error', 'Please enter your full name.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.subHeading}>{subHeading}</Text>
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder={input}
        style={styles.input}
      />
      <Button text={button} onPress={handleSubmit} />
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
    borderColor: PURPLE,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 5,
  },
});

export default WelcomeScreen;
