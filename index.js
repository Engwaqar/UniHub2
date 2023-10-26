/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';

var config = {
    apiKey:'AIzaSyDKJTVh1l_WmdhN_6ZRREu6BHBAVqUeaJw',
    databaseURL: "https://unihub-app-default-rtdb.firebaseio.com",
    projectId: "unihub-app",
    appId:'1:444829181838:ios:a45f3a19b16829fc60a6df',
    messagingSenderId:'444829181838',
    storageBucket:'unihub-app.appspot.com'
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

AppRegistry.registerComponent(appName, () => App);
