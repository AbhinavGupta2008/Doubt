import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar, ListItem, Icon } from 'react-native-elements';

export default class Doubt extends React.Component {
  constructor() {
    super();
    this.state = {
      allDoubt: [],
    };
  }
  keyExtractor = (item, index) => {
    index.toString();
  };
  componentDidMount() {
    let n = {};
    firebase
      .database()
      .ref('/reference/')
      .on('value', function (snapshot) {
        n = snapshot.val();
      });
    n !== null ? this.setState({ allDoubt: Object.entries(n) }) : null;
  }
  renderItem = ({ item }) => {
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
              Subject
            </Text>
            <Text style={{ fontFamily: 'Bubblegum-Sans',marginTop:5 }}>
              {item[1].subject}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('FileView', {
                link: item[1].link,
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
      <View style={styles.container}>
        <FlatList
          data={this.state.allDoubt}
          renderItem={this.renderItem}
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
    );
  }
}

const styles = StyleSheet.create({
  container: {},
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
