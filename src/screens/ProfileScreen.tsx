import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import useSignOut from '../hooks/useSignOut';
import {RootState} from '../redux/store';
import {BORDER_COLOR, WHITE} from '../constants/colors';

const ProfileScreen = () => {
  const signOut = useSignOut();
  const expenseCount = useSelector(
    (state: RootState) => state.expenses.sections.length
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>Total Expenses Items</Text>
        <Text style={styles.number}>{expenseCount}</Text>
      </View>
      <TouchableOpacity style={styles.row} onPress={signOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: WHITE,
    paddingHorizontal: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  signOutText: {
    fontSize: 18,
    fontWeight: '400',
  },
});

export default ProfileScreen;
