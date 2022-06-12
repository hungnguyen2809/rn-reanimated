import {NativeModules} from 'react-native';

const {BlueModule} = NativeModules;

interface BlueModuleType {
  isEnabled: (
    callback: (info: {message: string; status: boolean}) => void,
  ) => void;
}

export default BlueModule as BlueModuleType;
