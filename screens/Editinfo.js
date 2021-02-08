import React, {useState,useEffect} from 'react';
import {View, StyleSheet, Text,TouchableOpacity,ActivityIndicator} from 'react-native';
import {Input, Item} from 'native-base';
import {Avatar, Header} from 'react-native-elements';
import {
  getImagefromFBStorage,
  insertToFirestore,
  uploadImageToStorage,
  getCollectionDocumentByFieldss,
  updateCollectionDocumentByFieldss,
  updateFieldInDatabase
} from '../firebase/helpers';
import {useDispatch,useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {getUserDetails} from '../redux/Actions/UserActions';
import Button from '../components/button'
import ImagePicker from 'react-native-image-picker';

function Editinfo(props) {
  const [fullname, setFullname] = useState();
  const [nic, setNic] = useState();
  const [imageUri, setImageUri] = useState('https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg');
  const [loading, setLoading] = useState(true);
  const [id,setid]= useState('');
  const [imgchange, setimgchange] = useState(false)
  const {navigation} = props;
  const dispatch = useDispatch();
  const stateProps = useSelector(({ User }) => {
    return {
      ...User
    };
  });
  useEffect(() => {
    console.log(auth().currentUser);
    getCollectionDocumentByFieldss("riders","uid",auth().currentUser.uid).then((re)=>{
      setid(re.docs[0]._ref._documentPath._parts[1]);
      setFullname(stateProps.fullname);
      setNic(stateProps.nic);
      setImageUri(stateProps.image);
      setLoading(false);
    })
    
  }, [])

  const onSelectImage = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.uri;
        setImageUri(uri);
        setimgchange(true);
      }
    });
  };
  const handleSave = () => {
    if (fullname === '' || nic === '' || imageUri === '') {
      alert('Fill all the information!');
      return;
    }
    setLoading(true);
    console.log(id);
    if(imgchange){
    uploadImageToStorage(
      'riders/' + auth().currentUser.phoneNumber,
      imageUri,
      async (imgUri) => {
              const imgUrl = await getImagefromFBStorage(
              imgUri.metadata.fullPath,
            );
              updateCollectionDocumentByFieldss("riders",id,{
                fullname:fullname,
                nic:nic,
                image: imgUrl,
              }
                ).then(()=>{
                  dispatch(
                    getUserDetails({
                      uid: auth().currentUser.uid,
                      fullname,
                      phoneNumber: auth().currentUser.phoneNumber,
                      nic,
                      image: imgUrl,
                      approved: true,
                    }),
                  );
                setLoading(false);
                props.navigation.goBack();
              })
            }
    )
    }else{
    updateCollectionDocumentByFieldss("riders",id,{
                  fullname:fullname,
                  nic:nic,
                  //image: imgUrl
                }
                  ).then(()=>{
                    dispatch(
                      getUserDetails({
                        uid: auth().currentUser.uid,
                        fullname,
                        phoneNumber: auth().currentUser.phoneNumber,
                        nic,
                        image: imageUri,
                        approved: true,
                      }),
                    );
                  setLoading(false);
                  props.back();
                });
    }
  };
  
  return (
    <View style={styles.container}>
      <Header
        backgroundColor="transparent"
        leftComponent={{
          icon: 'arrow-back',
          color: '#000',
          onPress: () => props.navigation.goBack(),
        }}
        centerComponent={{
          text: 'Edit Information',
          style: {color: '#000', fontSize: 22,fontFamily:'Montserrat-SemiBold'},
        }}
      />
  {loading ? (
    <ActivityIndicator
      style={{marginTop: '0%'}}
      size={'large'}
      color={'red'}
    />): (
      <View style={styles.content}>
      <View style={styles.changeimage}>
          <Avatar
            rounded
            size="large"
            source={{
              uri:
                imageUri,
            }}
          />
          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: 'grey',
                paddingHorizontal: 20,
              }}
              onPress={() => onSelectImage()}>
              Change Image
            </Text>
          </View>
        </View>
        <Item regular style={styles.input}>
          <Input placeholder="Full Name" value={fullname} onChangeText={(txt)=>setFullname(txt)} placeholderTextColor="grey" />
        </Item>
        <Item regular style={styles.input}>
          <Input placeholder="NIC" value={nic} onChangeText={(txt)=>setNic(txt)} keyboardType="number-pad" placeholderTextColor="grey" />
        </Item>
        

        
        <View style={styles.button}>
          <Button
            title="Save"
            isTrue="0"
            onPress={() =>  handleSave()}
          />
        </View>
      </View>
    )} 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(241, 243, 248,0.2)',
    width: '100%',
    alignSelf: 'center',
  },
  content: {
    width: '90%',
    alignSelf: 'center',
  },
  input: {
    marginTop: 10,
    fontFamily:'Montserrat-Regular'
  },
  changeimage: {
    backgroundColor: 'rgba(241, 243, 248,0.9)',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    marginTop: 12,
  },
  button: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 15,
  },
});

export default Editinfo;
