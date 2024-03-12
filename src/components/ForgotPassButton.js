import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { activeOption, globalStyles } from '../assets/styles/globalStyles';

function ForgotPassButton({ loading, title, ...props }) {
  return (
    <TouchableOpacity
      activeOpacity={activeOption}
      {...props}
      style={[
        globalStyles.formButton,
        { marginTop: 25 },
      ]}
    >
      {loading
        ? (
          <ActivityIndicator color="blue" size="large" />
        ) : (
          <Text style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: '700',
          }}
          >
            {title}
          </Text>
        )}
    </TouchableOpacity>
  );
}
ForgotPassButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
export default ForgotPassButton;
