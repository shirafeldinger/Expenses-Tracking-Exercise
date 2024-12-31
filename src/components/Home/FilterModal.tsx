import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { BLUE, WHITE } from '../../constants/colors';
import {
  ADD_EXPENSE,
  FILTER_MODAL,
  HOME_SCREEN_TEXTS,
} from '../../constants/texts';
import useFilterModal from '../../hooks/useFilterModal';
import { ExpenseSection } from '../../types';
import Button from '../Button';
import DateInput from '../DateInput';
import Input from '../Input';

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
    setDate('');
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

          <Input
            placeholder={titleInput}
            value={title}
            onChangeText={setTitle}
          />
          <Input
            placeholder={amountInput}
            value={amount}
            onChangeText={setAmount}
          />

          <DateInput date={date} setDate={setDate} dateText={dateText} />
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
    borderRadius: 22,
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    alignSelf: 'center',
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
    color: BLUE,
  },
  closeText: {
    fontSize: 20,
  },
});

export default FilterModal;
