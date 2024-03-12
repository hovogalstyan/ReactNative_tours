import React, { useRef } from 'react';
import { Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

function SwipeToDelete({ onDelete, children }) {
  const translationX = useRef(new Animated.Value(0)).current;

  const onGestureEvent = Animated.event([{ nativeEvent: { translationX } }], {
    useNativeDriver: false,
  });

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const dragDistance = event.nativeEvent.translationX;
      if (dragDistance < -130) {
        onDelete();
      } else {
        // Reset animation if swipe is not sufficient
        Animated.spring(translationX, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={{
          transform: [{ translateX: translationX }],
        }}
      >
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
}
SwipeToDelete.propTypes = {
  onDelete: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default SwipeToDelete;
