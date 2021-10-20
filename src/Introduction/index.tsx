/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const SIZE = 100;

const handleRotation = (progress: Animated.SharedValue<number>) => {
  'worklet';
  // thêm từ khóa này để cho Animated hiểu nó là 1 hàm của Animated chứ không phải là hàm của JS thuần
  // => đây là cách để sử dụng hàm JS để sử dụng với Animated
  return `${progress.value * 2 * Math.PI}rad`;
};

const Introduction = () => {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [{scale: scale.value}, {rotate: handleRotation(progress)}],
    };
  });

  useEffect(() => {
    // opacity.value = withTiming(0.5, {duration: 3000}); // thời gian thực hiện
    // scale.value = withSpring(2, {mass: 5, damping: 3}); // cho hiệu ứng nhẩy nhẩy
    // withRepeat : với số lần lặp lại là -1 thì là lặp mãi mãi
    progress.value = withRepeat(withSpring(0.5), 3, true);
    scale.value = withRepeat(withSpring(1), 3, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {width: SIZE, height: SIZE, backgroundColor: 'blue'},
          reanimatedStyle,
        ]}
      />
    </View>
  );
};

export default Introduction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
