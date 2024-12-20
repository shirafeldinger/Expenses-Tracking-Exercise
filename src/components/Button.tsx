import React, {FC} from 'react';
import {Text, StyleSheet, Pressable, StyleProp, ViewStyle} from 'react-native';
import {PURPLE, WHITE} from '../constants/colors';

type ButtonProps = {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const Button: FC<ButtonProps> = ({text, onPress, style}) => {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
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
    borderRadius: 50,
  },
  text: {
    color: WHITE,
    fontWeight: 'bold',
  },
});

export default Button;
