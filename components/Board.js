/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import Tile from './Tile';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
  },
});

const Board = (props) => {
  const { board } = props;
  return (
    <View>
      <Text>Something</Text>
      <View style={styles.container}>
        {board.map((row, index) => row.map((element, colIndex) => <Tile key={`${index}-${colIndex}`} value={element} />))}
      </View>
    </View>
  );
};

export default Board;
