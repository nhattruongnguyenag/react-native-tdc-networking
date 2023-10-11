/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import  PushNotification, {Importance} from 'react-native-push-notification';

PushNotification.configure({
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
    },
    requestPermissions: Platform.OS === 'ios'
});

PushNotification.createChannel(
    {
        channelId: "tdc-social-network-channel",
        channelName: "Tdc social network channel",
        playSound: true, 
        soundName: "default", 
        importance: Importance.HIGH,
        vibrate: true,
    },
    (created) => console.log(`createChannel returned '${created}'`)
);

AppRegistry.registerComponent(appName, () => App);
