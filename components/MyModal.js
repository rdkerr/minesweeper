import React from 'react';
import {
  Modal, Platform, StyleSheet, Text, View, Alert, TouchableHighlight,
} from 'react-native';

export default class MyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  componentDidMount() {
  }

  setModalVisible(newState) {
    this.setState({
      modalVisible: newState,
    });
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
