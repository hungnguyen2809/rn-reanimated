import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

const BACKGROUND_COLOR = '#444b6f';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#a6e1fa';

const {height, width} = Dimensions.get('window');

const CIRCLE_LENGTH = 1000; // 2PI*R;
const R = CIRCLE_LENGTH / (2 * Math.PI);

function CircularProgessBar() {
  return (
    <View style={styles.container}>
      <Svg>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
        />
      </Svg>
    </View>
  );
}

export default CircularProgessBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
});
