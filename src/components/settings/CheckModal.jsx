import React, { useEffect } from 'react';
import {
  Image,
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Modal from 'react-native-modal';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

import PropTypes from 'prop-types';
import { activeOption } from '../../assets/styles/globalStyles';
import { CloseIcon } from '../../assets';

function CheckModal({
  isVisible,
  onClose,
  message,
}) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(300);

  useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(1, { duration: 500 });
      translateY.value = withSpring(0, {
        damping: 10,
        stiffness: 80,
      });
    } else {
      opacity.value = withTiming(0, { duration: 500 });
      translateY.value = withTiming(300, { duration: 300 });
    }
  }, [isVisible, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const handleTap = (event) => {
    if (event.nativeEvent.state === State.END) {
      onClose();
    }
  };

  return (
    <Modal isVisible={isVisible} animationIn="fadeIn" animationOut="fadeOut">
      <TapGestureHandler onHandlerStateChange={handleTap}>
        <Animated.View style={[styles.modal, animatedStyle]}>
          <View style={styles.modalRow}>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              activeOpacity={activeOption}
            >
              <CloseIcon fill="#000" />
            </TouchableOpacity>
            <Image source={require('../../assets/png/CheckModal.png')} />
            <Text style={styles.textModal}>{message}</Text>
          </View>
        </Animated.View>
      </TapGestureHandler>
    </Modal>
  );
}

CheckModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};
const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalRow: {
    width: '100%',
    padding: 16,
    alignItems: 'center',
    paddingVertical: 45,
  },
  textModal: {
    fontWeight: '700',
    fontSize: 22,
    color: '#002059',
    textAlign: 'center',
    marginTop: 15,
  },
  closeButton: {
    position: 'absolute',
    right: 11,
    top: 11,

  },
});

export default CheckModal;
