import React from 'react';
import {View, Text, SectionList, StyleSheet} from 'react-native';
import {SECTION_HEADER_BACKGROUND, WHITE} from '../constants/colors';
import {HOME_SCREEN_TEXTS} from '../constants/texts';
import {totalExpensesCalculation} from '../utils/home';
import {formatDate} from '../utils/addExpense';
import EmptyList from '../components/Home/EmptyList';
import useExpenses from '../hooks/useExpenses';
import ListItem from '../components/Home/ListItem';
import {addCommaAndDotToPrice} from '../utils';

const {totalExpenses} = HOME_SCREEN_TEXTS;

const HomeScreen = () => {
  const {sections} = useExpenses();
  const totalPrice = totalExpensesCalculation(sections);
  return (
    <View style={styles.container}>
      <View style={styles.totalContainer}>
        <Text style={styles.total}>{totalExpenses}</Text>
        <Text style={styles.totalAmount}>
          ${addCommaAndDotToPrice(totalPrice)}
        </Text>
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({item, index, section}) => (
          <ListItem item={item} index={index} section={section} />
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.dateHeader}>{formatDate(title)}</Text>
        )}
        ListEmptyComponent={EmptyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: WHITE},
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
