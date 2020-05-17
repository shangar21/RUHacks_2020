import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const Button = props => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: props.color,
        borderWidth: 6,
        borderRadius: 10,
        borderColor: 'black',
        width: '100%',
        alignItems: 'center',
        padding: 10,
        ...props.style,
      }}
      onPress={props.onPress}>
      <Text
        style={{
          fontSize: 20,
          color: props.textColor,
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
