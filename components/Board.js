/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import Tile from './Tile';

const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: 'darkgrey',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
});

const indexes = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
];

const Board = (props) => {
  const { board, onPress } = props;
  return (
    <View style={styles.container}>
      {indexes.map((_, i) => (
        <View style={styles.row} key={`row-${i}`}>
          {indexes.map((__, j) => <Tile value={board[(i * 10) + j]} onPress={() => onPress(i, j)} key={`${i}-${j}`} />)}
        </View>
      ))}
    </View>
  );
};

export default Board;
