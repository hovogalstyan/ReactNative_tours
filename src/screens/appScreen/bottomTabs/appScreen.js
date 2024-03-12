import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Home from './Home';
import Favorites from './Favorites';
import Trips from './Trips';
import Notification from './Notification';
import TabScreenIcons from '../../../components/TabScreenIcons';
import {
  TabNavbarFrameIcon,
  TabNavbarHeartIcon,
  TabNavbarHomeIcon,
  TabNavbarSuitcaseIcon,
  TabNavbarUserIcon,
} from '../../../assets';
import { userProfileRequired } from '../../../store/actions/users';
import { screenNames } from '../../../helper/screenNames';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

function AppScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfileRequired());
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          minHeight: 70,
          tabBarHideOnKeyboard: true,
          backgroundColor: '#00000019',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name={screenNames.home}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabScreenIcons
              Icon={TabNavbarHomeIcon}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenNames.favorites}
        component={Favorites}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabScreenIcons
              Icon={TabNavbarHeartIcon}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenNames.trips}
        component={Trips}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabScreenIcons
              Icon={TabNavbarSuitcaseIcon}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Frame"
        component={Notification}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabScreenIcons
              Icon={TabNavbarFrameIcon}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabScreenIcons
              Icon={TabNavbarUserIcon}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppScreen;
