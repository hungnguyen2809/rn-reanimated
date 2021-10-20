import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Page from './Page';

const WORDS = ["What's", 'up', 'mobile', 'devs?'];

const ScrollViewPage = () => {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      pagingEnabled={true}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      horizontal={true}
      style={styles.container}>
      {WORDS.map((title, idx) => (
        <Page
          key={idx.toString()}
          title={title}
          index={idx}
          translateX={translateX}
        />
      ))}
    </Animated.ScrollView>
  );
};

export default ScrollViewPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
});
