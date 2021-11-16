import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {
  doTaskInfo,
  doTaskParams,
  getAllTask,
  getSomeTasks,
  taskManagerEventEmitter,
} from './common';

function DemoNativeModules() {
  useEffect(() => {
    const removeEventA = taskManagerEventEmitter.addListener(
      'EventA',
      event => {
        // EventA tên đăng ký dưới native, khi mà Event này đến thì thực thi callback
        console.log('EventA: ', event);
      },
    );

    const removeEventB = taskManagerEventEmitter.addListener(
      'EventB',
      event => {
        // EventB tên đăng ký dưới native, khi mà Event này đến thì thực thi callback
        console.log('EventA: ', event);
      },
    );

    return () => {
      removeEventA.remove();
      removeEventB.remove();
    };
  }, []);

  const handlePressButton = () => {
    doTaskInfo('Learn Native Module of React Native', 95);
    doTaskParams('Log task params', {
      name: 'Hung',
      age: 22,
      email: 'hungnguyen99.nvh@gmail.com',
      address: 'Bac Giang',
    });
    getAllTask((error, tasks) => {
      if (error) {
        console.log(error);
      } else {
        console.log(tasks);
      }
    });
    getSomeTasks('all')
      .then(data => {
        console.log('[Data]: ', data);
      })
      .catch(error => {
        console.log('[Error]: ', error);
      });
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handlePressButton}
        style={({pressed}) => {
          return [styles.btn, {opacity: pressed ? 0.8 : 1}];
        }}>
        <Text style={styles.text}>Click Me !</Text>
      </Pressable>
    </View>
  );
}

export default DemoNativeModules;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});
