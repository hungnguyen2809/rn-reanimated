import React, {useCallback, useRef} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {imgs} from '../utils';

const {width: SIZE} = Dimensions.get('window');

const AnimatedImage = Animated.createAnimatedComponent(Image);

const DoubleTapLike = () => {
  const doubleTapRef = useRef();

  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  const rStyleLike = useAnimatedStyle(() => {
    return {
      transform: [{scale: Math.max(scale.value, 0)}],
      // https://www.youtube.com/watch?v=nbEmo0zLJjw&list=PLjHsmVtnAr9TWoMAh-3QMiP7bPUqPFuFZ&index=11 (16: 25) ==> use Math.max
    };
  });

  const rStyleText = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, isFinished => {
      if (isFinished) {
        scale.value = withDelay(300, withSpring(0));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSingleTap = useCallback(() => {
    opacity.value = withTiming(0, undefined, isFinished => {
      if (isFinished) {
        opacity.value = withDelay(300, withTiming(1));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <TapGestureHandler
        waitFor={doubleTapRef}
        onActivated={() => {
          //numberOfTaps = 1(default) => Single Tap
          console.log('SINGLE TAP');
          onSingleTap();
        }}>
        <TapGestureHandler
          ref={doubleTapRef}
          maxDelayMs={250}
          numberOfTaps={2}
          onActivated={() => {
            //numberOfTaps = 2 => Double Tap
            console.log('DOUBLE TAP');
            onDoubleTap();
          }}>
          <Animated.View>
            <ImageBackground source={imgs.bg} style={styles.image}>
              <AnimatedImage
                source={imgs.like}
                style={[styles.like, rStyleLike]}
                resizeMode="center"
              />
            </ImageBackground>
            <Animated.Text style={[styles.text, rStyleText]}>
              🛵🛵🛵🛵🛵
            </Animated.Text>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
};

export default DoubleTapLike;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  image: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  like: {
    tintColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowColor: 'gray',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  text: {
    textAlign: 'center',
    marginTop: 35,
    fontSize: 30,
  },
});
