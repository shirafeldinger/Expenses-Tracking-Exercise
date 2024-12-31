import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import DateInput from '../components/DateInput';
import Input from '../components/Input';
import { WHITE } from '../constants/colors';
import { ADD_EXPENSE } from '../constants/texts';
import useAddOrEditExpense from '../hooks/useAddOrEdit';
import {
  AddOrEditScreenNavigationProp,
  AddOrEditScreenRouteProp,
} from '../types/navigation';

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
  const {
    title,
    setTitle,
    amount,
    setAmount,
    date,
    setDate,
    handleSave,
    errors,
    clearError,
  } = useAddOrEditExpense(isEditMode, expense);

  const buttonText = isEditMode ? editButton : button;
  return (
    <View style={styles.container}>
      <View>
        <Pressable onPress={navigation.goBack}>
          <Text style={styles.close}>X</Text>
        </Pressable>
        <Text style={styles.title}>
          {isEditMode ? editTitleText : titleText}
        </Text>

        <Input
          error={errors.title}
          placeholder={titleInput}
          value={title}
          onChangeText={text => {
            setTitle(text);
            clearError('title');
          }}
        />

        <Input
          error={errors.amount}
          placeholder={amountInput}
          value={amount}
          onChangeText={text => {
            setAmount(text);
            clearError('amount');
          }}
        />
        <DateInput date={date} setDate={setDate} dateText={dateText} />
      </View>
      <Button
        style={styles.button}
        text={buttonText}
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
