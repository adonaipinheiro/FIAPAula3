import messaging from '@react-native-firebase/messaging';
import React, {useEffect} from 'react';
import {Alert, StatusBar} from 'react-native';
import {Provider} from 'react-redux';

// Locale
import './locale';

// Routes
import Routes from './routes';

// Store
import {store} from './store';

export default function App() {
  async function getToken() {
    const token = await messaging().getToken();
    console.log(token);
  }

  useEffect(() => {
    messaging().registerDeviceForRemoteMessages();
    getToken();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={'#be0e49'} />
      <Routes />
    </Provider>
  );
}
