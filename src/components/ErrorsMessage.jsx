import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { WarningIcon } from '../assets';

function ErrorsMessage({ message }) {
  return (
    <View style={styles.notFound}>
      <WarningIcon width={150} height={150} fill="red" />
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
}
ErrorsMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

const styles = {
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 22,
    color: '#000',
    marginTop: 2,
  },
};
export default ErrorsMessage;
