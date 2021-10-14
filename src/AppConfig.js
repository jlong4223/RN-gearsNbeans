import { LogBox } from 'react-native';
import { configApp } from '~components/app/screenRegister';

// this removes warnings on simulators but they still show in the console
LogBox.ignoreAllLogs();

configApp();
