/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import Page from './Page';

const titles = ["What's", 'up', 'mobile', 'Dev?'];

type ContextViewType = {
  x: number;
};

const {width: PAGE_WIDTH} = Dimensions.get('window');

const MAX_TRANSLATE_X = -PAGE_WIDTH * (titles.length - 1);

const ScrollViewPanGesture = () => {
  const translateX = useSharedValue(0);

  const clampedTranslateX = useDerivedValue(() => {
    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X);
  });

  const onPanGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextViewType
  >({
    onStart: (_, context) => {
      context.x = clampedTranslateX.value;
      cancelAnimation(translateX);
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: event => {
      translateX.value = withDecay({velocity: event.velocityX});
    },
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onPanGestureEvent}>
        <Animated.View style={{flex: 1, flexDirection: 'row'}}>
          {titles.map((title, idx) => (
            <Page
              key={idx.toString()}
              index={idx}
              title={title}
              tranlateX={clampedTranslateX}
            />
          ))}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default ScrollViewPanGesture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
});
