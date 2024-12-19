import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import {ActivityIndicator} from 'react-native';
import {PURPLE} from './src/constants/colors';
import {
  HOME_TAB_SCREEN,
  HOME_TABS,
  PROFILE_SCREEN,
  WELCOME_SCREEN,
} from './src/constants/navigation';
import {useUserStatus} from './src/hooks/useUserStatus';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator>
    <Tab.Screen
      name={HOME_TAB_SCREEN}
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Tab.Screen
      name={PROFILE_SCREEN}
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  const {userName, isReady} = useUserStatus();

  const initialRouteName =
    userName.length === 0 ? WELCOME_SCREEN : HOME_TAB_SCREEN;

  if (!isReady) {
    return <ActivityIndicator size="large" color={PURPLE} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
          name={WELCOME_SCREEN}
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={HOME_TABS}
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
