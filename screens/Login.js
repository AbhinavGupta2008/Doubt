import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Text,
  Modal,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();
let customFonts = {
  'Bubblegum-Sans': require('../assets/BubblegumSans-Regular.ttf'),
};
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fontsLoaded: false,
      userSignedIn: false,
      isModalVisible: false,
      show: true,
    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }
  showModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isModalVisible}>
        <ScrollView style={styles.scrollview}>
          <View style={styles.signupView}>
            <Text style={styles.signupText}> Forget Password </Text>
          </View>
          <View style={{ flex: 0.95 }}>
            <Text style={styles.label}>Email </Text>
            <TextInput
              style={styles.formInput}
              placeholder={'Enter Email'}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => {
                this.setState({
                  email: text,
                });
              }}
            />
          </View>

          <View style={{ flex: 0.2, alignItems: 'center' }}>
            <TouchableOpacity
              style={[styles.registerButton, { backgroundColor: '#32867d' }]}
              onPress={() =>
                this.state.email === ''
                  ? Alert.alert('Kindly fill all the details')
                  : this.forgetPassword()
              }>
              <Text style={styles.registerButtonText}>Send Email</Text>
            </TouchableOpacity>
            <Text
              style={styles.cancelButtonText}
              onPress={() => {
                this.setState({ isModalVisible: false });
                this.props.navigation.navigate('LoginScreen');
              }}>
              Cancel
            </Text>
          </View>
        </ScrollView>
      </Modal>
    );
  };
  componentDidMount() {
    this._loadFontsAsync();
    this.showModal();
  }

  signIn = async (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        let name = 'Loading';
        firebase
          .database()
          .ref('/accounts/' + firebase.auth().currentUser.uid)
          .on('value', function (snapshot) {
            name = snapshot.val().category;
          });
        {
          {
            /*firebase.auth().currentUser?.emailVerified === false
            ? alert('Verify your email')
            : */
          }
          this.props.navigation.navigate(
            name === 'Teacher' ? 'Drawer' : 'null',
            {
              category: name,
            }
          );
          {
            /* firebase.auth().currentUser?.emailVerified === false
            ?null
            : */
          }
          this.props.navigation.navigate(
            name === 'Student' ? 'Drawer' : 'null',
            {
              category: name,
            }
          );
        }
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      const { email, password } = this.state;

      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          {this.showModal()}
          <Text style={styles.appTitleText}>Having a doubt?</Text>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: RFValue(30),
              fontFamily: 'Bubblegum-Sans',
              marginBottom: RFValue(20),
            }}>
            First Login
          </Text>
          {/*<Image source={appIcon} style={styles.appIcon} />*/}

          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({ email: text })}
            placeholder={'Enter Email'}
            placeholderTextColor={'#FFFFFF'}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={'email-address'}
          />
          <TextInput
            style={[styles.textinput, { marginTop: 20, marginBottom: 15 }]}
            onChangeText={(text) => this.setState({ password: text })}
            placeholder={'Enter Password'}
            placeholderTextColor={'#FFFFFF'}
            secureTextEntry={this.state.show}
          />

          <Ionicons
            name={this.state.show ? 'eye-off-outline' : 'eye-outline'}
            color={'white'}
            size={20}
            onPress={() => {
              this.state.show
                ? this.setState({ show: false })
                : this.setState({ show: true });
            }}
          />
          <TouchableOpacity
            style={[styles.button, { marginTop: 20 }]}
            onPress={() => this.signIn(email, password)}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={styles.buttonTextNewUser}>New User ?</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15193c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appIcon: {
    width: RFValue(200),
    height: RFValue(200),
    resizeMode: 'contain',
    marginBottom: RFValue(20),
  },
  scrollview: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appTitleText: {
    color: 'white',
    textAlign: 'center',
    fontSize: RFValue(40),
    fontFamily: 'Bubblegum-Sans',
    marginBottom: RFValue(20),
  },
  emailtextinput: {
    width: RFValue(250),
    height: RFValue(50),
    padding: RFValue(10),
    borderColor: '#FFFFFF',
    borderWidth: RFValue(4),
    borderRadius: RFValue(10),
    fontSize: RFValue(20),
    color: '#FFFFFF',
    backgroundColor: '#15193c',
    fontFamily: 'Bubblegum-Sans',
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: RFValue(30),
    backgroundColor: 'white',
    marginBottom: RFValue(20),
  },
  buttonText: {
    fontSize: RFValue(24),
    color: '#15193c',
    fontFamily: 'Bubblegum-Sans',
  },
  buttonTextNewUser: {
    fontSize: RFValue(12),
    color: '#FFFFFF',
    fontFamily: 'Bubblegum-Sans',
    textDecorationLine: 'underline',
  },
  lowerContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  textinputContainer: {
    width: '90%',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowColor: 'black',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
  },
  textinput: {
    width: '80%',
    height: 38,
    padding: 10,
    borderColor: '#ffffff',
    borderRadius: 8,
    
    borderWidth: 3,

    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Bubblegum-Sans',
    color: '#FFFFFF',
  },
  scanbutton: {
    width: '20%',
    height: 38,
    backgroundColor: '#9DFD24',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,

    justifyContent: 'center',
    alignItems: 'center',
  },
  scanbuttonText: {
    fontSize: 21,
    color: '#0A0101',
    fontFamily: 'Bubblegum-Sans',
    textAlign: 'center',
  },
});
