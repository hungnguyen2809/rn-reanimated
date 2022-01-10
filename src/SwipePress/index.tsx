/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ListItem from './ListItem';

const TITLES = [
  'Làm bài tập về nhà',
  'Học thêm ngôn ngữ🙉 Java',
  'Cải thiện ký năng tốt',
  'Cố gắng làm việc',
  'Trải nghiệm cuộc sống🤪',
];

export interface TaskInterface {
  title: string;
  index: number;
}

const TASKS: TaskInterface[] = TITLES.map((title, index) => ({title, index}));

const SwipePress = () => {
  const scrollRef = useRef<ScrollView>(null);

  const [tasks, setTasks] = useState<TaskInterface[]>(TASKS);

  const onDismissTask = useCallback(
    (task: TaskInterface) => {
      const newTasks = tasks.filter(item => item.index !== task.index);
      setTasks(newTasks);
    },
    [tasks],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      <ScrollView ref={scrollRef} style={{flex: 1}}>
        {tasks.map(task => (
          <ListItem
            key={task.index}
            task={task}
            onDismiss={onDismissTask}
            simultaneousHandlers={scrollRef}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SwipePress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
  title: {
    fontSize: 60,
    marginVertical: 20,
    paddingLeft: '5%',
  },
});
