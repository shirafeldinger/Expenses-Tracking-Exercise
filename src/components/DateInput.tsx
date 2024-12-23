import React, {Dispatch, SetStateAction, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {BORDER_COLOR, GREY} from '../constants/colors';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DateInputProps {
  setDate: Dispatch<SetStateAction<Date>>;
  dateText: string;
  date: Date;
}

const DateInput: React.FC<DateInputProps> = ({setDate, dateText, date}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (_, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      setShowDatePicker(false); // Hide picker after date is selected
    }
  };

  return (
    <TouchableOpacity
      onPress={() => setShowDatePicker(true)}
      style={[styles.input, styles.dateContainer]}>
      <Text style={styles.dateLabel}>{dateText}</Text>

      {showDatePicker ? (
        <DateTimePicker
          value={date}
          mode="date"
          display="compact"
          onChange={handleDateChange}
        />
      ) : (
        <Text style={styles.selectedDateText}>{date.toDateString()}</Text>
      )}
    </TouchableOpacity>
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
  selectedDateText: {
    fontSize: 16,
    color: GREY,
  },
});

export default DateInput;
