import React from 'react';
import {StyleSheet, View} from 'react-native';
import CircularProgessBar from './src/CircularProgessBar';

function App() {
  return (
    <View style={styles.main}>
      {/* <Introduction /> */}
      {/* <PanGestureHandlerExam /> */}
      {/* <ScrollViewPage /> */}
      {/* <ColorTheme /> */}
      {/* <DemoNativeModules /> */}
      {/* <ZoomViewer /> */}
      {/* <DoubleTapLike /> */}
      {/* <ScrollViewPanGesture /> */}
      <CircularProgessBar />
      {/* <SwipeDeck /> */}
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
