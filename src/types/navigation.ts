import {StackNavigationProp} from '@react-navigation/stack';
import {ExpenseItem} from '.';
import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Welcome: undefined;
  MainTabs: undefined;
  AddOrEditExpense: {expense: ExpenseItem; isEditMode: boolean};
};

export type AddOrEditScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddOrEditExpense'
>;
export type AddOrEditScreenRouteProp = RouteProp<
  RootStackParamList,
  'AddOrEditExpense'
>;

export type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Welcome'
>;
