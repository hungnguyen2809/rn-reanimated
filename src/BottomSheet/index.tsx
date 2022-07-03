/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useRef} from 'react';
import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import BottomSheetComponent, {BottomSheetRef} from './BottomSheetComponent';

const BottomSheet: React.FC = () => {
  const refBS = useRef<BottomSheetRef>(null);

  const onPress = useCallback(() => {
    const isOpen = refBS.current?.isActive();
    if (isOpen) {
      refBS.current?.scrollTo?.(0);
    } else {
      refBS.current?.scrollTo?.(-300);
    }
  }, []);

  return (
    <React.Fragment>
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <TouchableOpacity style={styles.button} onPress={onPress} />
        <BottomSheetComponent ref={refBS}>
          <View style={{flex: 1, backgroundColor: 'orange'}} />
        </BottomSheetComponent>
      </View>
    </React.Fragment>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 50,
    aspectRatio: 1,
    borderRadius: 25,
    backgroundColor: 'white',
    opacity: 0.6,
  },
});
