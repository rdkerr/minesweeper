import React from 'react';
import {
  View, Text, StyleSheet, Button, TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'darkgrey',
    flex: 1,
    margin: 1,
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'FontAwesome',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  greenBomb: {
    fontFamily: 'FontAwesome',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
    color: 'green',
  },
  redBomb: {
    fontFamily: 'FontAwesome',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
    color: 'red',
  },
  flag: {
    fontFamily: 'FontAwesome',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
    color: 'silver',
  }
});

const getContents = (value, onPress, onLongPress) => {
  let result;
  if (value >= 10 || value === -10) {
    result = (
      <View style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
        <TouchableHighlight style={{ flex: 1 }} onLongPress={onLongPress}>
          <Text style={styles.flag}>&#xf024;</Text>
        </TouchableHighlight>
      </View>
    );
  } else if (value > 0 || value === -9) {
    result = (
      <View style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
        <TouchableHighlight style={{ flex: 1 }} onPress={onPress} onLongPress={onLongPress}>
          <Text />
        </TouchableHighlight>
      </View>
    );
  } else if (value > -9) {
    const val = value === -8 ? '' : (value + 8).toString();
    result = (<Text style={styles.text}>{val}</Text>);
  } else if (value === -11) {
    result = (<Text style={styles.redBomb}>&#xf1e2;</Text>);
  } else if (value === -12) {
    result = (<Text style={styles.greenBomb}>&#xf1e2;</Text>);
  }
  return result;
};

const Tile = (props) => {
  const { value, onPress, onLongPress } = props;
  return (
    <View style={styles.container}>
      {getContents(value, onPress, onLongPress)}
    </View>
  );
};

export default Tile;
