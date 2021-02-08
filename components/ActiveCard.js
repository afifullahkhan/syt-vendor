import React,{useState,useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity,Switch} from 'react-native';
import {Left, Right, Card, CardItem, View} from 'native-base';
import {Avatar,Slider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    getCollectionDocumentByFieldss,
    updateCollectionDocumentByFieldss
  } from '../firebase/helpers';
  import auth from '@react-native-firebase/auth';
  
function Activecart(props) {
    const [isEnabled, setIsEnabled] = useState(false);
    const [id,setid]= useState('');
    const toggleSwitch = () => {
        updateCollectionDocumentByFieldss("vendors",id,{
            Active:!isEnabled
            });
            setIsEnabled(!isEnabled)
    };
 useEffect(() => {
    console.log(auth().currentUser);
    
    console.log("-----id---------");
    getCollectionDocumentByFieldss("vendors","uid",auth().currentUser.uid).then((re)=>{
      setid(re.docs[0]._ref._documentPath._parts[1]);
      console.log(re.docs[0].data().Active);
      if(re.docs[0].data().Active==null){
        setIsEnabled(true);
      }else{
        setIsEnabled(re.docs[0].data().Active);
      }
    })
    
  }, [])
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.9}
      shadowOpacity={0.9}>
      <Card style={styles.card}>
        <CardItem>
          <Left>
            {props.type === 'icon' ? (
              <View style={{flexDirection: 'row'}}>
                <Icon active name={props.name} size={30} color="grey" />
                <Text style={styles.heading}>{props.title}</Text>
              </View>
            ) : (
              <View style={{flexDirection: 'row',paddingVertical:10}}>
                <Avatar
                  rounded
                  size={70}
                  source={{
                    uri:
                      props.image,
                  }}
                />
                <View style={{alignSelf: 'center'}}>
                  <Text style={styles.heading}>{props.name}</Text>
                  <Text style={styles.email}>{props.email}</Text>
                </View>
              </View>
            )}
          </Left>
          <Right>
            <Switch
             trackColor={{ false: "#767577", true: "#81b0ff" }}
             thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
             ios_backgroundColor="#3e3e3e"
             onValueChange={toggleSwitch}
             value={isEnabled}
              />
          </Right>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
  },
  heading: {
    paddingLeft: 5,
    fontSize: 17,
    fontFamily:'Montserrat-SemiBold',
    alignSelf: 'center',
  },
  email: {
    paddingLeft: 5,
    fontSize: 12,
    fontFamily:'Montserrat-SemiBold',
    color: 'grey',
  },
});

export default Activecart;
