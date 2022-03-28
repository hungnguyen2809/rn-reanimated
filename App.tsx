import React from 'react';
import {StyleSheet, View} from 'react-native';
import AnimatedRNTutorial from './src/RNAnimated';

function App() {
  return (
    <View style={styles.main}>
      <AnimatedRNTutorial />
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
