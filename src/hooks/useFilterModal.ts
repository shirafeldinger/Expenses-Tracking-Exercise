import { useState } from 'react';
import { ExpenseSection } from '../types';
import { compareDatesByDay } from '../utils';

const useFilterModal = (sections: ExpenseSection[]) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());

  // Function to filter sections
  const filterSections = () => {
    let filtered = [...sections];

    // Filter by title (exact match)
    if (title) {
      filtered = filtered.map((section) => {
        const filteredData = section.data.filter((expense) => {
          const normalizedTitle = expense.title.trim().toLowerCase();
          const normalizedFilterTitle = title.trim().toLowerCase();
          return normalizedTitle === normalizedFilterTitle; // Strict match
        });

        return filteredData.length > 0 ? { ...section, data: filteredData } : null;
      }).filter(Boolean); // Remove sections with no matching data
    }

    // Filter by amount (show all items with the matching amount)
    if (amount) {
      const amountValue = parseFloat(amount);
      if (!isNaN(amountValue)) {
        filtered = filtered.map((section) => {
          // Filter only the data for each section that matches the amount
          const filteredData = section.data.filter(
            (expense) => expense.amount === amountValue
          );

          // If the section has matching items, we return it with the filtered data
          return filteredData.length > 0 ? { ...section, data: filteredData } : null;
        }).filter(Boolean); // Remove sections with no matching data
      }
    }

    // Filter by date (keep matching items based on the date)
    if (date) {
      filtered = filtered.map((section) => {
        const filteredData = section.data.filter((expense) =>
          compareDatesByDay(expense.date, date)
        );

        return filteredData.length > 0 ? { ...section, data: filteredData } : null;
      }).filter(Boolean); // Remove sections with no matching data
    }

    return filtered;
  };

  // Get filtered sections whenever needed
  const filteredSections = filterSections();

  return {
    title,
    setTitle,
    amount,
    setAmount,
    date,
    setDate,
    filteredSections,
  };
};

export default useFilterModal;
