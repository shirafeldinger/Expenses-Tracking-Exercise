import AsyncStorage from '@react-native-async-storage/async-storage';
import {ExpenseItem, ExpenseSection} from '../types';

export const saveExpense = async (newExpense: ExpenseItem) => {
  try {
    const existingSections = await AsyncStorage.getItem('expenses');
    const sections = existingSections
      ? (JSON.parse(existingSections) as ExpenseSection[])
      : [];

    const sectionIndex = sections.findIndex(
      section => section.title === newExpense.date,
    );

    if (sectionIndex !== -1) {
      // Add the new expense to the existing section
      sections[sectionIndex].data.push(newExpense);
    } else {
      // Create a new section for this date
      sections.push({title: newExpense.date, data: [newExpense]});
    }

    // Save updated sections back to AsyncStorage
    await AsyncStorage.setItem('expenses', JSON.stringify(sections));
  } catch (error) {
    console.error(error);
  }
};

export const formatDate = (date: string) => {
  const parsedDate = new Date(date);
  const day = String(parsedDate.getDate()).padStart(2, '0');
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = parsedDate.getFullYear();
  return `${day}.${month}.${year}`;
};

export const updateExpense = async (
  updatedExpense: ExpenseItem,
  oldExpense: ExpenseItem,
) => {
  try {
    const existingSections = await AsyncStorage.getItem('expenses');
    const sections = existingSections
      ? (JSON.parse(existingSections) as ExpenseSection[])
      : [];

    const sectionIndex = sections.findIndex(
      section => section.title === oldExpense.date,
    );

    if (sectionIndex !== -1) {
      const expenseIndex = sections[sectionIndex].data.findIndex(
        expense => expense.title === oldExpense.title,
      );

      if (expenseIndex !== -1) {
        sections[sectionIndex].data[expenseIndex] = {
          ...sections[sectionIndex].data[expenseIndex],
          ...updatedExpense,
        };
      }
    }

    // Save updated sections back to AsyncStorage
    await AsyncStorage.setItem('expenses', JSON.stringify(sections));
  } catch (error) {
    console.error('Error updating expense:', error);
  }
};
