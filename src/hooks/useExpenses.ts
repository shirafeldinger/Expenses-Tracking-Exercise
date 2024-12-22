import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ADD_OR_EDIT_EXPENSE} from '../constants/navigation';
import {AddOrEditScreenNavigationProp} from '../types/navigation';
import {addExpense, deleteExpense} from '../redux/slices/useSlice';
import {ExpenseItem, ExpenseSection} from '../types';

const useExpenses = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<AddOrEditScreenNavigationProp>();

  const sections = useSelector(
    (state: {expenses: {sections: ExpenseSection[]}}) =>
      state.expenses.sections,
  );

  const handleAddExpense = (dateKey: string, newExpense: ExpenseItem): void => {
    dispatch(addExpense({dateKey, expense: newExpense}));
  };

  const handleDeleteExpense = (dateKey: string, expenseIndex: number): void => {
    dispatch(deleteExpense({dateKey, expenseIndex}));
  };

  const handleEditExpense = (dateKey: string, expenseIndex: number): void => {
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
