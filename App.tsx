import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import PanGestureHandlerExam from './src/PanGestureHandler';

function App() {
  return (
    <SafeAreaView style={styles.main}>
      {/* <Introduction /> */}
      <PanGestureHandlerExam />
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
