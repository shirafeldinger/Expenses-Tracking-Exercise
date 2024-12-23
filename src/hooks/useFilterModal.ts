import {useState, useMemo} from 'react';
import {ExpenseSection} from '../types';
import {compareDatesByDay} from '../utils';

const useFilterModal = (sections: ExpenseSection[]) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());

  const filteredSections = useMemo(() => {
    let filtered = [...sections];

    if (title) {
      filtered = filtered.filter(
        section => section.data[0].title.toLowerCase() === title.toLowerCase(),
      );
    }

    if (amount) {
      const amountValue = parseFloat(amount);
      if (!isNaN(amountValue)) {
        filtered = filtered.filter(section =>
          section.data.some(expense => expense.amount === amountValue),
        );
      }
    }

    if (date) {
      filtered = filtered.filter(section =>
        section.data.some(expense => compareDatesByDay(expense.date, date)),
      );
    }

    return filtered;
  }, [sections, title, amount, date]);

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
