import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Doubt from '../screens/Doubt';
import Upload from '../screens/Upload';
import {Platform} from "react-native";
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator 
    tabBarOptions={{
   
   tabBarAndroidRipple: { borderless: false},
  
   activeTintColor:"green",
   }

   }

   
   style={{marginTop:Platform.OS==="ios"?30:0}}>
      <Tab.Screen name="Doubt" component={Doubt} />
      <Tab.Screen name="Upload" component={Upload} />
    </Tab.Navigator>
  );
}
export default MyTabs;
