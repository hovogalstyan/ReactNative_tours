import React from 'react';
import {
  TextInput, TouchableOpacity, StyleSheet,
} from 'react-native';
import useToggle from '../hooks/useToggle';
import { ShowPasswordIcon, HidePasswordIcon } from '../../assets';

function ForgotPassTextField(props) {
  const [showValue = true, handleEditSecure] = useToggle(true);
  return (
    <>
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
    </>
  );
}
const styles = StyleSheet.create({
  showBtn: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  },
});
export default ForgotPassTextField;
