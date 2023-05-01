import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ImageBackground } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
let customFonts = {
  'Bubblegum-Sans': require('../assets/BubblegumSans-Regular.ttf'),
};
let profile =
    'https://static.vecteezy.com/system/resources/thumbnails/007/033/146/small_2x/profile-icon-login-head-icon-vector.jpg',
  name = 'Loading...';
export default class CustomSidebarMenu extends Component {
  logout = () => {
    firebase.auth().signOut();
  };
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      profile: '',
      name: '',
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }
  feeedbackUpload = () => {
    firebase
      .database()
      .ref('/accounts/' + firebase.auth().currentUser.uid)
      .on('value', function (snapshot) {
        profile = snapshot.val().profile_picture;
        name = snapshot.val().first_name;
      });
    this.setState({ profile: profile, name: name });
  };
  componentDidMount() {
    let profile, name;
    this._loadFontsAsync();
    this.feeedbackUpload();
  }
  render() {
    if (
      this.state.profile === '' ||
      this.state.name === '' ||
      this.state.profile === undefined ||
      this.state.name === undefined
    ) {
      return <AppLoading />;
    } else {
      let props = this.props;
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#E4E4E4',
          }}>
          <View style={{ backgroundColor: '#15193c' }}>
            <Image
              source={{ uri: this.state.profile }}
              style={styles.sideMenuProfileIcon}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                {this.state.name}&nbsp;
              </Text>
              {/*<Ionicons color={'yellow'} size={20} name={'happy'} />*/}
            </View>
          </View>

          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
          <View
            style={{
              marginBottom: 10,
              borderTopWidth: 0.5,
              opacity: 0.5,
              borderTopColor: 'gray',
            }}
          />
          <View style={{ marginBottom: 10 }}>
            {/*<TouchableOpacity   onPress={() => {this.props.navigation.navigate("Feedback")}}>
          <View style={{flexDirection:"row",alignItems:"center"}}>icon={({ focused, color, size }) => (
                <Ionicons
                  color={color}
                  size={size}
                  name={focused ? 'create-outline' : 'create-outline'}
                />
              )}
                />
                <Text>Feedback</Text></View>
          </TouchableOpacity>
            <DrawerItem
              icon={({ focused, color, size }) => (
                <Ionicons
                  color={color}
                  size={size}
                  name={focused ? 'create-outline' : 'create-outline'}
                />
              )}
              label="Feedback"
              options={{ unmountOnBlur: true }}
               onPress={() => {this.props.navigation.navigate("Feedback")}}
            /></View>*/}
            <DrawerItem
              icon={({ focused, color, size }) => (
                <Ionicons
                  color={color}
                  size={size}
                  name={focused ? 'exit-outline' : 'exit-outline'}
                />
              )}
              label="Sign out"
              options={{ unmountOnBlur: true }}
              onPress={() => firebase.auth().signOut()}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: 140,
    height: 140,
    borderRadius: RFValue(70),
    alignSelf: 'center',
    marginTop: RFValue(60),
    resizeMode: 'contain',
    marginBottom: RFValue(20),
  },
});
