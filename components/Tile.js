import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'powderblue',
    width: 40,
    height: 50,
    borderColor: '#555555',
    borderStyle: 'solid',
    borderWidth: 2,
  },
});

const Tile = (props) => {
  const { value } = props;
  return (
    <View style={styles.container}>
      <Text>{value}</Text>
    </View>
  );
};

export default Tile;
