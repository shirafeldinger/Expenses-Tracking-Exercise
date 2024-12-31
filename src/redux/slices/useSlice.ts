import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExpenseItem, ExpenseSection } from '../../types';

interface ExpenseState {
  sections: ExpenseSection[];
}

const initialState: ExpenseState = {
  sections: [],
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      const {dateKey, expense} = action.payload;

      const sectionIndex = state.sections.findIndex(section =>
        section.title === dateKey,
      );
      if (sectionIndex !== -1) {
        state.sections[sectionIndex].data.push(expense);
      } else {
        state.sections.push({title: dateKey, data: [expense]});
      }
    },
    setExpenses: (state, action) => {
      state.sections = action.payload;
    },
    deleteExpense: (
      state,
      action: PayloadAction<{dateKey: string; expenseIndex: number}>,
    ) => {
      const {dateKey, expenseIndex} = action.payload;

      state.sections = state.sections.map(section => {
        if (section.title === dateKey) {
          const updatedData = section.data.filter(
            (_, index) => index !== expenseIndex,
          );
          return {...section, data: updatedData};
        }
        return section;
      });

      state.sections = state.sections.filter(
        section => section.data.length > 0,
      );
    },
    updateExpense: (
      state,
      action: PayloadAction<{
        updatedExpense: ExpenseItem;
        oldExpense: ExpenseItem;
      }>,
    ) => {
      const { updatedExpense, oldExpense } = action.payload;
    
      // Check if the date of the expense has changed
      if (updatedExpense.date !== oldExpense.date) {
        // 1. Remove the old expense from the old section
        const oldSectionIndex = state.sections.findIndex(
          section => section.title === oldExpense.date,
        );
        if (oldSectionIndex !== -1) {
          const oldExpenseIndex = state.sections[oldSectionIndex].data.findIndex(
            expense => expense.title === oldExpense.title,
          );
          if (oldExpenseIndex !== -1) {
            state.sections[oldSectionIndex].data.splice(oldExpenseIndex, 1);
            
            // 2. Remove the section if it's empty
            if (state.sections[oldSectionIndex].data.length === 0) {
              state.sections.splice(oldSectionIndex, 1);
            }
          }
        }
    
        // 3. Check if the section with the new date exists
        const newSectionIndex = state.sections.findIndex(
          section => section.title === updatedExpense.date,
        );
    
        if (newSectionIndex === -1) {
          // If the section for the new date doesn't exist, create a new one
          state.sections.push({
            title: updatedExpense.date, // Set the title of the new section to the updated date
            data: [updatedExpense], // Add the updated expense to the new section
          });
        } else {
          // If the section for the new date exists, add the updated expense to it
          state.sections[newSectionIndex].data.push(updatedExpense);
        }
      } else {
        // If the date hasn't changed, update the expense within the same section
        const sectionIndex = state.sections.findIndex(
          section => section.title === oldExpense.date,
        );
        if (sectionIndex !== -1) {
          const expenseIndex = state.sections[sectionIndex].data.findIndex(
            expense => expense.title === oldExpense.title,
          );
          if (expenseIndex !== -1) {
            state.sections[sectionIndex].data[expenseIndex] = {
              ...updatedExpense,
            };
          }
        }
      }
    },
    
    resetState: () => initialState,
  },
});

export const {
  setExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
  resetState,
} = expenseSlice.actions;
export default expenseSlice.reducer;
