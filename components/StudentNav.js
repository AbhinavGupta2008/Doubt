import { View, StyleSheet, Image, Text, ImageBackground,StatusBar,Platform } from 'react-native';

import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ask from '../screens/Ask';
import Videos from '../screens/Videos';
import Ref from '../screens/Ref';


const Tab = createMaterialTopTabNavigator();

export default class MyTabs extends React.Component {
 render(){

  return (
   <Tab.Navigator 
   tabBarOptions={{
   
   tabBarAndroidRipple: { borderless: false},
  
   activeTintColor:"green",
   }

   }

   
   style={{marginTop:Platform.OS==="ios"?30:0}}>
      <Tab.Screen name="Home" component={Videos} />
      <Tab.Screen name="Ask" component={Ask} />
      <Tab.Screen name="Ref. Books" component={Ref} />
    </Tab.Navigator>
  );
}}
