import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {GREY, WHITE} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {saveExpense} from '../utils/addExpense';

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
      <Text style={styles.label}>Create Expense</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={GREY}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholderTextColor={GREY}
      />

      <View style={[styles.input, styles.dateContainer]}>
        <Text style={styles.dateLabel}>Enter Date</Text>
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate) setDate(selectedDate);
          }}
        />
      </View>

      <Button title="Add Expense" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: WHITE,
  },
  label: {
    fontSize: 16,
    marginBottom: 15,
    marginTop: 20,
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
});

export default AddExpense;
