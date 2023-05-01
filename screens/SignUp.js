import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import { Picker } from '@react-native-picker/picker';
import db from '../config';
export default class SignUpScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      category: null,
      password: '',
      firstName: '',
      dropdownHeight: 40,
      lastName: '',
      middleName: '',
      confirmPassword: '',
      isModalVisible: true,
      profileImg: '',
      open: false,
      grade: '',
      optionalprofile: {
        1: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        2: 'https://www.iphonefaq.org/files/styles/large/public/animoji-profile-a.jpg',
        3: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTPfY0kHc-YEuqajDGtDBlRRuPy1mdP0vPSrqzY62tOZFW2-tVDmLswWICGRPt8uQGqcU&usqp=CAU',
        4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSePQFZ80y_MrMoeC9CY5mMglI5M_UHLl4xg&usqp=CAU',
        5: 'https://www.clipartmax.com/png/middle/176-1763412_download-all-profile-icon-emojis-or-download-an-individual-animal-emojis.png',
        6: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4eivPYEbV1Bhd8nty3yN4SSL847ox-x4FyIUIq40b7DJcS-FE6T3cQo4qhQkdXMlvkm4&usqp=CAU',
        7: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnDz7CEj8wdp8VopAv2OTGEmsch9P82PPGQ9-reTLOnnONoINnroyf5NEFmyfP-RicHNo&usqp=CAU',
        8: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDlMKO_9KuHBkpEUI0-RGYuvVvUHJRLsF19A&usqp=CAU',
      },
    };
  }

  userSignUp = (emailId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return alert("password doesn't match\nCheck your password.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)

        .then(() => {
          firebase
            .auth()
            .currentUser.sendEmailVerification({
              handleCodeInApp: true,
              url: 'https://doubt-98c52.firebaseapp.com',
            })
            .then(() => {
              alert('Verification Email send');
              this.userAdd();
            })
            .catch((error) => {
              alert(error.message);
            });
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return alert(errorMessage);
        });
    }
  };
  userAdd = () => {
    firebase
      .database()
      .ref('/accounts/' + firebase.auth().currentUser.uid)
      .set({
        gmail: this.state.emailId,
        profile_picture:
          this.state.profileImg === ''
            ? this.state.optionalprofile[Math.floor(Math.random() * 8) + 1]
            : this.state.profileImg,

        first_name: this.state.firstName,
        middle_name: this.state.middleName,
        last_name: this.state.lastName,
        display_name:
          this.state.firstName +
          '' +
          this.state.middleName +
          '' +
          this.state.lastName,
        category: this.state.category,
        grade: this.state.grade,
      })
      .catch((error) => {
        alert(error.message);
      });
    return alert('User Added Successfully', '', [
      {
        text: 'OK',
        onPress: () => this.setState({ isModalVisible: false }),
      },
    ]);
  };
  userLogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        this.props.navigation.navigate('Custom');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return alert(errorMessage);
      });
  };

  showModal = () => {
    let options = [
      { label: 'Teacher', value: 'Teacher' },
      { label: 'Student', value: 'Student' },
    ];
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

            <Text style={styles.label}>Category* </Text>
            <Picker
              selectedValue={this.state.category}
              style={[
                styles.formInput,
                { marginBottom: Platform.OS === 'ios' ? 150 : 14 },
              ]}
              onValueChange={(itemValue) =>
                this.setState({ category: itemValue })
              }>
              <Picker.Item label="Select" value="Select" />
              <Picker.Item label="Teacher" value="Teacher" />
              <Picker.Item label="Student" value="Student" />
            </Picker>
            {this.state.category === 'Student' ? (
              <Text style={styles.label}>Grade* </Text>
            ) : null}
            {this.state.category === 'Student' ? (
              <TextInput
                style={styles.formInput}
                placeholder={'Grade'}
                onChangeText={(text) => {
                  this.setState({
                    grade: text,
                  });
                }}
              />
            ) : null}
            <Text style={styles.label}>Email* </Text>
            <TextInput
              style={styles.formInput}
              placeholder={'Email'}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={'email-address'}
              onChangeText={(text) => {
                this.setState({
                  emailId: text,
                });
              }}
            />

            <Text style={styles.label}> Password* </Text>
            <TextInput
              style={styles.formInput}
              placeholder={'Password'}
              // secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />

            <Text style={styles.label}>Confirm Password*</Text>
            <TextInput
              style={styles.formInput}
              placeholder={'Confrim Password'}
              // secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => {
                this.setState({
                  confirmPassword: text,
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
              style={styles.registerButton}
              onPress={() =>
                this.state.firstName === ''
                  ? Alert.alert('Kindly fill all the details')
                  : this.state.lastName === ''
                  ? Alert.alert('Kindly fill all the details')
                  : this.state.emailId === ''
                  ? Alert.alert('Kindly fill all the details')
                  : this.state.password === ''
                  ? Alert.alert('Kindly fill all the details')
                  : this.state.confirmPassword === ''
                  ? Alert.alert('Kindly fill all the details')
                  : this.state.category === 'Select'
                  ? Alert.alert('Kindly fill all the details')
                  : this.state.category === 'Student' && this.state.grade === ''
                  ? Alert.alert('Kindly fill all the details')
                  : this.userSignUp(
                      this.state.emailId,
                      this.state.password,
                      this.state.confirmPassword
                    )
              }>
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
            <Text
              style={styles.cancelButtonText}
              onPress={() => {
                this.setState({ isModalVisible: false });
                this.props.navigation.navigate('Login');
              }}>
              Cancel
            </Text>
          </View>
        </ScrollView>
      </Modal>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {this.showModal()}
        <View style={{ flex: 0.25 }}>
          <View style={{ flex: 0.15 }} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6fc0b8',
  },

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
    marginTop: RFValue(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(3),
    backgroundColor: '#32867d',
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
  dropdown: {
    borderColor: '#B7B7B7',
    height: 50,
  },
  signupText: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: '#32867d',
    marginTop: Platform.OS === 'ios' ? 50 : 0,
  },
});
