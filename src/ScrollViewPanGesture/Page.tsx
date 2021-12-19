import React from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

interface PagePops {
  index: number;
  title: string;
  tranlateX: Animated.SharedValue<number>;
}

const {width: PAGE_WIDTH} = Dimensions.get('window');

const Page: React.FC<PagePops> = ({title, index, tranlateX}) => {
  const pageOffset = PAGE_WIDTH * index;

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: tranlateX.value + pageOffset}],
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {backgroundColor: `rgba(0,0,256, 0.${index + 1})`},
        rStyle,
      ]}>
      <Text style={styles.title}>{title}</Text>
    </Animated.View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    fontSize: 70,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
