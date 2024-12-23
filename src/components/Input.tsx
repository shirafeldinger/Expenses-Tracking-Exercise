import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';
import {GREY} from '../constants/colors';

interface InputProps {
  onChangeText: Dispatch<SetStateAction<string>>;
  error?: string;
  placeholder: string;
  value: string;
}

const Input: React.FC<InputProps> = ({
  onChangeText,
  error,
  placeholder,
  value,
}) => {
  return (
    <>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={GREY}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </>
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
});

export default Input;
