import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
export default class Ask extends React.Component {
  constructor() {
    super();
    this.state = {
      link: '',
      subject: '',
      topic: '',
      videoLink: '',
      videoSubject: '',
      count: null,
    };
  }
  componentDidMount() {
    let n;
    firebase
      .database()
      .ref('/count/')
      .on('value', function (snapshot) {
        n = snapshot.val();
      });
    this.setState({ count: Number(n) + 1 });
  }
  submitDoubt = async () => {
    firebase.database().ref('/reference/').push({
      link: this.state.link,
      subject: this.state.subject,
    });
    alert('Thank you for the book');
  };

  submitVideo = () => {
    var n;
    this.state.topic === '' ||
    this.state.videoLink === '' ||
    this.state.videoSubject === ''
      ? alert('Kindly fill out the text input feild')
      : firebase
          .database()
          .ref('/count/')
          .on('value', function (snapshot) {
            n = snapshot.val();
          });
    this.setState({ count: Number(n) + 1 });

    firebase
      .database()
      .ref('/Videos/' + this.state.count)
      .set({
        link: this.state.videoLink,
        doubt: this.state.topic,
        subject: this.state.videoSubject,
        views: 0,
        likes: 0,
      })
      .then(() => {
        alert('Thank you for the Video');
      })
      .catch((error) => {
        alert(error.message);
      });
    firebase.database().ref('/').update({
      count: this.state.count,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.formInput}
          placeholder={'Enter Topic'}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => {
            this.setState({
              topic: text,
            });
          }}
        />
        <TextInput
          style={styles.formInput}
          placeholder={'Enter Subject'}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => {
            this.setState({
              videoSubject: text,
            });
          }}
        />
        <TextInput
          style={styles.formInput}
          placeholder={'Enter Video Link'}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => {
            this.setState({
              videoLink: text,
            });
          }}
        />
        <TouchableOpacity
          style={[
            styles.button,
            {
              marginTop: 20,
              width: '75%',
              height: RFValue(50),
              marginBottom: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: RFValue(3),
              backgroundColor: '#32867d',
              shadowColor: '#000',
            },
          ]}
          onPress={() => this.submitVideo()}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.formInput}
          placeholder={'Enter Subject'}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => {
            this.setState({
              subject: text,
            });
          }}
        />
        <TextInput
          style={styles.formInput}
          placeholder={'Enter Downloadable Book Link'}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => {
            this.setState({
              link: text,
            });
          }}
        />
        <TouchableOpacity
          style={[
            styles.button,
            {
              marginTop: 20,
              marginBottom: 10,
              width: '75%',
              height: RFValue(50),

              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: RFValue(3),
              backgroundColor: '#32867d',
              shadowColor: '#000',
            },
          ]}
          onPress={() => this.submitDoubt()}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
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
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
  },
});
