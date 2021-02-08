import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Item, Icon} from 'native-base';

function Message(props) {
  return (
    <View style={styles.floatbutton}>
      <Item rounded>
        <TextInput
          style={{
            height: 50,
            borderColor: '#B41116',
            borderTopLeftRadius: 30,
            borderBottomLeftRadius: 30,
            borderWidth: 1,
            backgroundColor: 'white',
            width: '93%',
          }}
          // onChangeText={(text) => onChangeText(text)}
          // value={value}
        />
        <Icon active name="send" style={styles.icon} />
      </Item>
    </View>
  );
}

const styles = StyleSheet.create({
  floatbutton: {
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
  },
  icon: {
    position: 'absolute',
    right: 0,
    color: 'white',
    backgroundColor: '#B41116',
    padding: 14,
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    width: 50,
    height: 50,
    borderColor: 'white',
  },
});

export default Message;
