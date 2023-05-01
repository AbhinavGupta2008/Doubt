import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Screen from './TopNav';
import Screen2 from './StudentNav';
import Profile from '../screens/Profile';
import Feedback from '../screens/Feedback';
import Settings from '../screens/Settings';
import Loading from "../screens/LoadingScreen"
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import History from '../screens/History';

import CustomSidebarMenu from '../screens/CustomSideMenu';

const Drawer = createDrawerNavigator();

export default class DrawerNavigation extends Component {
  render() {
    console.log(this.props.route.params.category)
    return (
      <Drawer.Navigator
        detachInactiveScreens={false}
        drawerContentOptions={{
          drawerPosition: 'right',
          activeTintColor: '#4E98E9',
          itemStyle: { marginVertical: 5, fontFamily: 'Bubblegum-Sans' },
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
        screenOptions={{ headerShown: false }}><Drawer.Screen
          name="My Home"
          component={
            this.props.route.params.category === 'Student' ? Screen2 : this.props.route.params.category === 'Loading'?Loading:this.props.route.params.category === 'Teacher'?Screen:Loading
          }
          options={{
            unmountOnBlur: true,
            drawerIcon: ({ color, size }) => (
              <Ionicons color={color} size={size} name={'home-outline'} />
            ),
            fontFamily: 'Bubblegum-Sans',
          }}
        /><Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            unmountOnBlur: true,
            drawerIcon: ({ color, size }) => (
              <Ionicons
                color={color}
                size={size}
                name={'person-circle-outline'}
              />
            ),
          }}
        /><Drawer.Screen
          name="Settings"
          component={Settings}
          options={{
            unmountOnBlur: true,
            drawerIcon: ({ color, size }) => (
              <Ionicons color={color} size={size} name={'settings-outline'} />
            ),
          }}
        />
         <Drawer.Screen
          name="Feedback"
          component={Feedback}
          options={{
            unmountOnBlur: true,
            drawerIcon: ({ color, size, focused }) => (
              <Ionicons
                color={color}
                size={size}
                name={focused ? 'create-outline' : 'create-outline'}
              />
            ),
          }}
        />
        
       
        
       
      </Drawer.Navigator>
    );
  }
}
