import React from 'react';
import {StyleSheet, View} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import FlatListAnimated from './src/FlatListAnimated';

function App() {
  return (
    <View style={styles.main}>
      {/* <AnimatedRNTutorial /> */}
      {/* <PanResponderRN /> */}
      {/* <DoubleTabLikeRN /> */}
      {/* <Introduction /> */}
      {/* <PanGestureHandlerExam /> */}
      {/* <ScrollViewPage /> */}
      {/* <ColorTheme /> */}
      {/* <DemoNativeModules /> */}
      {/* <ZoomViewer /> */}
      {/* <DoubleTapLike /> */}
      {/* <ScrollViewPanGesture /> */}
      {/* <CircularProgessBar /> */}
      {/* <SwipeDeck /> */}
      {/* <SwipePress /> */}
      {/* <Card3D /> */}
      {/* <BottomSheet /> */}
      {/* <FoodApp /> */}
      <FlatListAnimated />
    </View>
  );
}

export default gestureHandlerRootHOC(App);

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
