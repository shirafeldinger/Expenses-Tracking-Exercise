import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ADD_OR_EDIT_EXPENSE} from '../constants/navigation';
import {AddOrEditScreenNavigationProp} from '../types/navigation';
import {addExpense, deleteExpense, setExpenses} from '../redux/slices/useSlice';

const useExpenses = (initialExpenses = []) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<AddOrEditScreenNavigationProp>();

  const sections = useSelector(state => state.expenses.sections);

  useEffect(() => {
    if (initialExpenses.length) {
      dispatch(setExpenses(initialExpenses));
    }
  }, [dispatch, initialExpenses]);

  const handleAddExpense = (dateKey, newExpense) => {
    dispatch(addExpense({dateKey, expense: newExpense}));
  };

  const handleDeleteExpense = (dateKey, expenseIndex) => {
    dispatch(deleteExpense({dateKey, expenseIndex}));
  };

  const handleEditExpense = (dateKey, expenseIndex) => {
    const expenseToEdit = sections.find(section => section.title === dateKey)
      ?.data[expenseIndex];

    if (expenseToEdit) {
      navigation.navigate(ADD_OR_EDIT_EXPENSE, {
        expense: expenseToEdit,
        isEditMode: true,
      });
    }
  };

  return {sections, handleAddExpense, handleDeleteExpense, handleEditExpense};
};

export default useExpenses;
