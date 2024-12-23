import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {updateExpense} from '../redux/slices/useSlice';
import useExpenses from './useExpenses';

const useAddOrEditExpense = (isEditMode: boolean, expense?: any) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const {handleAddExpense} = useExpenses();

  useEffect(() => {
    if (isEditMode && expense) {
      setTitle(expense.title);
      setAmount(expense.amount.toString());
      setDate(new Date(expense.date));
    }
  }, [isEditMode, expense]);

  const handleSave = (navigation: any) => {
    const isNotFormValid = !title || !amount || !date;
    if (isNotFormValid) {
      return;
    }

    const newExpense = createNewExpense();

    if (isEditMode) {
      dispatch(
        updateExpense({updatedExpense: newExpense, oldExpense: expense}),
      );
    } else {
      handleAddExpense(date.toString(), newExpense);
    }
    resetForm();
    navigation.goBack();
  };

  const createNewExpense = () => {
    const parsedAmount = parseFloat(amount);
    const dateString = date.toString();
    return {title, amount: parsedAmount, date: dateString};
  };

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setDate(new Date());
  };

  return {
    title,
    setTitle,
    amount,
    setAmount,
    date,
    setDate,
    handleSave,
  };
};

export default useAddOrEditExpense;