import React from 'react';
import {StyleSheet, View} from 'react-native';
import ScrollViewPage from './src/ScrollViewPage';

function App() {
  return (
    <View style={styles.main}>
      {/* <Introduction /> */}
      {/* <PanGestureHandlerExam /> */}
      <ScrollViewPage />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
