import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation-stack';
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

const bottomTabNavigator = createBottomTabNavigator(
  {
    RouteName: StackNameSpace,
    ...
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const { routeName } = navigation.state;
        if (routeName === 'Home') {
          return <Icon name="home" />;
        } else if (routeName === 'Search') {
          return <Icon name="search" />;
        } else if (routeName === 'Notifications') {
          return (
            <IconBadge showNumber>
              <Icon name="notifications" />
            </IconBadge>
          );
        }
      },
    }),
    initialRouteName: 'StartupScreenNamespace',
  },
);

const AppContainer = createAppContainer(stackNavigator);
export default AppContainer;
