import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  ScrollView,
} from 'react-native';
import firebase from 'firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Video, AVPlaybackStatus } from 'expo-av';
import { Avatar, ListItem, Icon } from 'react-native-elements';
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export default class Doubt extends React.Component {
  constructor() {
    super();
    this.state = {
      allDoubt: [],
      search: '',
      isRefreshing: false,
    };
  }
  refreshUp = () => {
    this.setState({ isRefreshing: true });
    wait(1000).then(() => {
      this.componentDidMount();
      this.setState({ isRefreshing: false });
    });
  };
  keyExtractor = (item, index) => {
    index.toString();
  };
  componentDidMount() {
    let n = {};
    firebase
      .database()
      .ref('/Videos/')
      .on('value', function (snapshot) {
        n = snapshot.val();
      });
    n !== null ? this.setState({ allDoubt: Object.entries(n) }) : null;
  }

  renderSearch = ({ item }) => {
    let f, q;
    firebase
      .database()
      .ref(
        '/accounts/' +
          firebase.auth().currentUser.uid +
          '/likes_Video/' +
          item[0] +
          '/isLiked'
      )
      .on('value', function (snapshot) {
        f = snapshot.val();
      });
    firebase
      .database()
      .ref('/Videos/' + item[0])
      .on('value', function (snapshot) {
        q = snapshot.val();
      });

    return (
      <View
        style={{
          borderWidth: 1,
          margin: 10,
          shadowOpacity: 0.3,
          shadowRadius: 15,
          shadowColor: 'black',
          borderRadius: 10,
        }}>
        <Video
          ref={null}
          style={styles.video}
          source={{
            uri: item[1].link,
          }}
          resizeMode="contain"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
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
            borderRadius: 10,
          }}>
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
            <Text style={{ fontFamily: 'Bubblegum-Sans' }}>{item[0]}</Text>
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
                doubt_id: item[0],
                link: item[1].link,
                subject: item[1].subject,
                likes: item[1].likes,
                isLiked: f,
                views: q.views,
              })
            }>
            <Ionicons size={30} name={'arrow-forward-circle'} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 10,
            alignSelf: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginRight: 15,
              alignItem: 'center',
            }}>
            <Icon type={'material'} name={'favorite'} size={20} color={'red'} />
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
              {' -  '}
              {item[1].likes}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginRight: 10,
              alignItem: 'center',
            }}>
            <Icon name={'visibility'} size={20} color={'black'} />
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
              {' - '} {q.views}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderItem = ({ item }) => {
    let f, q;
    firebase
      .database()
      .ref(
        '/accounts/' +
          firebase.auth().currentUser.uid +
          '/likes_Video/' +
          item[0] +
          '/isLiked'
      )
      .on('value', function (snapshot) {
        f = snapshot.val();
      });
    firebase
      .database()
      .ref('/Videos/' + item[0])
      .on('value', function (snapshot) {
        q = snapshot.val();
      });

    if (isNaN(this.state.search)) {
      if (
        item[1].subject.toLowerCase().includes(this.state.search.toLowerCase())
      ) {
        return (
          <View
            style={{
              borderWidth: 1,
              margin: 10,
              shadowOpacity: 0.3,
              shadowRadius: 15,
              shadowColor: 'black',
              borderRadius: 10,
            }}>
            <Video
              ref={null}
              style={styles.video}
              source={{
                uri: item[1].link,
              }}
              resizeMode="contain"
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
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
                borderRadius: 10,
              }}>
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
                <Text style={{ fontFamily: 'Bubblegum-Sans' }}>{item[0]}</Text>
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
                    doubt_id: item[0],
                    link: item[1].link,
                    subject: item[1].subject,
                    likes: item[1].likes,
                    isLiked: f,
                    views: q.views,
                  })
                }>
                <Ionicons size={30} name={'arrow-forward-circle'} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
                alignSelf: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: 15,
                  alignItem: 'center',
                }}>
                <Icon
                  type={'material'}
                  name={'favorite'}
                  size={20}
                  color={'red'}
                />
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  {' -  '}
                  {item[1].likes}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: 10,
                  alignItem: 'center',
                }}>
                <Icon name={'visibility'} size={20} color={'black'} />
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  {' - '} {q.views}
                </Text>
              </View>
            </View>
          </View>
        );
      }
    } else {
      if (item[0] === this.state.search) {
        return (
          <View
            style={{
              borderWidth: 1,
              margin: 10,
              shadowOpacity: 0.3,
              shadowRadius: 15,
              shadowColor: 'black',
              borderRadius: 10,
            }}>
            <Video
              ref={null}
              style={styles.video}
              source={{
                uri: item[1].link,
              }}
              resizeMode="contain"
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
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
                borderRadius: 10,
              }}>
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
                <Text style={{ fontFamily: 'Bubblegum-Sans' }}>{item[0]}</Text>
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
                    doubt_id: item[0],
                    link: item[1].link,
                    subject: item[1].subject,
                    likes: item[1].likes,
                    isLiked: f,
                    views: q.views,
                  })
                }>
                <Ionicons size={30} name={'arrow-forward-circle'} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
                alignSelf: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: 15,
                  alignItem: 'center',
                }}>
                <Icon
                  type={'material'}
                  name={'favorite'}
                  size={20}
                  color={'red'}
                />
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  {' -  '}
                  {item[1].likes}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: 10,
                  alignItem: 'center',
                }}>
                <Icon name={'visibility'} size={20} color={'black'} />
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  {' - '} {q.views}
                </Text>
              </View>
            </View>
          </View>
        );
      }
    }
  };
  render() {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            progressViewOffset={0}
            refreshing={this.state.isRefreshing}
            onRefresh={() => {
              this.refreshUp();
            }}
          />
        }>
        <View style={styles.container}>
          <View style={styles.lowerContainer}>
            <View style={styles.textinputContainer}>
              <TextInput
                style={[styles.textinput, { backgroundColor: 'transparent' }]}
                placeholder={'Enter Subject Name or ID'}
                placeholderTextColor={'#000000'}
                onChangeText={(text) => {
                  this.setState({ search: text.trim() });
                }}
              />
              <TouchableOpacity
                style={styles.scanbutton}
                onPress={() => {
                  this.componentDidMount();
                }}>
                <Text style={styles.scanbuttonText}>GO</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={this.state.allDoubt}
            renderItem={
              this.state.search !== '' ? this.renderItem : this.renderSearch
            }
            keyExtractor={this.keyExtractor}
            horizontal={false}
          />
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  video: {
    alignSelf: 'center',
    width: 280,
    height: 160,
    marginTop: 5,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    borderWidth: 4,
    borderColor: 'rgba(0, 0, 0, 0.0)',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: 'black',
    borderRadius: 20,
    shadowOpacity: 0.6,
    shadowRadius: 15,

    padding: 30,
    margin: 15,
    width: 290,
    fontFamily: 'Bubblegum-Sans',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#202124',
    backgroundColor: 'rgba(255,255,255, 0.17)',
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
    borderColor: '#000000',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderWidth: 2,

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
