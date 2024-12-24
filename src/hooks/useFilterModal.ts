import {useState} from 'react';
import {ExpenseSection} from '../types';
import {compareDatesByDay} from '../utils';

const useFilterModal = (sections: ExpenseSection[]) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const filterSections = () => {
    let filteredData = sections.flatMap(section =>
      section.data.map(expense => ({
        ...expense,
        sectionTitle: section.title, // Preserve section title for later
      })),
    );


    if (title) {
      filteredData = filteredData.filter(expense => {
        const normalizedTitle = expense.title.trim().toLowerCase();
        const normalizedFilterTitle = title.trim().toLowerCase();                
        return normalizedTitle.includes(normalizedFilterTitle); // Use includes for partial matching
      });
    }
    

    if (amount) {
      const amountValue = parseFloat(amount);
      if (!isNaN(amountValue)) {
        filteredData = filteredData.filter(
          expense => expense.amount === amountValue,
        );
      }
    }

    if (date) {
      filteredData = filteredData.filter(expense =>
        compareDatesByDay(expense.date, date),
      );
    }    
    const filteredSections = sections
      .map(section => {
        const sectionData = filteredData.filter(
          expense => expense.sectionTitle === section.title,
        );

        return {
          ...section,
          data: sectionData,
        };
      })
      .filter(section => section.data.length > 0);

    return filteredSections;
  };

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
