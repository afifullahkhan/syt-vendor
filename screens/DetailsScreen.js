import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  ScrollView,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Item, Input, Icon} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import {
  getImagefromFBStorage,
  insertToFirestore,
  uploadImageToStorage,
} from '../firebase/helpers';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {getUserDetails} from '../redux/Actions/UserActions';
const DetailsScreen = ({onSave}) => {
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [imageNic, setimageNic] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
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
      }
    });
  };
  const onSelectNicImage = () => {
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
        setimageNic(uri);
      }
    });
  };
  const handleSave = () => {
    if (fullname === '' || address === '' || imageUri === '' || imageNic === '') {
      alert('Fill all the information!');
      return;
    }
    setLoading(true);
    uploadImageToStorage(
      'vendors/' + auth().currentUser.phoneNumber,
      imageUri,
      (imgUri) => {
        uploadImageToStorage(
          'vendors/Nic' + auth().currentUser.phoneNumber,
          imageNic,
          (imageNic) => {
            insertToFirestore(
              {
                uid: auth().currentUser.uid,
                fullname,
                phoneNumber: auth().currentUser.phoneNumber,
                address,
                Nicimg:imageNic.metadata.fullPath,
                image: imgUri.metadata.fullPath,
                approved: false,
                Active:true
              },
              'vendors',
              async () => {
                const imgUrl = await getImagefromFBStorage(
                  imgUri.metadata.fullPath,
                );
                dispatch(
                  getUserDetails({
                    uid: auth().currentUser.uid,
                    fullname,
                    phoneNumber: auth().currentUser.phoneNumber,
                    address,
                    Nicimg:imageNic.metadata.fullPath,
                    image: imgUrl,
                    approved: false,
                    Active:true
                  }),
                );
                setLoading(false);
                onSave();
              },
            );

          })
      },
    );
  };
  return (
    <ScrollView>
      <ImageBackground
        source={require('../assets/bg.jpeg')}
        style={styles.container}>
        <View>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            marginTop: '20%',
          }}>
          {loading ? (
            <ActivityIndicator
              style={{marginTop: '0%'}}
              size={'large'}
              color={'white'}
            />
          ) : (
            <>
              <Text style={{fontSize: 20, color: 'white'}}>
                Enter your details first
              </Text>
              <Item rounded style={styles.inputtext}>
                <Icon active name="person" style={styles.icons3} />
                <Input
                  style={styles.setinput}
                  placeholderTextColor="grey"
                  value={fullname}
                  onChangeText={(t) => setFullname(t)}
                  placeholder="Enter your restaurant name"
                />
              </Item>
              <Item rounded style={styles.inputtext}>
                <Icon
                  active
                  name="mail-open"
                  type={'Ionicons'}
                  style={styles.icons3}
                />
                <Input
                  style={styles.setinput}
                  placeholderTextColor="grey"
                  value={address}
                  onChangeText={(t) => setAddress(t)}
                  placeholder="Enter your address"
                />
              </Item>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttontext} onPress={() => onSelectImage()}>
                  Select image
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttontext} onPress={() => onSelectNicImage()}>
                  Select Nic
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttontext} onPress={() => handleSave()}>
                  Save
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ImageBackground>
    </ScrollView>
  );
};
export default DetailsScreen;
const styles = StyleSheet.create({
  container: {
    resizeMode: 'cover',
    width: '100%',
    height: 680,
    flex: 1,
  },

  logo: {
    width: '65%',
    height: 105,
    display: 'flex',
    alignSelf: 'center',
    marginTop: '20%',
  },

  inputtext: {
    borderColor: '#ffffff',
    borderRadius: 16,
    backgroundColor: 'white',
    fontFamily: 'century-gothic',
    marginTop: 15,
    height: 45,
    width: '80%',
    padding: 10,
    opacity: 0.95,
  },

  icons1: {
    fontSize: 18,
    borderRightWidth: 1,
    color: '#54AC3C',
  },

  icons2: {
    fontSize: 18,
    borderRightWidth: 1,
    marginLeft: 4,
    color: '#54AC3C',
  },

  icons3: {
    fontSize: 18,
    borderRightWidth: 1,
    marginLeft: 3,
    color: '#54AC3C',
  },

  setinput: {
    fontSize: 13,
  },

  text: {
    color: 'white',
    fontFamily: 'century-gothic',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 3,
    textShadowColor: 'grey',
    textShadowOffset: {width: 0.3, height: 0.2},
    textShadowRadius: 1,
  },

  button: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 12,
    paddingLeft: 40,
    paddingRight: 40,
    alignItems: 'center',
    marginTop: 30,
    opacity: 0.95,
  },

  buttontext: {
    color: '#B41116',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
