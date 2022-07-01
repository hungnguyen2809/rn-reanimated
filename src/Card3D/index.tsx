import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import BgGradient from './BgGradient';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const HEIGHT = 256;
const WIDTH = SCREEN_WIDTH * 0.9;

const CARD_HEIGHT = HEIGHT - 5;
const CARD_WIDTH = WIDTH - 5;

//Animated:
//topLeft (10deg, -10deg)
//topRight (10deg, 10deg)
//bottomRight (-10deg, 10deg)
//bottomLeft (-10deg, -10deg)

const Card3D: React.FC = () => {
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin(event => {
      rotateX.value = withTiming(
        interpolate(event.y, [0, CARD_HEIGHT], [10, -10], Extrapolate.CLAMP),
      );
      rotateY.value = withTiming(
        interpolate(event.x, [0, CARD_WIDTH], [-10, 10], Extrapolate.CLAMP),
      );
    })
    .onUpdate(event => {
      rotateX.value = interpolate(
        event.y,
        [0, CARD_HEIGHT],
        [10, -10],
        Extrapolate.CLAMP,
      );
      rotateY.value = interpolate(
        event.x,
        [0, CARD_WIDTH],
        [-10, 10],
        Extrapolate.CLAMP,
      );
    })
    .onFinalize(() => {
      rotateX.value = withTiming(0, {duration: 300});
      rotateY.value = withTiming(0, {duration: 300});
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {perspective: 300},
        {rotateX: `${rotateX.value}deg`},
        {rotateY: `${rotateY.value}deg`},
      ],
    };
  }, []);

  return (
    <View style={styles.container}>
      <BgGradient width={WIDTH} height={HEIGHT} />
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, rStyle]}>
          <View style={styles.wrapContentCard}>
            <View style={styles.contentCardLeft} />
            <View style={styles.contentCardRight}>
              <View style={styles.contentCardRightItem} />
              <View style={styles.contentCardRightItem} />
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default Card3D;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    position: 'absolute',
    backgroundColor: 'black',
    borderRadius: 20,
    zIndex: 1000,
  },
  wrapContentCard: {
    position: 'absolute',
    bottom: '10%',
    left: '10%',
    flexDirection: 'row',
  },
  contentCardLeft: {
    height: 50,
    aspectRatio: 1,
    borderRadius: 25,
    backgroundColor: '#272f46',
  },
  contentCardRight: {
    flexDirection: 'column',
    marginLeft: 10,
    justifyContent: 'space-around',
  },
  contentCardRightItem: {
    height: 20,
    width: 80,
    borderRadius: 25,
    backgroundColor: '#272f46',
  },
});
