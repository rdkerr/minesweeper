/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet, Text, View, TouchableHighlight,
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import ms from 'pretty-ms';
import Board from './components/Board';
import Timer from './components/Timer';

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
    flexDirection: 'row',
    backgroundColor: 'beige',
  },
  button: {
    flex: 1,
    backgroundColor: 'darkgray',
  },
  scoreboard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'slategray',
  },
  titleWords: {
    fontFamily: 'FontAwesome',
    fontSize: 45,
    margin: 10,
    textAlign: 'center',
    color: 'silver',
  },
  timer: {
    fontFamily: 'FontAwesome',
    fontSize: 45,
    margin: 10,
    textAlign: 'center',
    justifyContent: 'center',
    color: 'silver',
  },
  timerTitle: {
    flex: 2,
    backgroundColor: 'slategray',
  },
  bombs: {
    fontFamily: 'FontAwesome',
    fontSize: 45,
    margin: 10,
    textAlign: 'center',
    color: 'slategray',
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
      time: 0,
      isOn: false,
    };
    this.check = this.check.bind(this);
    this.getBoard = this.getBoard.bind(this);
    this.toggleFlag = this.toggleFlag.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
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
    const { board, size, isOn } = this.state;
    if (!isOn) {
      this.startTimer();
    }
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
    this.setState({ board: newBoard });
    if (rem === 0) {
      this.reveal();
      this.stopTimer();
      this.resetTimer();
    }
  }

  toggleFlag(row, col) {
    const { board, size } = this.state;
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
  }

  reveal() {
    const { board } = this.state;
    const newBoard = Array.from(board);
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === -9 || newBoard[i] === -10) {
        newBoard[i] = -12;
      } else if (newBoard[i] > 0 && newBoard[i] < 9) {
        newBoard[i] -= 9;
      }
    }
    this.stopTimer();
    this.setState({ board: newBoard });
  }

  startTimer() {
    const now = Date.now();
    this.setState({ isOn: true })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - now,
    }), 1000);
  }

  stopTimer() {
    const { time } = this.state;
    clearInterval(this.timer);
    this.setState({ isOn: false, time });
  }

  resetTimer() {
    this.setState({ time: 0 });
  }

  resetGame() {
    this.stopTimer();
    this.resetTimer();
    this.resetBoard();
  }

  render() {
    const {
      board, time,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleWords}>MINE &#xf1e2; SWEEPER</Text>
        </View>
        <Board board={board} onPress={this.check} onLongPress={this.toggleFlag} />
        <View style={styles.buttons}>
          <View style={styles.button}>
            <Text style={styles.bombs}>&#xf1e2;</Text>
          </View>
          <View style={styles.timerTitle}>
            <Text style={styles.timer}>{ms(time - (time % 1000))}</Text>
          </View>
          <View style={styles.button}>
            <Text style={styles.bombs}>&#xf1e2;</Text>
          </View>
        </View>
        <View style={styles.scoreboard}>
          <View style={styles.timerTitle}>
            <TouchableHighlight onPress={() => this.resetGame()} style={{ flex: 1 }}>
              <Text style={styles.timer}>RESET</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.timerTitle}>
            <TouchableHighlight style={{ flex: 1 }}>
              <Text style={styles.timer}>LOGOUT</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}
