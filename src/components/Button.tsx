import React, {FC} from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import {PURPLE, WHITE} from '../constants/colors';

type ButtonProps = {
  text: string;
  onPress: () => void;
};

const Button: FC<ButtonProps> = ({text, onPress}) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: PURPLE,
    width: 148,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    color: WHITE
  }
});

export default Button;
