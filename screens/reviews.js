import React, {useState,useEffect} from 'react';
import {View, StyleSheet, ScrollView, FlatList, Text,ActivityIndicator} from 'react-native';

import {Divider} from 'react-native-paper';
import Header from '../components/header';
import {getCollectionDocumentByField,getCollectionByField} from '../firebase/helpers';
import {convertToArray} from '../utils/helpers';
import {useDispatch, useSelector} from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';

function Reviews({navigation}) {
  const [date, setDate] = useState(new Date().toDateString());
  const [data,setdata]=useState([]);
  const [loading, setloading] = useState(true)
  const stateProps = useSelector(({User}) => {
    return {
      ...User,
    };
  });
  const {fullname,uid, phoneNumber, approved} = stateProps;
  useEffect(() => {
    console.log(uid);
    getCollectionByField("Rattings","vendorid",uid).then(p=>{
      var y=convertToArray(p);
      y.forEach(element => {
        getCollectionDocumentByField("users","id",element.uid).then((d)=>{
          var t =data;
          t.push({
           uid:d.data().id,
           Name:d.data().username,
           rate:element.ratting,
           comment:element.comments
       });
       setdata(t);
      })
    })
    setloading(false);
  });
    
    
  }, [])


  return (
    <View style={styles.container}>
      <Header title="Reviews" onPress={() => navigation.openDrawer()} />
      {loading ? (
    <ActivityIndicator
      style={{marginTop: '0%'}}
      size={'large'}
      color={'red'}
    />): (
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={data}
            //keyExtractor={(item)=>item.uid}
            renderItem={({item}) => (
              <View>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <View > 
                    <Text style={styles.name}>{item.Name}</Text>
                  </View>
                  <View>
                    <Text style={styles.star}><Icon name="star" size={12} color="white" />{item.rate}</Text>
                  </View>
                </View>
                  {/* <View>
                    <Text style={styles.date}>{date}</Text>
                  </View> */}

                <Text style={styles.review}>
                 {item.comment}
                </Text>
                <Divider />
              </View>
            )}
          />
        </ScrollView>
      </View>
    )}
    </View>
  );
}

export default Reviews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
  },
  content: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 100,
  },
  name: {
    paddingTop: 10,
    fontSize: 16,
    height: 40,
    fontFamily:'Montserrat-SemiBold',
  },
  star:{
    backgroundColor:'#DFA21E',
    borderRadius:5,
    paddingHorizontal:5,
    color:'white',
    fontSize:12,
    marginTop:10,
    fontFamily:'Montserrat-Regular',
  },
  review: {
    fontSize: 12,
    height: 30,
    fontFamily:'Montserrat-Regular',
  },
  date: {
    fontSize: 10,
    height: 20,
    color: 'grey',
    fontFamily:'Montserrat-Regular',
  },
});
