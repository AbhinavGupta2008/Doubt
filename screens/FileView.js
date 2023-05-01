import * as React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Profile extends React.Component {
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
    return (
      <View style={{ flex: 1, backgroundColor: '#e4e4e4' }}>
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
        <View style={{ backgroundColor: '#e4e4e4', alignItems: 'center' }}>
          <Text
            style={{
              textDecorationLine: 'underline',
              marginTop: 30,
              marginBottom: 20,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Downloadable Link
          </Text>
          <Text
            style={{
              marginRight: 10,
              marginLeft: 10,
              textDecorationLine: 'underline',
              color: 'blue',
            }}>
            {this.props.route.params.link}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
  },
  button: {
    width: '80%',
    padding: 10,
    backgroundColor: 'blue',
    margin: 10,
  },
});
