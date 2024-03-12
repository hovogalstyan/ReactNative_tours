import React from 'react';
import {
  Text, TextInput, TouchableOpacity, View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import useToggle from '../hooks/useToggle';
import { ShowPasswordIcon, HidePasswordIcon } from '../../assets';

function TextFieldPassword(props) {
  const [showValue = true, handleEditSecure] = useToggle(true);
  return (
    <View style={styles.form}>
      <TextInput
        secureTextEntry={showValue}
        {...props}
      />
      <TouchableOpacity
        onPress={handleEditSecure}
        style={styles.showBtn}
      >
        {
          showValue
            ? (
              <ShowPasswordIcon
                width={24}
                height={24}
                fill="#909DA1"
              />
            )
            : (
              <HidePasswordIcon
                width={24}
                height={24}
                fill="#909DA1"
              />
            )
        }
      </TouchableOpacity>
    </View>
  );
}

TextFieldPassword.prototype = {
  props: PropTypes.node,
};
const styles = StyleSheet.create({
  form: {
    position: 'relative',
    overflow: 'hidden',
    marginTop: 30,

  },
  showBtn: {
    position: 'absolute',
    width: 50,
    height: 59,
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  },
});
export default TextFieldPassword;
