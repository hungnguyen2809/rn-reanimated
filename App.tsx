import React from 'react';
import {StyleSheet, View} from 'react-native';
import ScrollViewPanGesture from './src/ScrollViewPanGesture';

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
      <ScrollViewPanGesture />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
