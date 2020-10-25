import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import SelectProvider from './pages/New/SelectProvider';
import SelectDateTime from './pages/New/SelectDateTime';
import Confirm from './pages/New/Confirm';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const TabIcon = (iconName, color) => {
  if (iconName === 'add-circle-outline') {
    return <Icon name={iconName} size={20} color="rgba(255,255,255,0.6)" />;
  }
  return <Icon name={iconName} size={20} color={color} />;
};

const ArrowIcon = (navigation) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}
    >
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  );
};

const New = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerLeftContainerStyle: { marginLeft: 20 },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="SelectProvider"
        component={SelectProvider}
        options={{
          title: 'Selecione o prestador',
          headerLeft: () => {
            return ArrowIcon(navigation);
          },
        }}
      />
      <Stack.Screen
        name="SelectDateTime"
        component={SelectDateTime}
        options={{
          title: 'Selecione a horário',
          headerLeft: () => {
            return ArrowIcon(navigation);
          },
        }}
      />
      <Stack.Screen
        name="Confirm"
        component={Confirm}
        options={{ title: 'Confirme seu agendamento' }}
      />
    </Stack.Navigator>
  );
};

const DashboardTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Dashboard') {
            iconName = 'event';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } else if (route.name === 'New') {
            iconName = 'add-circle-outline';
          }
          return TabIcon(iconName, color);
        },
        unmountOnBlur: true,
      })}
      tabBarOptions={{
        activeTintColor: '#FFF',
        inactiveTintColor: 'rgba(255,255,255,0.6)',
        keyboardHidesTabBar: true,
        style: {
          backgroundColor: '#8d41a8',
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ tabBarLabel: 'Agendamentos' }}
      />
      <Tab.Screen
        name="New"
        component={New}
        options={{ tabBarLabel: 'Agendar', tabBarVisible: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

const SignStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#7159c1' },
        headerTintColor: '#fff',
        headerBackTitle: false,
      }}
    >
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ title: '', headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: '', headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default (isSigned = false) => {
  if (!isSigned) {
    return SignStack;
  }
  return DashboardTabs;
};

ArrowIcon.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

New.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
