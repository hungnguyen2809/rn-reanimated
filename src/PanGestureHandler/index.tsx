import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const SIZE = 100.0;
const CRICLE_RADIUS = SIZE * 2;

type ContextGestureHandler = {
  translationX: number;
  translationY: number;
};

function PanGestureHandlerExam() {
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);

  const panGesttureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextGestureHandler
  >({
    onStart: (event, context) => {
      // có context để lưu lại tọa độ => nhìn nó mượt hơn và di chuyển đúng vị trí hơn không bị trượt quá
      context.translationX = translationX.value;
      context.translationY = translationY.value;
    },
    onActive: (event, context) => {
      translationX.value = event.translationX + context.translationX;
      translationY.value = event.translationY + context.translationY;
    },
    onEnd: () => {
      const distance = Math.sqrt(
        translationX.value ** 2 + translationY.value ** 2,
      );
      if (distance < CRICLE_RADIUS + SIZE / 2) {
        translationX.value = withSpring(0);
        translationY.value = withSpring(0);
      }
    },
  });

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translationX.value},
        {translateY: translationY.value},
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.cricle}>
        <PanGestureHandler onGestureEvent={panGesttureEvent}>
          <Animated.View style={[styles.square, reanimatedStyle]} />
        </PanGestureHandler>
      </View>
    </View>
  );
}

export default PanGestureHandlerExam;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0, 0, 256, 0.5)',
    borderRadius: 20,
  },
  cricle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    width: CRICLE_RADIUS * 2,
    height: CRICLE_RADIUS * 2,
    borderRadius: CRICLE_RADIUS,
    borderColor: 'rgba(0, 0, 256, 0.5)',
  },
});
