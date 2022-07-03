import React, {forwardRef, useCallback, useImperativeHandle} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

type BottomSheetProps = {
  children?: React.ReactNode;
};

export type BottomSheetRef = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

const BottomSheetComponent: React.ForwardRefRenderFunction<
  BottomSheetRef,
  BottomSheetProps
> = ({children}, ref) => {
  const context = useSharedValue({y: 0});
  const active = useSharedValue(false);

  const translationY = useSharedValue(0);

  const scrollTo = useCallback(
    (destination: number) => {
      // 'worklet'; // => run medthod js on thread animated, add when error
      active.value = destination !== 0;
      translationY.value = withSpring(destination, {damping: 50});
    },
    [translationY, active],
  );

  const isActive = useCallback(() => {
    return active.value;
  }, [active]);

  useImperativeHandle(ref, () => ({scrollTo, isActive}), [scrollTo, isActive]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translationY.value};
    })
    .onUpdate(event => {
      translationY.value = Math.max(
        event.translationY + context.value.y,
        MAX_TRANSLATE_Y,
      );
    })
    .onEnd(() => {
      if (translationY.value > -SCREEN_HEIGHT / 3) {
        translationY.value = withSpring(0, {damping: 50});
        scrollTo(0);
      } else if (translationY.value < -SCREEN_HEIGHT / 1.5) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translationY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP,
    );

    return {
      borderRadius,
      transform: [{translateY: translationY.value}],
    };
  }, []);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
        <View style={styles.line} />
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    width: '100%',
    height: SCREEN_HEIGHT,
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 20,
  },
  line: {
    width: 75,
    height: 3,
    backgroundColor: 'gray',
    alignSelf: 'center',
    marginVertical: 12,
    borderRadius: 5,
  },
});

export default forwardRef(BottomSheetComponent);
