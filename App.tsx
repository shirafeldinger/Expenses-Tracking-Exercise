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
  ADD_EXPENSE,
  BlankScreen,
  HOME_TAB_SCREEN,
  HOME_TABS,
  PROFILE_SCREEN,
  WELCOME_SCREEN,
} from './src/constants/navigation';
import {useUserStatus} from './src/hooks/useUserStatus';
import AddExpense from './src/screens/AddExpense';
import AddExpenseIcon from './src/components/AddExpenseTabIcon';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  const {userName} = useUserStatus();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={HOME_TAB_SCREEN}
        component={HomeScreen}
        options={{
          tabBarLabel: HOME_TAB_SCREEN,
          title: `Welcome, ${userName}`,
        }}
      />
      <Tab.Screen
        name={'blank'}
        component={BlankScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: AddExpenseIcon,
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate(ADD_EXPENSE);
          },
        })}
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
};

const App = () => {
  const {userName, isReady} = useUserStatus();

  const initialRouteName = userName.length === 0 ? WELCOME_SCREEN : HOME_TABS;

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
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={ADD_EXPENSE}
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
          component={AddExpense}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
