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
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: '#A40F13',
    marginHorizontal: 5,
    paddingVertical:8
  },
  textred: {
    fontSize: 15,
    color: '#A40F13',
    fontFamily:'Montserrat-SemiBold'
  },
  backgroundred: {
    borderRadius: 10,
    backgroundColor: '#A40F13',
    paddingHorizontal: 10,
    marginHorizontal: 5,
    paddingVertical:8
  },
  textwhite: {
    fontSize: 15,
    color: 'white',
    fontFamily:'Montserrat-SemiBold'
  },
});

export default AppButton;
