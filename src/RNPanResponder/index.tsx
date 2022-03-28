import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';
import {imgsInta} from '../utils';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const PanResponderRN = () => {
  const cardAminated = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        //true là muốn bắt sự kiện vuốt, chạm tương tác của người dùng trên component, false bỏ qua
        return true;
      },
      onPanResponderMove: (event, gesture) => {
        // hàm này đc gọi khi mà người dùng di chuyển ngón tay trên màn hình => đc gọi rất nhiều lần
        cardAminated.setValue({x: gesture.dx, y: gesture.dy});
      },
      onPanResponderRelease: (event, gesture) => {
        //hàm này đc gọi khi người dùng nhấc ta ra khỏi màn hình hay là dừng tương tác
        if (gesture.dx > SCREEN_WIDTH * 0.25) {
          swipeRight();
        } else if (gesture.dx < -SCREEN_WIDTH * 0.25) {
          swipeLeft();
        } else {
          resetPotion();
        }
      },
    }),
  ).current;

  const swipeRight = () => {
    Animated.spring(cardAminated, {
      toValue: {
        x: SCREEN_WIDTH * 2,
        y: 0,
      },
      useNativeDriver: false,
    }).start(({finished}) => {
      finished &&
        Animated.timing(cardAminated, {
          toValue: {x: 0, y: 0},
          duration: 500,
          useNativeDriver: false,
        }).start();
    });
  };

  const swipeLeft = () => {
    Animated.spring(cardAminated, {
      toValue: {
        x: -SCREEN_WIDTH * 2,
        y: 0,
      },
      useNativeDriver: false,
    }).start(({finished}) => {
      finished &&
        Animated.timing(cardAminated, {
          toValue: {x: 0, y: 0},
          duration: 500,
          useNativeDriver: false,
        }).start();
    });
  };

  const resetPotion = () => {
    Animated.timing(cardAminated, {
      toValue: {x: 0, y: 0},
      useNativeDriver: false,
    }).start();
  };

  const renderCard = () => {
    const cardStyles = {
      transform: [
        {
          translateX: cardAminated.x,
        },
        {
          translateY: cardAminated.y.interpolate({
            inputRange: [-SCREEN_HEIGHT * 0.035, SCREEN_HEIGHT * 0.035],
            outputRange: [-SCREEN_HEIGHT * 0.035, SCREEN_HEIGHT * 0.035],
            extrapolate: 'clamp',
          }),
        },
        {
          rotate: cardAminated.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '120deg'],
          }),
        },
      ],
    };

    return (
      <Animated.View style={[styles.card, cardStyles]}>
        <Animated.Image source={imgsInta[4].img} style={styles.image} />
      </Animated.View>
    );
  };

  return (
    <View {...panResponder.panHandlers} style={styles.container}>
      {renderCard()}
    </View>
  );
};

export default PanResponderRN;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    position: 'absolute',
    width: '90%',
    height: '90%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});
