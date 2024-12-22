import React, {useState, useMemo} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../Button';
import {GREY, WHITE} from '../../constants/colors';
import {ADD_EXPENSE} from '../../constants/texts';
import { ExpenseSection } from '../../types';

const {titleInput, amountInput, dateText} = ADD_EXPENSE;

interface FilterModalProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  sections: ExpenseSection[];
  setFilteredSections: (filteredSections: any[]) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isModalVisible,
  toggleModal,
  sections,
  setFilteredSections,
}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());

  const filteredSections = useMemo(() => {
    let filtered = [...sections];

    // Filter by title
    if (title.length > 0) {
      filtered = filtered.filter(
        section => section.data[0].title.toLowerCase() === title.toLowerCase(),
      );
    }

    // Filter by amount
    if (amount.length > 0) {
      const amountValue = parseFloat(amount);
      if (!isNaN(amountValue)) {
        filtered = filtered.filter(section =>
          section.data.some(expense => expense.amount === amountValue),
        );
      }
    }
    // Filter by date

    return filtered;
  }, [sections, title, amount, date]);

  const saveFiltersToState = () => {
    setFilteredSections(filteredSections);
    toggleModal();
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={toggleModal}
      style={styles.modal}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{'Filters'}</Text>
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
          text={'Filter'}
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
    fontSize: 16,
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
});

export default FilterModal;
