import React, { useCallback, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import PropTypes from 'prop-types';
import { CloseIcon } from '../../assets';

function CloseMapsScreensBtn({
  active,
  close,
}) {
  const animatedValue = useSharedValue({
    right: -100,
  });
  const animatedStyles = useAnimatedStyle(() => {
    return {
      right: withTiming(animatedValue.value.right, {
        duration: 1000,
      }),
    };
  });
  const handleClose = useCallback(() => {
    close(false);
  }, []);

  useEffect(() => {
    if (active) {
      animatedValue.value = {
        right: 15,
      };
    } else {
      animatedValue.value = {
        right: -100,
      };
    }
  }, [active]);
  return (
    <Animated.View style={[
      {
        position: 'absolute',
        zIndex: 999,
        top: -80,
      },
      animatedStyles,
    ]}
    >
      <TouchableOpacity
        onPress={handleClose}
      >
        <CloseIcon />
      </TouchableOpacity>
    </Animated.View>

  );
}

CloseMapsScreensBtn.propTypes = {
  active: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};
export default CloseMapsScreensBtn;
