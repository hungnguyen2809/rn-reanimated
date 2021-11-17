import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {
  doTaskInfo,
  doTaskParams,
  doTaskX,
  getAllTask,
  getAllTask2,
  getSomeTasks,
  getSomeTasks2,
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

  const handlePressButtonTask2 = async () => {
    doTaskX('Learn React Native', 90);

    getAllTask2(
      {
        name: 'Hung Nguyen',
        email: 'hungnv129@viettelpost.com.vn',
      },
      (error, tasks) => {
        if (error) {
          console.log('[getAllTask2 Error]: ', error);
        } else {
          console.log('[getAllTask2 Tasks]: ', tasks);
        }
      },
    );

    // getSomeTasks2('all')
    //   .then(data => {
    //     console.log('[getSomeTasks2 Tasks]: ', data);
    //   })
    //   .catch(error => {
    //     console.log('[getSomeTasks2 Error]: ', error);
    //   });
    try {
      const tassk = await getSomeTasks2('all');
      console.log('[getSomeTasks2 Tasks]: ', tassk);
    } catch (error) {
      console.log('[getSomeTasks2 Error]: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handlePressButton}
        style={({pressed}) => {
          return [styles.btn, {opacity: pressed ? 0.8 : 1}];
        }}>
        <Text style={styles.text}>TaskManager</Text>
      </Pressable>
      <Pressable
        onPress={handlePressButtonTask2}
        style={({pressed}) => {
          return [styles.btn, {opacity: pressed ? 0.8 : 1}];
        }}>
        <Text style={styles.text}>Task2Manager</Text>
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
    margin: 10,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});
