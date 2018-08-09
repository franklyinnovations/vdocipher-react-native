/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';
import { startVideoScreen } from 'vdocipher-rn-bridge';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch("https://dev.vdocipher.com/api/site/homepage_video")
      .then(res => res.json())
      .then(resp => this.setState({otp: resp.otp, playbackInfo: resp.playbackInfo}));
  }

  render() {
    var ready = this.state.otp != null;
    const { otp, playbackInfo } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to VdoCipher react-native integration!
        </Text>
        <Button
          disabled={!ready}
          title={ready ? "Start video" : "Loading..."}
          onPress={() => { startVideoScreen(JSON.stringify({embedInfo: {otp, playbackInfo}})); }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
