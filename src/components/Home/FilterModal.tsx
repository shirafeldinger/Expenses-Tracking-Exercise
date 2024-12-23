import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../Button';
import {GREY, WHITE} from '../../constants/colors';
import {
  ADD_EXPENSE,
  FILTER_MODAL,
  HOME_SCREEN_TEXTS,
} from '../../constants/texts';
import {ExpenseSection} from '../../types';
import useFilterModal from '../../hooks/useFilterModal';

const {titleInput, amountInput, dateText} = ADD_EXPENSE;
const {x, clean, filter} = FILTER_MODAL;
interface FilterModalProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  sections: ExpenseSection[];
  setFilteredSections: (filteredSections: ExpenseSection[]) => void;
}
const {filters} = HOME_SCREEN_TEXTS;

const FilterModal: React.FC<FilterModalProps> = ({
  isModalVisible,
  toggleModal,
  sections,
  setFilteredSections,
}) => {
  const {title, setTitle, amount, setAmount, date, setDate, filteredSections} =
    useFilterModal(sections);
  const saveFiltersToState = () => {
    setFilteredSections(filteredSections);
    toggleModal();
  };

  const clearFilters = () => {
    setTitle('');
    setAmount('');
    setDate(new Date());
    setFilteredSections(sections);
    toggleModal();
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={toggleModal}
      style={styles.modal}>
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <Text onPress={clearFilters} style={styles.clearText}>
              {clean}
            </Text>
            <Text style={styles.title}>{filters}</Text>
            <Text onPress={toggleModal} style={styles.closeText}>
              {x}
            </Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder={titleInput}
            value={title}
            onChangeText={setTitle}
            placeholderTextColor={GREY}
          />

          <TextInput
            style={styles.input}
            placeholder={amountInput}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            placeholderTextColor={GREY}
          />

          <View style={[styles.input, styles.dateContainer]}>
            <Text style={styles.dateLabel}>{dateText}</Text>
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                if (selectedDate) setDate(selectedDate);
              }}
            />
          </View>
        </View>

        <Button
          style={styles.button}
          text={filter}
          onPress={saveFiltersToState}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    paddingHorizontal: 24,
    backgroundColor: WHITE,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderBottomColor: GREY,
    borderTopColor: 'transparent',
    borderEndColor: 'transparent',
    borderStartColor: 'transparent',
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  dateLabel: {
    fontSize: 16,
    color: GREY,
    marginRight: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'center',
    marginBottom: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  clearText: {
    fontSize: 16,
  },
  closeText: {
    fontSize: 20,
  },
});

export default FilterModal;
