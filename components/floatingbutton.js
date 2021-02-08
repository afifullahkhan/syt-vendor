import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome5';

function FloatingButton(props) {

  return (
    <View style={styles.floatbutton}>
      <Button
        buttonStyle={styles.float}
        onPress={props.onPress}
        icon={<Icon name="plus" size={30} color="#fff" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  floatbutton: {
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
  },
  float: {
    backgroundColor: '#B41116',
    borderRadius: 100,
    width: 60,
    height: 60,
  },
});

export default FloatingButton;
