import React, {
  useCallback, useRef, useState,
} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ImageBackground,
  Text, Dimensions,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { CommonActions, useNavigation } from '@react-navigation/native';
import TextField from '../../components/custom/TextField';
import {
  EmailIcon, PasswordIcon, ForgetPasswordIcon, RecoveryCodeIcon,
} from '../../assets';
import { globalStyles } from '../../assets/styles/globalStyles';
import useChanges from '../../components/hooks/useChanges';
import { Api } from '../../store/Api';
import ForgotPassButton from '../../components/ForgotPassButton';
import ForgotPassTextField from '../../components/custom/ForgotPassTextField';
import { screenNames } from '../../helper/screenNames';

function ForgotPassword() {
  const activePage = useRef();
  const [errors, setErrors] = useState({});
  const [payloadDate, setPayloadDate] = useState({});
  const [loading, setLoading] = useState(false);
  const [statePage, setStatePage] = useState('email');
  const navigation = useNavigation();

  const {
    values,
    handleChange,
  } = useChanges({
    email: '',
    recoveryCode: '',
    newPassword: '',
    confirmPassword: '',

  });

  const handleForgetPasswordCont = useCallback(async () => {
    if (statePage === 'email') {
      try {
        if (values.email === '') {
          return setErrors({ email: 'Email is not allowed to be empty' });
        }
        setLoading(true);
        const { data } = await Api.sendEmailForgotPassword({
          email: values.email,
        })
          .finally(() => {
            setLoading(false);
          });
        setPayloadDate({ message: data.message });
        activePage.current?.setPage(1);
        setErrors({});
        await setStatePage('code');
      } catch (e) {
        const { data } = e.response;
        setErrors(data.errors);
        setLoading(false);
      }
    }
    if (statePage === 'code') {
      try {
        if (values.recoveryCode === '') {
          return setErrors({ recoveryCode: 'Recovery Code is not allowed to be empty' });
        }
        setLoading(true);
        const arg = {
          email: values.email,
          recoveryCode: values.recoveryCode,
        };
        await Api.sendCodeForgotPassword(arg)
          .finally(() => {
            setLoading(false);
          });
        activePage.current?.setPage(2);
        setErrors({});
        await setStatePage('password');
      } catch (e) {
        const { data } = e.response;
        setErrors(data.errors);
        setLoading(false);
      }
    }
    if (statePage === 'password') {
      const {
        newPassword,
      } = values;
      if (newPassword === '') {
        return setErrors({ newPassword: 'new password :  is not allowed to be empty' });
      }
      try {
        setLoading(true);
        const arg = {
          email: values.email,
          newPassword: values.newPassword,
        };
        await Api.updatePassword(arg)
          .finally(() => {
            setLoading(false);
          });
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: screenNames.login },
            ],
          }),
        );
      } catch (e) {
        const { data } = e.response;
        setErrors(data.errors);
        setLoading(false);
      }
    }
  }, [statePage, values]);

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ImageBackground
        source={require('../../assets/images/Login.png')}
        style={styles.image}
      >
        <View style={styles.content}>
          <View style={styles.iconRow}>
            <PasswordIcon
              width={220}
              height={220}
              fill="#002059"
            />
          </View>
          <View
            style={styles.titleRow}
          >
            <Text
              style={styles.title}
            >
              Forgot Password?
            </Text>
            <Text
              style={styles.text}
            >
              You can reset your password here.
            </Text>
          </View>

          <PagerView
            ref={activePage}
            initialPage={0}
            style={{
              minHeight: '15%',
            }}
            scrollEnabled={false}
          >

            <View
              style={styles.page}
              key={1}
            >
              <View style={styles.textField}>
                <View style={globalStyles.forgotPasswordTextFieldIcon}>
                  <EmailIcon
                    width={25}
                    height={25}
                    fill="#fff"
                  />
                </View>
                <TextField
                  placeholderTextColor="#909DA1"
                  placeholder="example@email.com"
                  onChangeText={handleChange('email')}
                  value={values.email}
                  style={[globalStyles.forgotPasswordTextField]}
                />
              </View>
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
              {errors.notActive ? <Text style={styles.errorText}>{errors.notActive}</Text> : null}
            </View>

            <View
              style={styles.page}
              key={2}
            >
              {payloadDate.message ? (
                <Text
                  style={styles.codeMessage}
                >
                  {payloadDate.message}
                </Text>
              ) : null}
              <View style={styles.textField}>
                <View style={globalStyles.forgotPasswordTextFieldIcon}>
                  <RecoveryCodeIcon
                    width={25}
                    height={25}
                    fill="#fff"
                  />
                </View>
                <TextField
                  placeholderTextColor="#909DA1"
                  placeholder="123456"
                  onChangeText={handleChange('recoveryCode')}
                  value={values.recoveryCode}
                  style={[globalStyles.forgotPasswordTextField]}
                />
              </View>
              {errors.recoveryCode ? (
                <Text
                  style={styles.errorText}
                >
                  {errors.recoveryCode}
                </Text>
              ) : null}
              {errors.recoveryCodeError ? (
                <Text
                  style={styles.errorText}
                >
                  {errors.recoveryCodeError}
                </Text>
              ) : null}
              {errors.exsist ? (
                <Text
                  style={styles.errorText}
                >
                  {errors.exsist}
                </Text>
              ) : null}
            </View>
            <View
              style={styles.page}
              key={3}
            >
              <View style={[styles.textField, { marginTop: 20 }]}>
                <View style={globalStyles.forgotPasswordTextFieldIcon}>
                  <ForgetPasswordIcon
                    width={25}
                    height={25}
                    fill="#fff"
                  />
                </View>
                <ForgotPassTextField
                  placeholderTextColor="#909DA1"
                  placeholder="password"
                  onChangeText={handleChange('newPassword')}
                  value={values.newPassword}
                  style={globalStyles.forgotPasswordTextField}
                />
              </View>
              {errors.newPassword
                ? (
                  <Text
                    style={styles.errorText}
                  >
                    {errors.newPassword}
                  </Text>
                ) : null}
            </View>
          </PagerView>
          <ForgotPassButton
            loading={loading}
            title={statePage === 'password' ? 'Save' : 'Continue'}
            onPress={handleForgetPasswordCont}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    minHeight: Dimensions.get('screen').height,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 16,
  },
  iconRow: {
    paddingTop: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleRow: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontWeight: '800',
    fontSize: 37,
    color: '#fff',
  },
  text: {
    fontWeight: '400',
    color: '#fff',
    fontSize: 17,
    lineHeight: 32,
  },
  page: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 5,
  },
  textField: {
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.25)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  errorText: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 13,
    textAlign: 'left',
    lineHeight: 30,
  },
  codeMessage: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 15,
    marginBottom: 5,
  },
});
export default ForgotPassword;
