import React, { useEffect, useState } from 'react';
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import EmptyList from '../components/Home/EmptyList';
import FilterModal from '../components/Home/FilterModal';
import ListItem from '../components/Home/ListItem';
import {
  LIGHT_GREY,
  SECTION_HEADER_BACKGROUND,
  WHITE,
} from '../constants/colors';
import { HOME_SCREEN_TEXTS } from '../constants/texts';
import { RootState } from '../redux/store';
import { ExpenseSection } from '../types';
import { formatCurrency } from '../utils';
import { totalExpensesCalculation } from '../utils/home';

const {totalExpenses, filters} = HOME_SCREEN_TEXTS;

const HomeScreen = () => {
  const sections = useSelector((state: RootState) => state.expenses.sections);
  const [filteredSections, setFilteredSections] = useState(sections);
  const [isModalVisible, setModalVisible] = useState(false);

  console.log(sections);
  

  useEffect(() => {
    setFilteredSections(sections);
  }, [sections]);

  const totalPrice = totalExpensesCalculation(sections);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const applyFilters = (newFilteredSections: ExpenseSection[]) => {
    setFilteredSections(newFilteredSections);
  };
  return (
    <View style={styles.container}>
      <View style={styles.totalContainer}>
        <Text style={styles.total}>{totalExpenses}</Text>
        <Text style={styles.totalAmount}>{formatCurrency(totalPrice)}</Text>
      </View>

      <TouchableOpacity onPress={toggleModal} style={styles.filterButton}>
        <Text style={styles.filterButtonText}>{filters}</Text>
      </TouchableOpacity>

      <SectionList
        sections={filteredSections}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({item, index, section}) => (
          <ListItem item={item} index={index} section={section} />
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.dateHeader}>{title}</Text>
        )}
        ListEmptyComponent={EmptyList}
      />

      <FilterModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        sections={sections}
        setFilteredSections={applyFilters}
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
  filterButton: {
    width: 60,
    backgroundColor: LIGHT_GREY,
    height: 28,
    borderRadius: 60,
    margin: 10,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default HomeScreen;
