// !! Not Working

import React, {useEffect} from 'react';
import {Platform, Alert} from 'react-native';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';

interface Props {
  children: JSX.Element;
  onNotificationOpened?: (data: {[key: string]: string}) => any;
}

const FCMContainer = ({children, onNotificationOpened}: Props): JSX.Element => {
  const CHANNEL_ID = '';
  const APP_NAME = '';
  const DESCRIPTION = '';

  let _onTokenRefreshListener: any;
  let _notificationDisplayedListener: any;
  let _notificationListener: any;
  let _notificationOpenedListener: any;
  let _notificationOnMessageListener: any;
  let _notificationOnBackgroundMessageListener: any;

  const _registerMessageListener = (): void => {
    firebase
      .notifications()
      .getInitialNotification()
      .then((notificationOpen) => {
        console.log(notificationOpen);

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

    const channel = new firebase.notifications.Android.Channel(
      CHANNEL_ID,
      APP_NAME,
      firebase.notifications.Android.Importance.Max,
    ).setDescription(DESCRIPTION);

    firebase.notifications().android.createChannel(channel);

    _notificationListener = firebase
      .notifications()
      .onNotification((notification) => {
 
          if (showNotification) {
            if (Platform.OS === 'android') {
              // Process your notification as required
              notification.android.setPriority(
                firebase.notifications.Android.Priority.Max,
              );

              notification.android.setChannelId(CHANNEL_ID);

              const localNotification = new firebase.notifications.Notification(
                {
                  sound: 'default',
                  show_in_foreground: true,
                },
              )
                .setNotificationId(notification.notificationId)
                .setTitle(notification.title)
                .setSubtitle(notification.subtitle)
                .setBody(notification.body)
                .setData(notification.data)
                .android.setChannelId('channelId')
                .android.setColor('#000000')
                .android.setSmallIcon(notification.android.smallIcon.icon)
                .android.setPriority(
                  firebase.notifications.Android.Priority.High,
                );

              firebase
                .notifications()
                .displayNotification(localNotification)
                .catch((err) => console.error(err));
            } else if (Platform.OS === 'ios') {
              const localNotification = new firebase.notifications.Notification()
                .setNotificationId(notification.notificationId)
                .setTitle(notification.title)
                .setSubtitle(notification.subtitle)
                .setBody(notification.body)
                .setData(notification.data)
                .ios.setBadge(notification.ios.badge);

              firebase
                .notifications()
                .displayNotification(localNotification)
                .catch((err) => console.error(err));
            }
          }
      });

    _notificationOnMessageListener = firebase.messaging().onMessage((data) => {
      console.log('_notificationOnMessageListener');
      console.log(data);
    });

    _notificationOnBackgroundMessageListener = firebase
      .messaging()
      .setBackgroundMessageHandler((remoteMessage) => {
        console.log(remoteMessage);
      });

    _notificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed(() => {});

    _notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen) => {
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
      });
  };

  const _registerToken = async (fcmToken: string): Promise<void> => {
    console.log('receive token');
    console.log(fcmToken);

    console.log('subscribe');
    firebase.messaging().subscribeToTopic('alarm');
    firebase.messaging().subscribeToTopic('region');
    firebase.messaging().subscribeToTopic('debug_ios');

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

  const _registerTokenRefreshListener = (): void => {
    if (_onTokenRefreshListener) {
      _onTokenRefreshListener();
      _onTokenRefreshListener = undefined;
    }

    _onTokenRefreshListener = firebase
      .messaging()
      .onTokenRefresh((fcmToken) => {
        // Process your token as required
        _registerToken(fcmToken);
      });
  };

  const _updateTokenToServer = async (): Promise<void> => {
    try {
      const fcmToken = await firebase.messaging().getToken();
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
      await firebase
        .messaging()
        .requestPermission()
        .then(() => {
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
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
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
        console.log('_notificationOnMessageListener');
        _notificationOnMessageListener();
        _notificationOnMessageListener = undefined;
      }

      if (_notificationOnBackgroundMessageListener) {
        console.log('_notificationOnBackgroundMessageListener');
        _notificationOnBackgroundMessageListener();
        _notificationOnBackgroundMessageListener = undefined;
      }

      if (_onTokenRefreshListener) {
        console.log('_onTokenRefreshListener');
        _onTokenRefreshListener();
        _onTokenRefreshListener = undefined;
      }
      if (_notificationDisplayedListener) {
        console.log('_notificationDisplayedListener');
        _notificationDisplayedListener();
        _notificationDisplayedListener = undefined;
      }
      if (_notificationListener) {
        console.log('_notificationListener');
        _notificationListener();
        _notificationListener = undefined;
      }
      if (_notificationOpenedListener) {
        console.log('_notificationOpenedListener');
        _notificationOpenedListener();
        _notificationOpenedListener = undefined;
      }
    };
  }, []);

  if (Platform.OS === 'ios') {
    firebase.notifications().setBadge(0);
  }

  return children;
};

export default FCMContainer;
