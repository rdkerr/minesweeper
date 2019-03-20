/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import ms from 'pretty-ms';
import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      start: 0,
    };
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  startTimer() {
    const { time, start } = this.state;
    this.setState({
      start: Date.now() - time,
      isOn: true,
    });
    this.timer = setInterval(() => this.setState({
      time: Date.now() - start,
    }), 1);
  }

  stopTimer() {
    this.setState({ isOn: false });
    clearInterval(this.timer);
  }

  resetTimer() {
    this.setState({ time: 0 });
  }

  render() {
    const { isOn } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Text>{ms(time)}</Text>
      </View>
    );
  }
}
