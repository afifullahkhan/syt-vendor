import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

function AppButton(props) {
  const status = props.isTrue;

  return (
    <Button
      title={props.title}
      onPress={props.onPress}
      buttonStyle={
        status == '1' ? styles.backgroundwhite : styles.backgroundred
      }
      titleStyle={status == '1' ? styles.textred : styles.textwhite}
    />
  );
}

const styles = StyleSheet.create({
  backgroundwhite: {
    borderRadius: 8,
    backgroundColor: 'white',
    paddingHorizontal: 25,
    borderWidth:1,
    borderColor:'#A40F13',
    marginHorizontal:5
  },
  textred: {
    fontSize: 19,
    color: '#A40F13',
  },
  backgroundred: {
    borderRadius: 10,
    backgroundColor: '#A40F13',
    paddingHorizontal: 25,
    marginHorizontal:5
  },
  textwhite: {
    fontSize: 19,
    color: 'white',
  },
});

export default AppButton;
