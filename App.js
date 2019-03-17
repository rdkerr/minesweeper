/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  Platform, StyleSheet, Text, View,
} from 'react-native';
import FontAwesome, { Icons, IconTypes } from 'react-native-fontawesome';
import MyModal from './components/MyModal';
import Board from './components/Board';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n'
    + 'Shake or press menu button for dev menu',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flex: 1,
    backgroundColor: 'aqua',
  },
  board: {
    flex: 6,
    backgroundColor: 'blue',
  },
  buttons: {
    flex: 1,
    backgroundColor: 'beige',
  },
  scoreboard: {
    flex: 1,
    backgroundColor: 'brown',
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      user: '',
      modalVisible: false,
    };
    this.resetBoard = this.resetBoard.bind(this);
  }

  componentDidMount() {
    this.resetBoard();
  }

  resetBoard() {
    this.setState({
      board: Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => 0)),
    });
  }

  render() {
    const { modalVisible, board } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={{margin: 10, fontSize: 32, textAlign: 'left'}}>
            <FontAwesome>{Icons.chevronLeft}</FontAwesome>
            Minesweeper
          </Text>
        </View>
        <View style={styles.board} />
        <View style={styles.buttons} />
        <View style={styles.scoreboard} />
      </View>
    );
  }
}


// <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//         <Text style={styles.instructions}>Test</Text>