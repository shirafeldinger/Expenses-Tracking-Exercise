import React, {useEffect, useState} from 'react';
import {View, Text, SectionList, StyleSheet} from 'react-native';
import {SECTION_HEADER_BACKGROUND, WHITE} from '../constants/colors';
import {HOME_SCREEN_TEXTS} from '../constants/texts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {totalExpensesCalculation} from '../utils/home';
import {formatDate} from '../utils/addExpense';
import {ExpenseSection} from '../types';

const {totalExpenses} = HOME_SCREEN_TEXTS;
const HomeScreen = () => {
  const [sections, setSections] = useState<ExpenseSection[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const existingSections = await AsyncStorage.getItem('expenses');
        if (existingSections) {
          const parsedSections = JSON.parse(existingSections);
          setSections(parsedSections);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchExpenses();
  }, [sections]);

  return (
    <View style={styles.container}>
      <View style={styles.totalContainer}>
        <Text style={styles.total}>{totalExpenses}</Text>
        <Text style={styles.totalAmount}>
          ${totalExpensesCalculation(sections)}
        </Text>
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
