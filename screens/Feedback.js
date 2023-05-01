import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as Font from 'expo-font';
import firebase from 'firebase';
import AppLoading from 'expo-app-loading';
let customFonts = {
  'Bubblegum-Sans': require('../assets/BubblegumSans-Regular.ttf'),
};
import { RFValue } from 'react-native-responsive-fontsize';
//import {Rating} from "react-native-ratings";
import { Rating, AirbnbRating } from 'react-native-elements';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      name: '',
      gmail: '',
      profile: '',
      feedback: '',
      rating: '3',
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }
  render() {
    if (this.state.fontsLoaded === false) {
      return <AppLoading />;
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: '#e4e4e4' }}>
          <View style={{ borderBottomWidth: 0.5 }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                marginTop: 55,
                marginBottom: 10,
              }}>
              Feedback
            </Text>
          </View>
          <TextInput
            style={styles.formInput}
            placeholder={'Type your feedback here....'}
            multiline={true}
            onChangeText={(text) => {
              this.setState({
                feedback: text,
              });
            }}
          />
          <View>
            {/*<Rating onFinishRating={(rating)=>{
this.setState({rating:JSON.stringify(rating)}),alert(JSON.stringify(rating))
          }}/>*/}
            <AirbnbRating
              count={5}
              defaultRating={3}
              onFinishRating={(rating) => {
                this.setState({ rating: rating });
              }}
            />
          </View>
          <View style={{ marginLeft: '20%' }}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => {
                this.state.feedback === ''
                  ? alert('Kindly fill out the text input feild')
                  : firebase
                      .database()
                      .ref('/feedback/' + firebase.auth().currentUser.uid)
                      .push({
                        email: firebase.auth().currentUser.email,
                        feedback: this.state.feedback,
                        rating: this.state.rating,
                      })
                      .then(() => {
                        alert('Thank you for the feedback');
                      })
                      .catch((error) => {
                        alert(error.message);
                      });
              }}>
              <Text style={styles.registerButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  registerButtonText: {
    fontSize: RFValue(23),
    fontWeight: 'bold',
    color: '#fff',
  },

  formInput: {
    width: '90%',
    height: RFValue(200),
    padding: RFValue(10),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'grey',
    paddingBottom: RFValue(10),
    marginLeft: RFValue(20),
    marginBottom: RFValue(14),
    marginTop: RFValue(30),
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
});
