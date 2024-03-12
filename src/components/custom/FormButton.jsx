import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

function FormButton({ title, loading, ...props }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      {...props}
    >
      <Text style={{
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
      }}
      >
        {
          loading ? (
            <ActivityIndicator color="blue" size="large" />
          ) : title
        }
      </Text>
    </TouchableOpacity>
  );
}
FormButton.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};
export default FormButton;
