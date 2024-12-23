import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {GREY, WHITE} from '../constants/colors';
import Button from '../components/Button';
import {ADD_EXPENSE} from '../constants/texts';
import {
  AddOrEditScreenNavigationProp,
  AddOrEditScreenRouteProp,
} from '../types/navigation';
import useAddOrEditExpense from '../hooks/useAddOrEdit';

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
  const {expense, isEditMode} = route.params || {};
  const {title, setTitle, amount, setAmount, date, setDate, handleSave} =
    useAddOrEditExpense(isEditMode, expense);

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
        onPress={() => handleSave(navigation)}
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
