/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface PropsPage {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const {height, width} = Dimensions.get('window');
const SIZE = width * 0.7;

const Page = ({title, index, translateX}: PropsPage) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{scale}],
      borderRadius,
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{translateY}],
      opacity,
    };
  });

  return (
    <View
      style={[
        styles.pageContainer,
        {backgroundColor: `rgba(0, 0, 256, 0.${index + 2})`},
      ]}>
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={[{position: 'absolute'}, rTextStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  pageContainer: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'rgba(0, 0, 256, 0.4)',
  },
  text: {
    fontSize: 70,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});
