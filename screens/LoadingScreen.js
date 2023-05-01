import React, { Component } from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import firebase from 'firebase';
let name = 'Loading';
export default class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }
  category = async () => {
    firebase
      .database()
      .ref('/accounts/' + firebase.auth().currentUser.uid)
      .on('value', function (snapshot) {
        name = snapshot.val().category;
      });
;    this.props.navigation.navigate('Drawer',{category:name});
  };
  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        name = 'Loading';
        this.category();
      } else {
        this.props.navigation.navigate('LoginScreen');
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
         <TouchableOpacity
          style={{
            width: 70,
            height: 30,
            justifyContent: 'center',
            marginTop: '5%',
            borderRadius: 5,
            borderWidth: 1.5,
            alignSelf: 'center',
            fontSize: 14,
          }}
          onPress={() => {
            this.componentDidMount();
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontWeight: 'bold',
              fontFamily: 'Bubblegum-Sans',
            }}>
            Refresh
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
