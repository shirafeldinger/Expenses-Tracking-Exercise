import React, {useState} from 'react';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SECTION_HEADER_BACKGROUND, WHITE} from '../constants/colors';
import {HOME_SCREEN_TEXTS} from '../constants/texts';
import {totalExpensesCalculation} from '../utils/home';
import {formatDate} from '../utils/addExpense';
import EmptyList from '../components/Home/EmptyList';
import ListItem from '../components/Home/ListItem';
import {addCommaAndDotToPrice} from '../utils';
import FilterModal from '../components/Home/FilterModal';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

const {totalExpenses} = HOME_SCREEN_TEXTS;

const HomeScreen = () => {
  const sections = useSelector((state: RootState) => state.expenses.sections);
  const [filteredSections, setFilteredSections] = useState(sections);

  const totalPrice = totalExpensesCalculation(filteredSections);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const applyFilters = newFilteredSections => {
    setFilteredSections(newFilteredSections);
  };
  return (
    <View style={styles.container}>
      <View style={styles.totalContainer}>
        <Text style={styles.total}>{totalExpenses}</Text>
        <Text style={styles.totalAmount}>
          {addCommaAndDotToPrice(totalPrice)}
        </Text>
      </View>

      <TouchableOpacity onPress={toggleModal} style={styles.filterButton}>
        <Text style={styles.filterButtonText}>Open Modal</Text>
      </TouchableOpacity>

      <SectionList
        sections={filteredSections}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({item, index, section}) => (
          <ListItem item={item} index={index} section={section} />
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.dateHeader}>{formatDate(title)}</Text>
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
    padding: 10,
    backgroundColor: '#008CBA',
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
