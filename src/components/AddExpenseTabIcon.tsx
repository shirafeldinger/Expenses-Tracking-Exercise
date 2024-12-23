import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {BLUE, WHITE} from '../constants/colors';

const AddExpenseIcon = () => {
  return (
    <View style={styles.circle}>
      <Text style={styles.plusIcon}>+</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 56,
    height: 56,
    backgroundColor: BLUE,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  plusIcon: {
    fontSize: 32,
    color: WHITE,
    fontWeight: '500',
    marginBottom: 5,
  },
});

export default AddExpenseIcon;
