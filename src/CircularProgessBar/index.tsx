/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';
import Svg, {Circle} from 'react-native-svg';

const BACKGROUND_COLOR = '#444b6f';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#a6e1fa';

const {height, width} = Dimensions.get('window');

const CIRCLE_LENGTH = 1000; // 2PI*R;
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function CircularProgessBar() {
  const progress = useSharedValue(0);

  //useAnimatedProps được dùng để khi mà truyền giá trị vào là một props
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`;
  }, []);

  const onPressRun = () => {
    progress.value = withTiming(1, {duration: 2000}, isFinish => {
      if (isFinish) {
        progress.value = withTiming(0, {duration: 1500});
      }
    });
  };

  //ReText dùng thằng này do Text không hiển thị được giá trị từ animated
  return (
    <View style={styles.container}>
      {/* <Text style={styles.progressText}>{progressText.value}</Text> */}
      <ReText style={styles.progressText} text={progressText} />
      <Svg style={{position: 'absolute'}}>
        <Circle
          r={R}
          cx={width / 2}
          cy={height / 2}
          strokeWidth={30}
          stroke={BACKGROUND_STROKE_COLOR}
        />
        <AnimatedCircle
          r={R}
          cx={width / 2}
          cy={height / 2}
          strokeWidth={15}
          stroke={STROKE_COLOR}
          strokeLinecap={'round'}
          animatedProps={animatedProps}
          strokeDasharray={CIRCLE_LENGTH}
        />
      </Svg>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.button}
        onPress={onPressRun}>
        <Text style={styles.buttonText}>Run</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CircularProgessBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 80,
    color: 'rgba(256, 256, 256, 0.7)',
  },
  button: {
    bottom: 80,
    height: 60,
    borderRadius: 20,
    width: width * 0.7,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: BACKGROUND_STROKE_COLOR,
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    letterSpacing: 2,
  },
});
