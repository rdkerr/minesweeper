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
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Board from './components/Board';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flex: 1,
    backgroundColor: 'slategray',
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
  titleWords: {
    fontFamily: 'FontAwesome',
    fontSize: 45,
    margin: 10,
    textAlign: 'center',
    color: 'silver',
  },
});

const checkHelper = (board, row, col) => {
  for (let i = Math.max(0, row - 1); i < Math.min(10, row + 2); i++) {
    for (let j = Math.max(0, col - 1); j < Math.min(10, col + 2); j++) {
      if (board[(i * 10) + j] === 1 || board[(i * 10) + j] === 2) {
        // eslint-disable-next-line no-param-reassign
        board[(i * 10) + j] -= 9;
        checkHelper(board, i, j);
      }
    }
  }
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: Array.from({ length: 100 }, () => 1),
      mines: 10,
      size: 10,
      remaining: 100,
    };
    this.check = this.check.bind(this);
    this.toggleFlag = this.toggleFlag.bind(this);
  }

  componentDidMount() {
    this.resetBoard();
  }

  getBoard() {
    const { mines, size } = this.state;
    let count = 0;
    const newBoard = Array.from({ length: size * size }, () => 1);
    while (count < mines) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      if (newBoard[(row * size) + col] !== -9) {
        newBoard[(row * size) + col] = -9;
        count += 1;
        for (let i = Math.max(0, row - 1); i < Math.min(size, row + 2); i++) {
          for (let j = Math.max(0, col - 1); j < Math.min(size, col + 2); j++) {
            if (newBoard[(i * size) + j] !== -9) {
              newBoard[(i * size) + j] += 1;
            }
          }
        }
      }
    }
    return newBoard;
  }

  resetBoard() {
    this.setState({
      board: this.getBoard(),
    });
  }

  check(row, col) {
    const { board, size } = this.state;
    let newValue = board[(row * size) + col];
    if (newValue === -9) {
      newValue -= 2;
    } else {
      newValue -= 9;
    }
    const newBoard = Array.from(board);
    newBoard[(row * size) + col] = newValue;
    if (newValue === -8) {
      checkHelper(newBoard, row, col);
    }
    const rem = newBoard.reduce((res, el) => (el > 0 ? res + 1 : res), 0);
    this.setState({ board: newBoard, remaining: rem });
    if (rem === 0) {
      this.reveal();
    }
  }

  toggleFlag(row, col) {
    const { board, size, remaining } = this.state;
    let value = board[(row * size) + col];
    if (value > 9) {
      value -= 9;
    } else if (value > 0) {
      value += 9;
    } else {
      value = value === -9 ? -10 : -9;
    }
    const newBoard = Array.from(board);
    newBoard[(row * size) + col] = value;
    this.setState({ board: newBoard });
    console.warn(remaining);
  }

  reveal() {
    const { board } = this.state;
    const newBoard = Array.from(board);
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === -9 || newBoard[i] === -10) {
        newBoard[i] = -12;
      }
    }
    this.setState({ board: newBoard });
  }

  render() {
    const { board, remaining } = this.state;
    console.warn(remaining);
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleWords}>MINE &#xf1e2; SWEEPER</Text>
        </View>
        <Board board={board} onPress={this.check} onLongPress={this.toggleFlag} />
        <View style={styles.buttons} />
        <View style={styles.scoreboard}>
          <Text><FontAwesome>{Icons.bomb}</FontAwesome></Text>
        </View>
      </View>
    );
  }
}


// <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//         <Text style={styles.instructions}>Test</Text>
