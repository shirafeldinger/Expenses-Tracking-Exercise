import DateTimePicker from '@react-native-community/datetimepicker';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { GREY } from '../constants/colors';

interface DateInputProps {
  setDate: Dispatch<SetStateAction<string>>;
  dateText: string;
  date: string;
}

const DateInput: React.FC<DateInputProps> = ({ setDate, dateText, date }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const convertToDate = (dateStr) => {
    const [day, month, year] = dateStr.split('.'); 
    return new Date(year, month - 1, day); // Month is 0-based in JavaScript Date
  };
  const handleDateChange = (_, selectedDate?: Date) => {
    if (!selectedDate) return;
    setDate( selectedDate.toLocaleDateString('he-IL'));
    setShowDatePicker(false);
  };

  return (
    <TouchableOpacity
      onPress={() => setShowDatePicker(true)}
      style={[styles.input, styles.dateContainer]}>
      <Text style={styles.dateLabel}>{dateText}</Text>

      {showDatePicker ? (
        <DateTimePicker
          value={date ? convertToDate(date) : new Date()}
          mode="date"
          display="compact"
          onChange={handleDateChange}
        />
      ) : (
        <Text style={styles.selectedDateText}>{date}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: GREY,
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
  selectedDateText: {
    fontSize: 16,
    color: GREY,
  },
});

export default DateInput;
