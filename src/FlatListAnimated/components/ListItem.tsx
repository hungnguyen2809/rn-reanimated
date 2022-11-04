import React, {memo} from 'react';
import {StyleSheet, ViewToken} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

type Props = {
  item: {id: number; value: number};
  viewableItems: Animated.SharedValue<ViewToken[]>;
};

const ListItem: React.FC<Props> = ({item, viewableItems}) => {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = viewableItems.value.some(vItem => {
      return vItem.isViewable && vItem.item?.id === item.id;
    });

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6),
        },
      ],
    };
  }, []);

  return <Animated.View style={[styles.blockItem, rStyle]} />;
};

export default memo(ListItem);

const styles = StyleSheet.create({
  blockItem: {
    height: 80,
    width: '90%',
    borderRadius: 15,
    alignSelf: 'center',
    backgroundColor: '#78cad2',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
