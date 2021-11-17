import {NativeModules, NativeEventEmitter} from 'react-native';

const {TaskManager, Task2Manager} = NativeModules;

export const taskManagerEventEmitter = new NativeEventEmitter(TaskManager);

export const doTaskInfo = (taskName: string, effort: number) => {
  TaskManager.doTaskInfo(taskName, effort);
};

export const doTaskParams = (taskName: string, params: object) => {
  TaskManager.doTaskParams(taskName, params);
};

export const getAllTask = (
  callback: (error: string | null, tasks: object) => void,
) => {
  TaskManager.getAllTask(callback);
};

export const getSomeTasks = (params: string): Promise<object> => {
  return TaskManager.getSomeTasks(params);
};

export const doTaskX = (name: string, effort: number) => {
  Task2Manager.doTaskX(name, effort);
};

export const getAllTask2 = (
  params: object,
  callback: (error: string | null, tasks: object) => void,
) => {
  Task2Manager.getAllTask2(params, callback);
};

export const getSomeTasks2 = (params: string): Promise<object> => {
  return Task2Manager.getSomeTasks2(params);
};
