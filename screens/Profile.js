import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import * as Font from 'expo-font';
import firebase from 'firebase';
import AppLoading from 'expo-app-loading';
let customFonts = {
  'Bubblegum-Sans': require('../assets/BubblegumSans-Regular.ttf'),
};
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      name: '',
      gmail: '',
      profile: '',
      category: '',
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    let name, gmail, profile, category;
    firebase
      .database()
      .ref('/accounts/' + firebase.auth().currentUser.uid)
      .on('value', function (snapshot) {
        name = snapshot.val().display_name;
        category = snapshot.val().category;
        gmail = snapshot.val().gmail;
        profile = snapshot.val().profile_picture;
      });
    this.setState({
      name: name,
      gmail: gmail,
      profile: profile,
      category: category,
    });
  }
  render() {
    if (this.state.fontsLoaded === false) {
      return <AppLoading />;
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: '#e4e4e4' }}>
          <View style={styles.container}>
            <Text style={styles.paragraph}>{'Profile'}</Text>
            <Image style={styles.logo} source={{ uri: this.state.profile }} />

            <Text
              style={{
                marginTop: 25,
                fontSize: 45,
                fontFamily: 'Bubblegum-Sans',
              }}>
              {this.state.name}
            </Text>
            <Text
              style={{
                marginTop: 25,
                fontSize: 25,
                fontFamily: 'Bubblegum-Sans',
              }}>
              {this.state.gmail}
            </Text>
            <Text
              style={{
                marginTop: 25,
                fontSize: 25,
                fontFamily: 'Bubblegum-Sans',
              }}>
              {this.state.category}
            </Text>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginTop: '20%',
    backgroundColor: '#e4e4e4',
  },
  paragraph: {
    margin: 24,
    marginTop: 50,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Bubblegum-Sans',
  },
  logo: {
    height: 170,
    width: 170,
    borderRadius: 100,
  },
});
