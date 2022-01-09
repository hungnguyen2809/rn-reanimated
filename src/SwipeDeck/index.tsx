import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';
import {imgsInta} from '../utils';

/**
 * Các hàm trong PanResponder luôn luôn trả về true hoặc false nếu là true thì lắng nghe sự kiện của hàm đó false thì bỏ qua
 *
 * onStartShouldSetPanResponder: hàm bắt sự kiện khi mà bắt đầu chạm vào
 * onPanResponderMove: hàm bắt sự kiện khi mà người dùng di chuyển ngón tay
 * onPanResponderRelease: hàm được gọi khi nhấc ngón tay ra khỏi màn hình, dừng hành động chạm, vuốt
 */

const {width, height} = Dimensions.get('window');

const SwipeDeck = () => {
  const swipeRight = () => {
    Animated.spring(animatedValue, {
      toValue: {
        x: width * 2,
        y: 0,
      },
      useNativeDriver: false,
    }).start();
  };

  const swipeLeft = () => {
    Animated.spring(animatedValue, {
      toValue: {
        x: -width * 2,
        y: 0,
      },
      useNativeDriver: false,
    }).start();
  };

  const resetPotion = () => {
    Animated.timing(animatedValue, {
      toValue: {
        x: 0,
        y: 0,
      },
      useNativeDriver: false,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        // console.log(gesture);
        animatedValue.setValue({x: gesture.dx, y: gesture.dy});
      },
      onPanResponderRelease: (event, gesture) => {
        // console.log(gesture);
        if (gesture.dx > width * 0.25) {
          swipeRight();
        } else if (gesture.dx < -width * 0.25) {
          swipeLeft();
        } else {
          resetPotion();
        }
      },
    }),
  ).current;

  const animatedValue = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {imgsInta.map(img => {
        return (
          <Animated.View
            key={img.id}
            style={[
              styles.card,
              {
                transform: [
                  {
                    translateX: animatedValue.x,
                  },
                  {
                    translateY: animatedValue.y.interpolate({
                      inputRange: [-height * 0.01, -height * 0.01],
                      outputRange: [-width * 0.01, -width * 0.01],
                      extrapolate: 'clamp',
                    }),
                  },
                  {
                    rotate: animatedValue.x.interpolate({
                      inputRange: [-width * 1.5, width * 1.5],
                      outputRange: ['-120deg', '120deg'],
                    }),
                  },
                ],
              },
            ]}>
            <Animated.Image source={img.img} style={styles.image} />
            <Animated.Text
              style={[
                styles.text,
                styles.textLike,
                {
                  opacity: animatedValue.x.interpolate({
                    inputRange: [0, width * 0.25],
                    outputRange: [0, 1],
                  }),
                },
              ]}>
              Like
            </Animated.Text>
            <Animated.Text
              style={[
                styles.text,
                styles.textNope,
                {
                  opacity: animatedValue.x.interpolate({
                    inputRange: [-width * 0.25, 0],
                    outputRange: [1, 0],
                  }),
                },
              ]}>
              Nope
            </Animated.Text>
          </Animated.View>
        );
      })}
    </View>
  );
};

export default SwipeDeck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: '90%',
    position: 'absolute',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  text: {
    top: 20,
    width: 100,
    fontSize: 30,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    textAlign: 'center',
    position: 'absolute',
    textTransform: 'uppercase',
  },
  textLike: {
    left: 20,
    color: '#32CD32',
    borderColor: '#32CD32',
  },
  textNope: {
    right: 20,
    color: 'tomato',
    borderColor: 'tomato',
  },
});
