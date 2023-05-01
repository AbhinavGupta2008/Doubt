import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
import SignUp from '../screens/SignUp';
import Teacher from './TopNav';
import Student from './StudentNav';
import View from '../screens/View';
import VideoView from '../screens/VideoView';
import FileView from '../screens/FileView';
import Drawer from '../components/Drawer';
import Loading from '../screens/LoadingScreen';
const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Loading" component={Loading} />

      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Drawer" component={Drawer} />
      <Stack.Screen name="Teacher" component={Teacher} />
      <Stack.Screen name="Student" component={Student} />
      <Stack.Screen name="View" component={View} />
      <Stack.Screen name="VideoView" component={VideoView} />
      <Stack.Screen name="FileView" component={FileView} />
    </Stack.Navigator>
  );
};
export default MyStack;
