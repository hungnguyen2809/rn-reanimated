import React from 'react';
import {Dimensions, Image, StyleSheet, Text} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {TaskInterface} from '.';
import {imgs} from '../utils';

interface ListItemProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  task: TaskInterface;
  onDismiss?: (task: TaskInterface) => void;
}
const {width: SCREEN_WIDTH} = Dimensions.get('window');

const ITEM_HEIGHT = 70;
const TRANSLATEX_X_THRESHOULD = -SCREEN_WIDTH * 0.3;

//simultaneousHandlers fix ScrollView & PanGestureHandler conflic when scroll

const ListItem: React.FC<ListItemProps> = ({
  task,
  onDismiss,
  simultaneousHandlers,
}) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacityItem = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      const should = event.translationX > SCREEN_WIDTH * 0.5;
      if (!should) {
        translateX.value = event.translationX;
      }
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATEX_X_THRESHOULD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacityItem.value = withTiming(0, undefined, isFinish => {
          if (onDismiss && isFinish) {
            runOnJS(onDismiss)(task); //runOnJS dùng để handle on the JS Thread
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  const rOpacityIcon = useAnimatedStyle(() => {
    const opacity =
      translateX.value < TRANSLATEX_X_THRESHOULD
        ? withTiming(0)
        : withTiming(1);
    return {
      opacity,
    };
  });

  const rStyleItemHeight = useAnimatedStyle(() => ({
    height: itemHeight.value,
    opacity: opacityItem.value,
    marginVertical: marginVertical.value,
  }));

  return (
    <Animated.View style={[styles.container, rStyleItemHeight]}>
      <Animated.View style={[styles.iconContainer, rOpacityIcon]}>
        <Image
          fadeDuration={0}
          source={imgs.iconTrash}
          style={styles.iconTrash}
        />
      </Animated.View>
      <PanGestureHandler
        onGestureEvent={panGesture}
        simultaneousHandlers={simultaneousHandlers}>
        <Animated.View style={[styles.task, rStyle]}>
          <Text style={styles.taskTitle}>{task.title}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    // marginVertical: 10,
  },
  task: {
    width: '90%',
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: 'white',
    borderRadius: 10,

    // shadow for IOS
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 8,
    // shadow for Android
    elevation: 5,
  },
  taskTitle: {
    fontSize: 16,
  },
  iconContainer: {
    height: ITEM_HEIGHT,
    width: ITEM_HEIGHT,
    position: 'absolute',
    right: '10 %',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTrash: {
    width: ITEM_HEIGHT * 0.4,
    height: ITEM_HEIGHT * 0.4,
    tintColor: 'red',
  },
});
