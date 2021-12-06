import React from 'react';
import {StyleSheet, View} from 'react-native';
import ZoomViewer from './src/ZoomViewer';

function App() {
  return (
    <View style={styles.main}>
      {/* <Introduction /> */}
      {/* <PanGestureHandlerExam /> */}
      {/* <ScrollViewPage /> */}
      {/* <ColorTheme /> */}
      {/* <DemoNativeModules /> */}
      <ZoomViewer />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
