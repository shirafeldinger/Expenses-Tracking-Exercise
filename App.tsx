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
  ADD_OR_EDIT_EXPENSE,
  BLANK_SCREEN,
  DEFAULT_BOTTOM_BAR_STYLE,
  HOME_TAB_SCREEN,
  MAIN_TABS,
  PROFILE_SCREEN,
  WELCOME_SCREEN,
} from './src/constants/navigation';
import {useUserStatus} from './src/hooks/useUserStatus';
import AddExpenseIcon from './src/components/AddExpenseTabIcon';
import {NOOP} from './src/utils';
import AddOrEditExpense from './src/screens/AddOrEditExpense';
import {Provider} from 'react-redux';
import store, {persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const {userName} = useUserStatus();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={HOME_TAB_SCREEN}
        component={HomeScreen}
        options={{
          tabBarLabel: HOME_TAB_SCREEN,
          title: userName,
          headerTitleAlign: 'center',
          ...DEFAULT_BOTTOM_BAR_STYLE,
        }}
      />
      <Tab.Screen
        name={BLANK_SCREEN}
        component={NOOP}
        options={{
          tabBarLabel: '',
          tabBarIcon: AddExpenseIcon,
          tabBarIconStyle: {marginBottom: 30},
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate(ADD_OR_EDIT_EXPENSE);
          },
        })}
      />
      <Tab.Screen
        name={PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          headerShown: false,
          ...DEFAULT_BOTTOM_BAR_STYLE,
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const {userName, isReady} = useUserStatus();

  const initialRouteName = userName.length === 0 ? WELCOME_SCREEN : MAIN_TABS;

  if (!isReady) {
    return <ActivityIndicator size="large" color={PURPLE} />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
              name={MAIN_TABS}
              component={MainTabNavigator}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={ADD_OR_EDIT_EXPENSE}
              options={{
                headerShown: false,
                presentation: 'modal',
              }}
              component={AddOrEditExpense}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
