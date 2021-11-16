import {NativeModules, NativeEventEmitter} from 'react-native';

const {TaskManager} = NativeModules;

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
