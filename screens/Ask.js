import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import { Avatar, ListItem, Icon } from 'react-native-elements';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Ask extends React.Component {
  constructor() {
    super();
    this.state = {
      doubt: '',
      subject: '',
      count: null,
      allDoubt: [],
    };
  }
  componentDidMount() {
    let n = {};
    let m = {};
    firebase
      .database()
      .ref('/count/')
      .on('value', function (snapshot) {
        n = snapshot.val();
      });
    this.setState({ count: Number(n) + 1 });
    firebase
      .database()
      .ref('/accounts/' + firebase.auth().currentUser.uid + '/solutions/')
      .on('value', function (snapshot) {
        m = snapshot.val();
      });

    m !== null ? this.setState({ allDoubt: Object.entries(m) }) : null;
  }
  keyExtractor = (item, index) => {
    index.toString();
  };
  submitDoubt = async () => {
    let n;
    firebase
      .database()
      .ref('/count/')
      .on('value', function (snapshot) {
        n = snapshot.val();
      });
    this.setState({ count: Number(n) + 1 });
    firebase
      .database()
      .ref('/doubt/' + this.state.count)
      .set({
        subject: this.state.subject,
        question: this.state.doubt,
        uid: firebase.auth().currentUser.uid,
      });
    firebase.database().ref('/').update({
      count: this.state.count,
    });
    Alert.alert('Your doubt has been submitted');
  };

  renderItem = ({ item }) => {
    let f, q;
    firebase
      .database()
      .ref(
        '/accounts/' +
          firebase.auth().currentUser.uid +
          '/likes_Video/' +
          item[1].id +
          '/isLiked'
      )
      .on('value', function (snapshot) {
        f = snapshot.val();
      });
    firebase
      .database()
      .ref('/Videos/' + item[1].id)
      .on('value', function (snapshot) {
        q = snapshot.val();
      });
    console.log(q);
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderWidth: 1,
            marginTop: 10,
            marginLeft: 5,
            marginRight: 5,
            shadowOpacity: 0.3,
            shadowRadius: 15,
            shadowColor: 'black',
            paddingTop: 30,
            paddingBottom: 30,
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <View>
            <Icon type={'antdesign'} name={'book'} size={40} color={'green'} />
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontFamily: 'Bubblegum-Sans',
                letterSpacing: 1,
                fontSize: 15,
              }}>
              Id
            </Text>
            <Text style={{ fontFamily: 'Bubblegum-Sans' }}>{item[1].id}</Text>
          </View>

          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontFamily: 'Bubblegum-Sans',
                letterSpacing: 1,
                fontSize: 15,
              }}>
              Subject
            </Text>
            <Text style={{ fontFamily: 'Bubblegum-Sans' }}>
              {item[1].subject}
            </Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontFamily: 'Bubblegum-Sans',
                letterSpacing: 1,
                fontSize: 15,
              }}>
              Question
            </Text>
            <Text style={{ fontFamily: 'Bubblegum-Sans' }}>
              {item[1].doubt !== undefined
                ? Object.keys(item[1].doubt).length > 17
                  ? item[1].doubt.slice(0, 17) + '...'
                  : item[1].doubt
                : item[1].doubt}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('VideoView', {
                doubt: item[1].doubt,
                doubt_id: item[1].id,
                link: item[1].link,
                subject: item[1].subject,
                answer: item[1].answer,
                likes: q.likes,
                views: q.views,
                isLiked: f,
              })
            }>
            <Ionicons
              size={30}
              name={'arrow-redo-circle-outline'}
              color={'blue'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  render() {
    return (
      <ScrollView>
        <View>
          <View style={styles.container}>
            <TextInput
              style={styles.formInput}
              placeholder={'Enter Subject'}
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={(text) => {
                this.setState({
                  subject: text,
                });
              }}
            />
            <TextInput
              style={styles.formInput}
              placeholder={'Enter Doubt'}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => {
                this.setState({
                  doubt: text,
                });
              }}
            />
            <TouchableOpacity
              style={{
                width: '75%',
                height: RFValue(50),
                marginTop: RFValue(20),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: RFValue(3),
                backgroundColor: '#32867d',
                shadowColor: '#000',
              }}
              onPress={() =>
                this.state.subject !== '' &&
                this.state.doubt !== '' &&
                this.state.count !== null
                  ? this.submitDoubt()
                  : this.state.count === null
                  ? this.componentDidMount()
                  : this.state.subject === '' || this.state.doubt === ''
                  ? Alert.alert('Kindly fill all the details')
                  : Alert.alert(
                      'Try Again',
                      [
                        {
                          text: 'Retry',
                          onPress: () =>
                            this.state.subject !== '' &&
                            this.state.doubt !== '' &&
                            this.state.count !== null
                              ? this.submitDoubt()
                              : this.state.count === null
                              ? this.componentDidMount()
                              : this.state.subject === '' ||
                                this.state.doubt === ''
                              ? Alert.alert('Kindly fill all the details')
                              : Alert.alert('Try Again'),
                        },
                      ],
                      { cancelable: false }
                    )
              }>
              <Text style={{ fontWeight: 'bold' }}>Submit</Text>
            </TouchableOpacity>
            <View
              style={{
                alignSelf: 'center',
                alignItems: 'center',
                opacity: 0.3,
                width: '85%',
                height: 0,
                borderWidth: 1,
                marginBottom: 10,
                marginTop: 50,
                borderColor: 'black',
              }}></View>
            <Text style={styles.paragraph}>Solved Answers</Text>
          </View>

          <FlatList
            data={this.state.allDoubt}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            horizontal={false}
          />
        </View>
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
      </ScrollView>
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
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Bubblegum-Sans',
    letterSpacing: 1,
  },
  logo: {
    height: 128,
    width: 128,
  },
});
