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
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class ViewScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      answer: '',
      video: '',
      grade: '',
    };
  }

  componentDidMount() {
    let n;
    firebase
      .database()
      .ref('/accounts/' + this.props.route.params.uid + '/grade/')
      .on('value', function (snapshot) {
        n = snapshot.val();
      });
    this.setState({ grade: n });
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ marginLeft: 10, marginTop: 10 }}
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <Ionicons colour={'white'} size={26} name={'chevron-back-outline'} />
        </TouchableOpacity>
        <Text style={styles.paragraph}>
          {'Id:'} {this.props.route.params.doubt_id}
        </Text>
        {this.state.grade === null || this.state.grade === undefined ? (
          this.componentDidMount
        ) : (
          <Text style={styles.paragraph}>
            {'Grade:'} {this.state.grade}
          </Text>
        )}
        <Text style={styles.paragraph}>
          {'Subject:'} {this.props.route.params.subject}
        </Text>
        <Text style={styles.paragraph}>
          {'Doubt:'} {this.props.route.params.doubt}
        </Text>
        <TextInput
          style={styles.formInput}
          placeholder={'Type your answer here....'}
          multiline={true}
          onChangeText={(text) => {
            this.setState({
              answer: text,
            });
          }}
        />
        <TextInput
          style={[styles.formInput, { height: 50 }]}
          placeholder={'Enter Video Link'}
          autoCapitalize={'none'}
          multiline={false}
          autoCorrect={false}
          onChangeText={(text) => {
            this.setState({
              video: text,
            });
          }}
        />
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => {
            this.state.answer === '' || this.state.video === ''
              ? alert('Kindly fill out the text input feild')
              : firebase
                  .database()
                  .ref('/Videos/' + this.props.route.params.doubt_id)
                  .set({
                    link: this.state.video,
                    doubt: this.props.route.params.doubt,
                    subject: this.props.route.params.subject,
                    likes: 0,
                    views: 0,
                  })

                  .catch((error) => {
                    alert(error.message);
                  });

            this.state.answer === '' || this.state.video === ''
              ? alert('Kindly fill out the text input feild')
              : firebase
                  .database()
                  .ref(
                    '/accounts/' + this.props.route.params.uid + '/solutions/'
                  )
                  .push({
                    id: this.props.route.params.doubt_id,
                    doubt: this.props.route.params.doubt,
                    subject: this.props.route.params.subject,
                    link: this.state.video,
                    answer: this.state.answer,
                  })
                  .then(() => {
                    alert('Thank you for the answer');
                    firebase
                      .database()
                      .ref('/doubt/' + this.props.route.params.doubt_id)
                      .remove();
                  })
                  .then(() => {
                    this.props.navigation.goBack();
                  })
                  .catch((error) => {
                    alert(error.message);
                  });
          }}>
          <Text style={styles.registerButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  paragraph: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
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
  },
  logo: {
    height: 128,
    width: 128,
  },
});
