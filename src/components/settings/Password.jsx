import React, { useCallback, useMemo, useState } from 'react';
import {
  View, StyleSheet, ScrollView, Text, Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../assets/styles/globalStyles';
import useChanges from '../hooks/useChanges';
import { ForgetPasswordIcon } from '../../assets';
import ForgotPassTextField from '../custom/ForgotPassTextField';
import FormButton from '../custom/FormButton';
import { userProfilePasswordUpdateRequired } from '../../store/actions/users';
import { screenNames } from '../../helper/screenNames';
import useToggle from '../hooks/useToggle';
import CheckModal from './CheckModal';

function Password() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [checkOldPassword, setCheckOldPassword] = useState(null);
  const [isCheckModal, handleCheckToggle] = useToggle(false);
  const isOnAuth = useSelector((state) => state.users.profile.isOauth);
  const {
    values,
    handleChange,
  } = useChanges({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const checkPasswordEditable = useMemo(() => {
    return !isOnAuth;
  }, [isOnAuth]);

  const handlePassword = useCallback(() => {
    if (values.password !== '') {
      setLoading(true);
      dispatch(userProfilePasswordUpdateRequired(values))
        .then(({ payload }) => {
          if (payload?.errors) {
            setErrors(payload?.errors);
          } else {
            handleCheckToggle();
          }
          if (payload?.errors?.oldPassword) {
            setCheckOldPassword(false);
          } else {
            setCheckOldPassword(true);
          }
        })
        .finally(() => {
          setLoading(false);
        });
      setErrors({});
    } else {
      setErrors({ password: 'is not allowed to be empty' });
    }
  }, [values]);
  const handleCloseCheckModal = useCallback(() => {
    handleCheckToggle();
    setTimeout(() => {
      navigation.navigate(screenNames.appScreen);
    }, 400);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{
        flex: 1,
      }}
      >
        {
          !checkPasswordEditable ? (
            <Text style={styles.helpMessage}>
              We warn you in advance that you cannot change or add your password because you
              are registered through another application :
            </Text>
          ) : null
        }
        <Text style={styles.title}>Old Password</Text>
        <View style={styles.item}>
          <View style={globalStyles.forgotPasswordTextFieldIcon}>
            <ForgetPasswordIcon
              width={25}
              height={25}
              fill="#fff"
            />
          </View>
          <ForgotPassTextField
            style={globalStyles.forgotPasswordTextField}
            onChangeText={handleChange('password')}
            value={values.password}
            editable={checkPasswordEditable}
          />
        </View>
        {errors.password
          ? (
            <View style={styles.checkPasswordRow}>
              <Image source={require('../../assets/png/Errors.png')} />
              <Text style={styles.errorMessage}>{errors.password}</Text>
            </View>
          )
          : null}
        {
          // eslint-disable-next-line no-nested-ternary
          checkOldPassword !== null
            ? checkOldPassword === false ? (
              <View style={styles.checkPasswordRow}>
                <Image source={require('../../assets/png/warning.png')} />
                <Text style={styles.checkTitle}>{errors.oldPassword}</Text>
              </View>
            ) : (
              <View style={styles.checkPasswordRow}>
                <Image source={require('../../assets/png/check.png')} />
                <Text style={styles.checkTitle}>Strong password</Text>
              </View>
            ) : null
        }
        <View style={styles.itemRow}>
          <Text style={styles.title}>New Password</Text>
          <View style={styles.item}>
            <View style={globalStyles.forgotPasswordTextFieldIcon}>
              <ForgetPasswordIcon
                width={25}
                height={25}
                fill="#fff"
              />
            </View>
            <ForgotPassTextField
              style={globalStyles.forgotPasswordTextField}
              onChangeText={handleChange('newPassword')}
              value={values.newPassword}
              editable={checkPasswordEditable}
            />
          </View>
        </View>
        {errors.newPassword
          ? (
            <View style={styles.checkPasswordRow}>
              <Image source={require('../../assets/png/Errors.png')} />
              <Text style={styles.errorMessage}>{errors.newPassword}</Text>
            </View>
          )
          : null}
        <View style={styles.itemRow}>
          <Text style={styles.title}>Confirm Password</Text>
          <View style={styles.item}>
            <View style={globalStyles.forgotPasswordTextFieldIcon}>
              <ForgetPasswordIcon
                width={25}
                height={25}
                fill="#fff"
              />
            </View>
            <ForgotPassTextField
              style={globalStyles.forgotPasswordTextField}
              onChangeText={handleChange('confirmPassword')}
              value={values.confirmPassword}
              editable={checkPasswordEditable}
            />
          </View>
        </View>
        {errors.confirmPassword
          ? (
            <View style={styles.checkPasswordRow}>
              <Image source={require('../../assets/png/Errors.png')} />
              <Text style={styles.errorMessage}>{errors.confirmPassword}</Text>
            </View>
          )
          : null}
        <FormButton
          disabled={!checkPasswordEditable}
          title="Save"
          loading={loading}
          onPress={handlePassword}
          style={[globalStyles.formButton, { marginTop: 30 }]}
        />
        <CheckModal
          onClose={handleCloseCheckModal}
          isVisible={isCheckModal}
          message="Password uploaded successfully !"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: '#052243',
    marginBottom: 5,
  },
  itemRow: {
    marginTop: 20,
  },
  item: {
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.25)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  errorMessage: {
    fontWeight: '500',
    fontSize: 15,
    color: 'red',
    lineHeight: 28,
  },
  checkPasswordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  checkTitle: {
    marginLeft: 5,
  },
  modal: {
    paddingVertical: 45,
    alignItems: 'center',
  },
  helpMessage: {
    backgroundColor: 'rgba(0,0,0,0.29)',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 7,
    marginBottom: 5,
    color: '#000',
    fontWeight: '400',
    fontSize: 13,
  },
});
export default Password;
