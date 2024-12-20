import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {HOME_SCREEN_TEXTS} from '../../constants/texts';
import {GREY} from '../../constants/colors';

const {emptyList} = HOME_SCREEN_TEXTS;

const EmptyList = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{emptyList}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: GREY,
    textAlign: 'center',
  },
});

export default EmptyList;
