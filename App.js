import React from 'react';
import {createAppContainer} from 'react-navigation';
import MainScreen from './source/screen/main_screen.js';

const stackNavigator = createStackNavigator(
  {
    NavigatorName: {
      screen: screenNamespace,
      navigationOptions: {
        headerShown: BOOL
      }
    },
    ...
  },
  {
    initialRouteName: 'StartupScreenNamespace',
    defaultNavigationOptions: ({navigation}) => ({
      headerLeft: () => <View onPress={() => navigation.goBack()} />,
      headerStyle: {
        backgroundColor: '#ffffff',
        shadowOpacity: 0,
        shadowOffset: {
          height: 0,
        },
        shadowRadius: 0,
        borderBottomWidth: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
      headerTintColor: '#333',
      headerTitleStyle: {
        fontFamily: 'Noto Sans KR',
        fontWeight: 'bold',
        fontSize: 19,
        letterSpacing: -0.5,
        color: '#333',
      },
    }),
  },
);

const AppContainer = createAppContainer(stackNavigator);
export default AppContainer;
