import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { WHITE} from '../constants/colors';
import Button from '../components/Button';
import {ADD_EXPENSE} from '../constants/texts';
import {
  AddOrEditScreenNavigationProp,
  AddOrEditScreenRouteProp,
} from '../types/navigation';
import useAddOrEditExpense from '../hooks/useAddOrEdit';
import Input from '../components/Input';
import DateInput from '../components/DateInput';

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
  } = useAddOrEditExpense(isEditMode, expense);

  return (
    <View style={styles.container}>
      <View>
        <Text onPress={navigation.goBack} style={styles.close}>
          X
        </Text>
        <Text style={styles.title}>
          {isEditMode ? editTitleText : titleText}
        </Text>

        <Input
          error={errors.title}
          placeholder={titleInput}
          value={title}
          onChangeText={setTitle}
        />

        <Input
          error={errors.amount}
          placeholder={amountInput}
          value={amount}
          onChangeText={setAmount}
        />
        <DateInput date={date} setDate={setDate} dateText={dateText} />
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
