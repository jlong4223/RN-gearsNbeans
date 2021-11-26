import { LogBox } from 'react-native';
import { configApp } from '~components/app/screenRegister';

LogBox.ignoreLogs([
  'When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.',
]);

configApp();
