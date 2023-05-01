import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import * as Font from 'expo-font';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
let customFonts = {
  'Bubblegum-Sans': require('../assets/BubblegumSans-Regular.ttf'),
};
export default class Settings extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      middleName: '',
      isModalVisible: false,
      profileImg:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      isInputVisible: false,
      emailId: '',
      currPass: '',
    };
  }
  deleteUser = async () => {
    firebase
      .auth()
      .currentUser.delete()
      .then(() => {
        firebase.auth().signOut();
      })

      .catch((error) => {
        // Handle Errors here.
        console.log(error);
        var errorCode = error.code;
        var errorMessage = error.message;
        return alert(errorMessage);
      });
  };
  userAdd = () => {
    firebase
      .database()
      .ref('/accounts/' + firebase.auth().currentUser.uid)
      .update({
        profile_picture: this.state.profileImg,

        first_name: this.state.firstName,
        middle_name: this.state.middleName,
        last_name: this.state.lastName,
        display_name:
          this.state.firstName +
          '' +
          this.state.middleName +
          '' +
          this.state.lastName,
      });
    return alert('Updated Successfully', '', [
      {
        text: 'OK',
        onPress: () => this.setState({ isModalVisible: false }),
      },
    ]);
  };

  changeEmail = (currPass, newEmail) => {
    this.reauthenticate(currPass)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updateEmail(newEmail)
          .then(() => {
            firebase
              .database()
              .ref('/users/' + firebase.auth().currentUser.uid)
              .update({
                gmail: this.state.emailId,
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  showModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isModalVisible}>
        <ScrollView style={styles.scrollview}>
          <View style={styles.signupView}>
            <Text style={styles.signupText}> SIGN UP </Text>
          </View>
          <View style={{ flex: 0.95 }}>
            <Text style={styles.label}>First Name* </Text>
            <TextInput
              style={styles.formInput}
              placeholder={'First Name'}
              maxLength={12}
              onChangeText={(text) => {
                this.setState({
                  firstName: text,
                });
              }}
            />
            <Text style={styles.label}>Middle Name </Text>
            <TextInput
              style={styles.formInput}
              placeholder={'Middle Name'}
              maxLength={12}
              onChangeText={(text) => {
                this.setState({
                  middleName: text,
                });
              }}
            />
            <Text style={styles.label}>Last Name* </Text>
            <TextInput
              style={styles.formInput}
              placeholder={'Last Name'}
              maxLength={12}
              onChangeText={(text) => {
                this.setState({
                  lastName: text,
                });
              }}
            />

            <Text style={styles.label}>Profile Picture</Text>
            <TextInput
              style={styles.formInput}
              placeholder={'Enter URL'}
              onChangeText={(text) => {
                this.setState({
                  profileImg: text,
                });
              }}
            />
          </View>

          <View style={{ flex: 0.2, alignItems: 'center' }}>
            <TouchableOpacity
              style={[styles.registerButton, { backgroundColor: '#32867d' }]}
              onPress={() =>
                this.state.firstName === ''
                  ? Alert.alert('Kindly fill all the details')
                  : this.state.lastName === ''
                  ? Alert.alert('Kindly fill all the details')
                  : this.userAdd()
              }>
              <Text style={styles.registerButtonText}>Update Details</Text>
            </TouchableOpacity>
            <Text
              style={styles.cancelButtonText}
              onPress={() => {
                this.setState({ isModalVisible: false });
                this.props.navigation.navigate('Settings');
              }}>
              Cancel
            </Text>
          </View>
        </ScrollView>
      </Modal>
    );
  };

  changePassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(() => {
        Alert.alert('email sent');
      })
      .catch((error) => {
        alert(error);
      });
  };
  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };
  /*signOut = async () => {
    
      .then(() => {
       // this.removeData();
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
        var errorCode = error.code;
        var errorMessage = error.message;
        return alert(errorMessage);
      });
  };
  removeData = async () => {
    firebase
      .database()
      .ref('/users/' + udi)
      .remove();
    this.props.navigation.navigate('LoginScreen').catch((error) => {
      // Handle Errors here.
      console.log(error);
      var errorCode = error.code;
      var errorMessage = error.message;
      return alert(errorMessage);
    });

    console.log('llllllllll');
  };*/
  render() {
    return (
      <ScrollView style={styles.scrollview}>
        <View style={styles.signupView}>
          {this.showModal()}

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => {
              this.setState({ isModalVisible: true });

              this.showModal();
            }}>
            <Text style={styles.registerButtonText}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => {
              this.changePassword();
            }}>
            <Text style={styles.registerButtonText}>Reset Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => {
              this.setState((previousState) => ({
                isInputVisible: !previousState.isInputVisible,
              }));
            }}>
            <Text style={styles.registerButtonText}>Change Email</Text>
          </TouchableOpacity>
          {this.state.isInputVisible === true ? (
            <View>
              <Text style={styles.label}>New Email* </Text>
              <TextInput
                style={styles.formInput}
                placeholder={'New Email'}
                autoCapitalize={'none'}
                autoCorrect={false}
                keyboardType={'email-address'}
                onChangeText={(text) => {
                  this.setState({
                    emailId: text,
                  });
                }}
              />
              <Text style={styles.label}>Current Password* </Text>
              <TextInput
                style={styles.formInput}
                placeholder={'Current Password'}
                secureTextEntry={true}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={(text) => {
                  this.setState({
                    currPass: text,
                  });
                }}
              />
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => {
                  this.changeEmail(this.state.currPass, this.state.emailId);
                  this.setState({ isInputVisible: false });
                }}>
                <Text style={styles.registerButtonText}>Change</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => {
              this.deleteUser();
            }}>
            <Text style={styles.registerButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: RFValue(13),
    color: '#717D7E',
    fontWeight: 'bold',
    paddingLeft: RFValue(10),
    marginLeft: RFValue(20),
  },
  formInput: {
    width: '90%',
    height: RFValue(45),
    padding: RFValue(10),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'grey',
    paddingBottom: RFValue(10),
    marginLeft: RFValue(20),
    marginBottom: RFValue(14),
  },
  registerButton: {
    width: '75%',
    height: RFValue(50),
    marginTop: RFValue(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(3),
    backgroundColor: '#CF3917',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  registerButtonText: {
    fontSize: RFValue(23),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  cancelButtonText: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: '#32867d',
    marginTop: RFValue(10),
  },
  scrollview: {
    flex: 1,
    backgroundColor: '#fff',
  },
  signupView: {
    flex: 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: '#32867d',
    marginTop: Platform.OS === 'ios' ? 50 : 0,
  },
});
