/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

const AnimatedRNTutorial = () => {
  // const animatedValue = useRef(new Animated.Value(100)).current;
  // const animatedValue = useRef(new Animated.ValueXY({x: 100, y: 100})).current;

  const animatedValue = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   Animated.timing(animatedValue, {
  //     toValue: {x: 200, y: 300},
  //     duration: 2000,
  //     useNativeDriver: false,
  //   }).start();
  // }, [animatedValue]);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.square1,
            {
              opacity: animatedValue.interpolate({
                inputRange: [0, 100],
                outputRange: [1, 0],
                extrapolate: 'clamp', // bắt buộc inputRange và outputRange nằm trong khoảng
                //vì inputRange từ 0 -> 100 vậy thì khi mà scroll quá 100 thì outputRange nó
                //cũng sẽ đc map với giá trị tương ứng tiếp theo do đó dùng clamp để giới hạn lại
                // bắt buộc giá trị của inputRange và outputRange không vượt ra ngoài khoảng
                // thường sử dụng với ScrollView hoặc PanResponder
              }),
            },
          ]}
        />
        {/* <Animated.View
          style={[
            styles.square2,
            {marginLeft: animatedValue.x, marginTop: animatedValue.y},
          ]}
        /> */}
        <ScrollView
          onScroll={ev => {
            animatedValue.setValue(ev.nativeEvent.contentOffset.y);
          }}
          //thời gian (mini giây) để trigger hàm onScroll
          // khi scroll thì cứ 16 mini giấy thì gọi lại hàm onScroll 1 lần
          // => số nhỏ quá thì gọi nhiều, số lớn quá thì chậm
          scrollEventThrottle={16}>
          <View style={{height: 2000}} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AnimatedRNTutorial;

// Bước phân tích sử dụng animation:
// 1. Animation đó hoạt động như thế nào ?
// 2. Những thuộc tính style css nào sẽ được áp dụng ?
// 3. Sử dụng loại Animated.Value hay là Animated.ValueXY ?
// 4. Animated nó sẽ thay đổi như thế nào ?
// 5. Những component nào sẽ áp dụng animation đó ?

//useNativeDriver: true/false
// + true: thì việc tính toán animation sẽ được thực hiện ở phía native
// nhưng mà không phải thuộc tính css nào cũng đc áp dụng, nó chỉ áp dụng đối với thuộc tính
// không làm thay đổi layout như opacity, transform, borderRadius
// + false: thì việc tính toán animation sẽ được thực hiện ở phía JS

const styles = StyleSheet.create({
  main: {flex: 1},
  container: {
    flex: 1,
  },
  square1: {
    width: '100%',
    height: 80,
    backgroundColor: 'chartreuse',
  },
  square2: {
    position: 'absolute',
    width: 100,
    height: 100,
    marginTop: 100,
    marginLeft: 100,
    backgroundColor: 'tomato',
  },
});
