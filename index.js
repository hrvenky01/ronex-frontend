
import 'react-native-reanimated';
import { AppRegistry } from 'react-native';
import App from './App';   // ❗ src/App kaadu
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);