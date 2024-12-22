import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {GREY, WHITE} from '../constants/colors';
import Button from '../components/Button';
import {ADD_EXPENSE} from '../constants/texts';
import {
  AddOrEditScreenNavigationProp,
  AddOrEditScreenRouteProp,
} from '../types/navigation';
import useExpenses from '../hooks/useExpenses';
import {useDispatch} from 'react-redux';
import {updateExpense} from '../redux/slices/useSlice';

const {
  titleText,
  titleInput,
  amountInput,
  dateText,
  button,
  editButton,
  editTitleText,
} = ADD_EXPENSE;

interface AddOrEditScreenProps {
  navigation: AddOrEditScreenNavigationProp;
  route: AddOrEditScreenRouteProp;
}

const AddOrEditExpense: React.FC<AddOrEditScreenProps> = ({
  navigation,
  route,
}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const {expense, isEditMode} = route.params || {};
  const dispatch = useDispatch();
  useEffect(() => {
    if (isEditMode && expense) {
      setTitle(expense.title);
      setAmount(expense.amount.toString());
      setDate(new Date(expense.date));
    }
  }, [isEditMode, expense]);

  const {handleAddExpense} = useExpenses();

  const handleSave = () => {
    const isNotFormValid = !title || !amount || !date;
    if (isNotFormValid) {
      return;
    }

    const newExpense = createNewExpense();

    if (isEditMode) {
      dispatch(
        updateExpense({updatedExpense: newExpense, oldExpense: expense}),
      );
    } else {
      handleAddExpense(date.toString(), newExpense);
    }
    resetForm();
    navigation.goBack();
  };

  const createNewExpense = () => {
    const parsedAmount = parseFloat(amount);
    const dateString = date.toString();
    return {title, amount: parsedAmount, date: dateString};
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
        <Text style={styles.title}>
          {isEditMode ? editTitleText : titleText}
        </Text>

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
        text={isEditMode ? editButton : button}
        onPress={handleSave}
      />
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

export default AddOrEditExpense;
