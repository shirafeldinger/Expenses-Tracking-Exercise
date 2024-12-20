import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../Button';
import {GREY, WHITE} from '../../constants/colors';
import {ADD_EXPENSE} from '../../constants/texts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {titleInput, amountInput, dateText} = ADD_EXPENSE;
const FilterModal = ({isModalVisible, toggleModal}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());

  const saveFiltersToAsyncStorage = async () => {
    try {
      const filters = () => {
        const parsedAmount = parseFloat(amount);
        const dateKey = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        return {title, amount: parsedAmount, date: dateKey};
      };

      await AsyncStorage.setItem('filters', JSON.stringify(filters));
      toggleModal();
    } catch (error) {
      console.error('Error saving filters to AsyncStorage', error);
    }
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
          text={'filter'}
          onPress={saveFiltersToAsyncStorage}
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
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
  close: {
    alignSelf: 'flex-end',
    marginVertical: 20,
    fontSize: 20,
  },
  button: {
    alignSelf: 'center',
    marginBottom: 50,
  },
});

export default FilterModal;
