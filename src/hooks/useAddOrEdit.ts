import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateExpense } from '../redux/slices/useSlice';
import useExpenses from './useExpenses';

const useAddOrEditExpense = (isEditMode: boolean, expense?: any) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const dispatch = useDispatch();
  const {handleAddExpense} = useExpenses();
  const [errors, setErrors] = useState({
    title: '',
    amount: '',
  });

  useEffect(() => {
    if (isEditMode && expense) {
      setTitle(expense.title);
      setAmount(expense.amount.toString());
      setDate(expense.date);
    }
  }, [isEditMode, expense]);
  const validateAmount = (value: string) => {
    const regex = /^\d+(\.\d+)?$/;
    return regex.test(value.trim());
  };
  const validateFields = () => {
    const newErrors = {
      title: title ? '' : 'Title is required',
      amount: validateAmount(amount)
        ? ''
        : 'Amount is required and must be a valid number',
    };

    setErrors(newErrors);

    return !newErrors.title && !newErrors.amount;
  };

  const clearError = (field: keyof typeof errors) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: '',
    }));
  };
  const handleSave = (navigation: any) => {
    const isFormValid = validateFields();

    if (!isFormValid && !isEditMode) return;

    const newExpense = createNewExpense();

    if (isEditMode) {
      
      dispatch(
        updateExpense({updatedExpense: newExpense, oldExpense: expense}),
      );
    } else {
      handleAddExpense(date, newExpense);
    }
    resetForm();
    navigation.goBack();
  };

  const createNewExpense = () => {
    const parsedAmount = parseFloat(amount);

    return {title, amount: parsedAmount, date};
  };

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setDate('');
  };

  return {
    title,
    setTitle,
    amount,
    setAmount,
    date,
    setDate,
    handleSave,
    errors,
    clearError,
  };
};

export default useAddOrEditExpense;
