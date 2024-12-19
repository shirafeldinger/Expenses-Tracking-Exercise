import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const App = () => {
  const [userName, setUserName] = useState<string>('');
  const [isReady, setIsReady] = useState<boolean>(false);
  useEffect(() => {
    const checkName = async () => {
      const name = await AsyncStorage.getItem('fullName');
      if (name) {
        setUserName(name);
      }
      setIsReady(true);
    };
    checkName();
  }, []);

  if (!isReady) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={userName.length === 0 ? 'Welcome' : 'HomeTabs'}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            title: `Welcome, ${userName}`,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
