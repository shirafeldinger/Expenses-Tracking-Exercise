import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {GREEN, RED, WHITE} from '../../constants/colors';
import useExpenses from '../../hooks/useExpenses';
import {ExpenseItem, ExpenseSection} from '../../types';
import {formatCurrency} from '../../utils';
import {HOME_SCREEN_TEXTS} from '../../constants/texts';

type ListItemProps = {
  item: ExpenseItem;
  index: number;
  section: ExpenseSection;
};
const {listItem} = HOME_SCREEN_TEXTS;

const ListItem: React.FC<ListItemProps> = ({item, index, section}) => {
  const {handleDeleteExpense, handleEditExpense} = useExpenses();
  const showBorderBottom = index < section.data.length - 1;
  return (
    <View style={[styles.expenseItem, showBorderBottom && styles.border]}>
      <Text style={styles.expenseTitle}>{item.title}</Text>
      <Text style={styles.expenseAmount}>{formatCurrency(item.amount)}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEditExpense(section.title, index)}>
          <Text style={styles.editText}>{listItem.edit}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteExpense(section.title, index)}>
          <Text style={styles.deleteText}>{listItem.delete}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  expenseItem: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expenseTitle: {
    fontSize: 16,
  },
  expenseAmount: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    backgroundColor: GREEN,
    padding: 8,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: RED,
    padding: 8,
    borderRadius: 5,
  },
  editText: {
    color: WHITE,
    fontSize: 14,
  },
  deleteText: {
    color: WHITE,
    fontSize: 14,
  },
  border: {
    borderBottomWidth: 0.5,
  },
});

export default ListItem;
