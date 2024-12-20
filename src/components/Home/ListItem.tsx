import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RED, WHITE} from '../../constants/colors';
import useExpenses from '../../hooks/useExpenses';
import {ExpenseItem, ExpenseSection} from '../../types';

type ListItemProps = {
  item: ExpenseItem;
  index: number;
  section: ExpenseSection;
};

const ListItem: React.FC<ListItemProps> = ({item, index, section}) => {
  const {handleDeleteExpense} = useExpenses();

  return (
    <View style={styles.expenseItem}>
      <Text style={styles.expenseTitle}>{item.title}</Text>
      <Text style={styles.expenseAmount}>${item.amount.toFixed(2)}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteExpense(section.title, index)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  expenseItem: {
    padding: 16,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expenseTitle: {
    fontSize: 16,
  },
  expenseAmount: {
    fontSize: 16,
  },
  deleteText: {
    color: WHITE,
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: RED,
    padding: 8,
    borderRadius: 5,
  },
});

export default ListItem;
