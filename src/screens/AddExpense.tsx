import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {GREY, WHITE} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {saveExpense} from '../utils/addExpense';
import Button from '../components/Button';
import {ADD_EXPENSE} from '../constants/texts';

const {titleText, titleInput, amountInput, dateText, button} = ADD_EXPENSE;
const AddExpense = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const navigation = useNavigation();

  const handleSave = async () => {
    const isNotFormValid = !title || !amount || !date;
    if (isNotFormValid) {
      return;
    }
    const newExpense = createNewExpense();
    await saveExpense(newExpense);
    resetForm();
    navigation.goBack();
  };

  const createNewExpense = () => {
    const parsedAmount = parseFloat(amount);
    const dateKey = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    return {title, amount: parsedAmount, date: dateKey};
  };

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setDate(new Date());
  };

  return (
    <View style={styles.container}>
      <View>
        <Text onPress={navigation.goBack} style={styles.close}>
          X
        </Text>
        <Text style={styles.title}>{titleText}</Text>

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
      <Button style={styles.button} text={button} onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default AddExpense;
