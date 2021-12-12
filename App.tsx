import React from 'react';
import {StyleSheet, View} from 'react-native';
import DoubleTapLike from './src/DoubleTapLike';

function App() {
  return (
    <View style={styles.main}>
      {/* <Introduction /> */}
      {/* <PanGestureHandlerExam /> */}
      {/* <ScrollViewPage /> */}
      {/* <ColorTheme /> */}
      {/* <DemoNativeModules /> */}
      {/* <ZoomViewer /> */}
      <DoubleTapLike />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
