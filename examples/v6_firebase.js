import React, {useEffect} from 'react';
import {Platform, Alert} from 'react-native';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
var PushNotification = require('react-native-push-notification');

//import Axios from 'axios';
import NotificationConstants from './../../src/constants/notification.js';
import Utility from './../package/class.js';

const SharedPreference = Utility.SharedPreference();

interface Props {
  children: JSX.Element;
  onNotificationOpened?: (data: {[key: string]: string}) => any;
}

const FCMContainer = ({children, onNotificationOpened}: Props): JSX.Element => {
  let _onTokenRefreshListener: any;
  let _notificationDisplayedListener: any;
  let _notificationListener: any;
  let _notificationOpenedListener: any;
  let _notificationOnMessageListener: any;
  let _notificationOnBackgroundMessageListener: any;

  // When the application is opened from a quit state.
  // When a user tap on a push notification and the app is CLOSED
  const _registerMessageListener = (): void => {
    messaging()
      .getInitialNotification()
      .then((notificationOpen) => {
        console.log(notificationOpen);
        alert('sdfsdf');
        if (
          onNotificationOpened &&
          typeof onNotificationOpened === 'function' &&
          notificationOpen &&
          notificationOpen.notification &&
          notificationOpen.notification.data &&
          notificationOpen.notification.data.notifications_id
        ) {
          onNotificationOpened(notificationOpen.notification.data);
        }
      });

    const showNotification = (response): void => {

    };

    const processMessage = (response) => {

    };

    // Foreground state messages
    // When a user receives a push notification and the app is in foreground
    _notificationOnMessageListener = messaging().onMessage((remoteMessage) => {
      console.log('_notificationOnMessageListener');

      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === 'ios') {
          notification = remoteMessage.data.notification;
        } else {
          notification = remoteMessage.notification;
        }

        processMessage(remoteMessage);
      }
    });

    _notificationOnBackgroundMessageListener = messaging().setBackgroundMessageHandler(
      (remoteMessage) => {
        alert('asdf');
        console.log('_notificationOnBackgroundMessageListener');
        console.log(remoteMessage);
      },
    );*/

/*_notificationDisplayedListener = messaging().onNotificationDisplayed(() => {
      console.log('_notificationDisplayedListener');
    });

    // When a user tap on a push notification and the app is in background
    _notificationOpenedListener = messaging().onNotificationOpenedApp(
      (notificationOpen) => {
        alert('xcvxcv');
        console.log('_notificationOpenedListener');
        console.log(
          'Notification caused app to open from background state:',
          notificationOpen.notification,
        );

        if (
          onNotificationOpened &&
          typeof onNotificationOpened === 'function'
        ) {
          onNotificationOpened(notificationOpen.notification.data);
        }
      },
    );
  };

  const _subscribe = () => {
    console.log('subscribe');
    firebase.messaging().subscribeToTopic('alarm');
    firebase.messaging().subscribeToTopic('region');
    firebase.messaging().subscribeToTopic('debug_ios');
  };

  const _getApnsToken = () => {
    firebase
      .messaging()
      .ios.registerForRemoteNotifications()
      .then((flag) => {
        firebase
          .messaging()
          .ios.getAPNSToken()
          .then((apns) => {
            console.log('Apn Token', apns);
          })
          .catch((e) => {});
      });
  };

  const registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
      //await messaging().setAutoInitEnabled(true);
    }
  };

  const _registerToken = async (fcmToken: string): Promise<void> => {
    console.log('receive token');
    console.log(fcmToken);

    _getApnsToken();
    _subscribe();

    // try {
    //   const deviceUniqueId = DeviceInfo.getUniqueId();
    //   const token = await AsyncStorage.getItem('token');
    //   await Axios.post(
    //     `URL`,
    //     {
    //       token: fcmToken,
    //       device_unique_id,
    //     },
    //     {
    //       headers: { Authorization: 'Bearer ' + token },
    //     },
    //   );
    // } catch (error) {
    //   console.log('ERROR: _registerToken');
    //   console.log(error.response.data);
    // }
  };

  const _registerTokenRefreshListener = (): void => {
    if (_onTokenRefreshListener) {
      _onTokenRefreshListener();
      _onTokenRefreshListener = undefined;
    }

    _onTokenRefreshListener = messaging().onTokenRefresh((fcmToken) => {
      console.log('_onTokenRefreshListener');
      // Process your token as required
      _registerToken(fcmToken);
    });
  };

  const _updateTokenToServer = async (): Promise<void> => {
    try {
      const fcmToken = await messaging().getToken();
      _registerMessageListener();
      _registerToken(fcmToken);
    } catch (error) {
      console.log('ERROR: _updateTokenToServer');
      console.log(error);
    }
  };

  const _requestPermission = async (): Promise<void> => {
    try {
      // User has authorised
      await messaging()
        .requestPermission()
        .then((result) => {
          console.log('registed');
        })
        .catch((error) => {
          console.log(error);
        });
      await _updateTokenToServer();
    } catch (error) {
      // User has rejected permissions
      Alert.alert("you can't handle push notification");
    }
  };

  const _checkPermission = async (): Promise<void> => {
    try {
      const enabled = await messaging().hasPermission();

      if (enabled === firebase.messaging.AuthorizationStatus.AUTHORIZED) {
        // user has permissions
        _updateTokenToServer();
        _registerTokenRefreshListener();
      } else {
        // user doesn't have permission
        _requestPermission();
      }
    } catch (error) {
      console.log('ERROR: _checkPermission', error);
      console.log(error);
    }
  };

  useEffect(() => {
    _checkPermission();
    return (): void => {
      if (_notificationOnMessageListener) {
        _notificationOnMessageListener();
        _notificationOnMessageListener = undefined;
      }

      if (_notificationOnBackgroundMessageListener) {
        _notificationOnBackgroundMessageListener();
        _notificationOnBackgroundMessageListener = undefined;
      }

      if (_onTokenRefreshListener) {
        _onTokenRefreshListener();
        _onTokenRefreshListener = undefined;
      }

      //if (_notificationDisplayedListener) {
      //  _notificationDisplayedListener();
      //  _notificationDisplayedListener = undefined;
      //}

      if (_notificationListener) {
        console.log('_notificationListener');
        _notificationListener();
        _notificationListener = undefined;
      }
      if (_notificationOpenedListener) {
        _notificationOpenedListener();
        _notificationOpenedListener = undefined;
      }
    };
  }, []);

  if (Platform.OS === 'ios') {
    //messaging.setBadge(0);
  }

  return children;
};

export default FCMContainer;
