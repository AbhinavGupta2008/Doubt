import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  Share,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getHeaderTitle } from '@react-navigation/elements';
import { RFValue } from 'react-native-responsive-fontsize';
import { Video, AVPlaybackStatus } from 'expo-av';
import { Avatar, ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
var color = 'white';
var dcolor = 'white';

export default class ViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.props.route.params.isLiked === 'liked' ? 'red' : 'white',
    };
  }
  componentDidMount() {
    firebase
      .database()
      .ref('/Videos/' + this.props.route.params.doubt_id + '/views')
      .set(firebase.database.ServerValue.increment(1));
  }
  unLike = () => {
    this.setState({ color: 'white' });
    firebase
      .database()
      .ref('Videos')
      .child(this.props.route.params.doubt_id)
      .child('likes')
      .set(firebase.database.ServerValue.increment(-1));
    firebase
      .database()
      .ref(
        '/accounts/' +
          firebase.auth().currentUser.uid +
          '/likes_Video/' +
          this.props.route.params.doubt_id
      )

      .update({ isLiked: 'null' });
  };

  share = async () => {
    try {
      const result = await Share.share({
        message: this.props.route.params.link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  like = () => {
    firebase
      .database()
      .ref('Videos')
      .child(this.props.route.params.doubt_id)
      .child('likes')
      .set(firebase.database.ServerValue.increment(1));
    firebase
      .database()
      .ref(
        '/accounts/' +
          firebase.auth().currentUser.uid +
          '/likes_Video/' +
          this.props.route.params.doubt_id
      )

      .update({ isLiked: 'liked' });
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            style={{ marginLeft: 10, marginTop: 50 }}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Ionicons
              colour={'white'}
              size={26}
              name={'chevron-back-outline'}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.paragraph}>
          {'Id:'} {this.props.route.params.doubt_id}
        </Text>
        <Text style={styles.paragraph}>
          {'Subject:'} {this.props.route.params.subject}
        </Text>

        <Text style={styles.paragraph}>
          {'Doubt:'} {this.props.route.params.doubt}
        </Text>
        <Video
          style={styles.video}
          source={{
            uri: this.props.route.params.link,
          }}
          useNativeControls
          volume={1}
          resizeMode={'contain'}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'column',
              marginRight: 10,
              alignItem: 'center',
            }}>
            <Icon name={'visibility'} size={30} color={'black'} />
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
              {this.props.route.params.views}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              marginRight: 10,
              alignItem: 'center',
            }}>
            <Icon
              type={'material'}
              name={'favorite'}
              size={30}
              color={this.state.color}
              onPress={() => {
                this.props.route.params.isLiked !== 'liked'
                  ? this.like()
                  : this.unLike();
                this.setState({ color: 'red', dcolor: 'white' });
              }}
            />
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
              {this.props.route.params.likes}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              marginRight: 10,
              alignItem: 'center',
            }}>
            <Icon
              type={'ionicon'}
              name={'arrow-redo-outline'}
              size={30}
              color={'black'}
              onPress={() => {
                this.share();
              }}
            />
          </View>
        </View>
        {this.props.route.params.answer !== undefined ? (
          <Text style={styles.paragraph}>
            Answer: {this.props.route.params.answer}
          </Text>
        ) : null}
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
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  logo: {
    height: 128,
    width: 128,
  },
  video: {
    marginTop: 40,
    alignSelf: 'center',
    width: 300,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
