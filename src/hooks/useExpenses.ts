import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ExpenseSection} from '../types';
import {useNavigation} from '@react-navigation/native';
import {ADD_OR_EDIT_EXPENSE} from '../constants/navigation';
import {AddOrEditScreenNavigationProp} from '../types/navigation';

const useExpenses = () => {
  const [sections, setSections] = useState<ExpenseSection[]>([]);
  const navigation = useNavigation<AddOrEditScreenNavigationProp>();
  const fetchExpenses = async () => {
    try {
      const existingSections = await AsyncStorage.getItem('expenses');
      if (existingSections) {
        const parsedSections = JSON.parse(existingSections);
        setSections(parsedSections);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleDeleteExpense = async (dateKey: string, expenseIndex: number) => {
    try {
      const updatedSections = sections.map(section => {
        if (section.title === dateKey) {
          const updatedData = section.data.filter(
            (_, index) => index !== expenseIndex,
          );
          return {...section, data: updatedData};
        }
        return section;
      });

      const filteredSections = updatedSections.filter(
        section => section.data.length > 0,
      );

      setSections(filteredSections);
      await AsyncStorage.setItem('expenses', JSON.stringify(filteredSections));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleEditExpense = (dateKey: string, expenseIndex: number) => {
    const expenseToEdit = sections.find(section => section.title === dateKey)
      ?.data[expenseIndex];

    if (expenseToEdit) {
      navigation.navigate(ADD_OR_EDIT_EXPENSE, {
        expense: expenseToEdit,
        isEditMode: true,
      });
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [sections]);

  return {sections, handleDeleteExpense, handleEditExpense};
};

export default useExpenses;
