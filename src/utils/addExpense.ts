import AsyncStorage from '@react-native-async-storage/async-storage';
import {NewExpense} from '../types';

export const saveExpense = async (newExpense: NewExpense) => {
  try {
    const existingSections = await AsyncStorage.getItem('expenses');
    const sections = existingSections ? JSON.parse(existingSections) : [];

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
