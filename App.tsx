import React from 'react';
import {StyleSheet, View} from 'react-native';
import ColorTheme from './src/ColorTheme';

function App() {
  return (
    <View style={styles.main}>
      {/* <Introduction /> */}
      {/* <PanGestureHandlerExam /> */}
      {/* <ScrollViewPage /> */}
      <ColorTheme />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
