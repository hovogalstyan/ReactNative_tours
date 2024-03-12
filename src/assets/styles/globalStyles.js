import { StyleSheet } from 'react-native';
import { defaults } from 'axios';
import CalendarModal from '../../components/orderTour/CalendarModal';

export const activeOption = 0.7;
export const globalStyles = StyleSheet.create({
  loginToRegisterTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 48,
    lineHeight: 50,
    textAlign: 'center',
  },
  loginToRegisterTextField: {
    backgroundColor: '#fff',
    width: '100%',
    height: 56,
    borderRadius: 10,
    paddingLeft: 15,
    color: '#000',
    fontWeight: '400',
    fontSize: 16,
  },
  formButton: {
    width: '100%',
    backgroundColor: '#FF9500',
    height: 56,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordTextField: {
    height: 50,
    width: '78%',
    paddingLeft: 3,
    color: '#000',
    fontWeight: '400',
    fontSize: 16,
  },
  forgotPasswordTextFieldIcon: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  settingsProfileInput: {
    width: '100%',
    height: 56,
    borderWidth: 1,
    borderColor: '#C7C7C7',
    borderRadius: 5,
    color: '#000',
    fontSize: 16,
    paddingLeft: 5,
  },
});
