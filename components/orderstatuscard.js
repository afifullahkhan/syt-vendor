import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Orderstatuscard(props) {
  return (
    <TouchableOpacity activeOpacity={1} onPress={props.onPress} >
      <View style={{display: 'flex', flexDirection: 'row'}}>
        
      <Text style={styles.orderstatus}>Processing</Text>
          <Icon name="clipboard-text" size={32} color="#3E86EF" style={{width:"16%"}}/>
        <View>
          <View style={{display: 'flex', flexDirection: 'row',justifyContent:'space-between',width:'100%'}}>
            <Text style={styles.orderno}># {props.orderno}</Text>
          </View>
          <Text style={styles.orderdate}>12 232 231</Text>
        </View>
      </View>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
 orderno:{
    color:'black',
    fontSize:23,
    fontFamily:'Montserrat-Bold'
},
orderstatus:{
    paddingHorizontal:10,
    paddingVertical:3,
    backgroundColor:'#3E86EF',
    color:'white',
    borderRadius:14,
    position:'absolute',
    right:3,
    fontSize:12,
    paddingBottom:5,
    fontFamily:'Montserrat-SemiBold'
},
orderdate:{
    color:'gray',
    fontSize:12,
    marginBottom:3,
    fontFamily:'Montserrat-Regular'

}
 
});

export default Orderstatuscard;
