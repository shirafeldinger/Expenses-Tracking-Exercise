import React from 'react';
import {View, Text, SectionList, StyleSheet} from 'react-native';
import {SECTION_HEADER_BACKGROUND, WHITE} from '../constants/colors';
import {HOME_SCREEN_TEXTS} from '../constants/texts';

const {totalExpenses} = HOME_SCREEN_TEXTS;
const HomeScreen = () => {
  const sections = [
    {
      title: '2024-12-18', // Section header
      data: [
        {title: 'Groceries', amount: 50}, // Items for this section
      ],
    },
    {
      title: '2024-12-19', // Another section header
      data: [
        {title: 'Coffee', amount: 5}, // Items for this section
      ],
    },
  ];
  const totalExpensesCalculation = sections
    .reduce(
      (total, section) =>
        total +
        section.data.reduce(
          (sectionTotal, item) => sectionTotal + item.amount,
          0,
        ),
      0,
    )
    .toFixed(2);

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = parsedDate.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.totalContainer}>
        <Text style={styles.total}>{totalExpenses}</Text>
        <Text style={styles.totalAmount}>${totalExpensesCalculation}</Text>
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.title + index}
        renderItem={({item}) => (
          <View style={styles.expenseItem}>
            <Text style={styles.expenseTitle}>{item.title}</Text>
            <Text style={styles.expenseAmount}>${item.amount.toFixed(2)}</Text>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.dateHeader}>{formatDate(title)}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: WHITE},
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
  dateHeader: {
    fontSize: 14,
    backgroundColor: SECTION_HEADER_BACKGROUND,
    padding: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 5,
  },
  total: {
    fontSize: 16,
    fontWeight: '700',
  },
  totalAmount: {
    fontSize: 18,
  },
});

export default HomeScreen;
