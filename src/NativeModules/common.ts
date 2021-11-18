import {NativeEventEmitter, NativeModules} from 'react-native';

const {TaskManager, Task2Manager, ToastModule} = NativeModules;

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

export const showToastText = (msg: string, duration: 'LONG' | 'SHORT') => {
  // LENGTH_SHORT, LENGTH_LONG là 2 thuộc tính được ánh xạ ra bên ngoài
  ToastModule.showText(
    msg,
    duration === 'SHORT' ? ToastModule.LENGTH_SHORT : ToastModule.LENGTH_LONG,
  );
};

export const doTaskCallback = (
  code: number,
  cbSucess: (name: string, age: number, address: string) => void,
  cbError: (mesError: string) => void,
) => {
  ToastModule.doTaskCallback(code, cbSucess, cbError);
};

export const doTaskPromise = (code: number): Promise<object> => {
  return ToastModule.doTaskPromise(code);
};

export const sendEventNative = () => {
  ToastModule.sendEventNative();
};
