import React from 'react';
import {StyleSheet, View} from 'react-native';
import DoubleTabLikeRN from './src/DoubleTapLikeRN';

function App() {
  return (
    <View style={styles.main}>
      {/* <AnimatedRNTutorial /> */}
      {/* <PanResponderRN /> */}
      <DoubleTabLikeRN />
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
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
