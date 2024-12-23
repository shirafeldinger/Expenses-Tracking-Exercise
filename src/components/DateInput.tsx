import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BORDER_COLOR, GREY} from '../constants/colors';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DateInputProps {
  setDate: Dispatch<SetStateAction<Date>>;
  dateText: string;
  date: Date;
}

const DateInput: React.FC<DateInputProps> = ({setDate, dateText, date}) => {
  return (
    <View style={[styles.input, styles.dateContainer]}>
      <Text style={styles.dateLabel}>{dateText}</Text>
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={(_, selectedDate) => {
          if (selectedDate) setDate(selectedDate);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderBottomColor: BORDER_COLOR,
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

export default DateInput;
