import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import GetLocation from "react-native-get-location";
import {insertToFirestore} from '../firebase/helpers';
import auth from '@react-native-firebase/auth';

export default class Addresses extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
   await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    }).then(location=>{
    this.setState({
      lat: location.latitude,
      long: location.longitude,
      loading:false,
      x: {
        latitude: location.latitude,
        longitude: location.latitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    });
    })
  }
  state = {
    checked: false,
    lat: 0,
    long: 0,
    loading:true,
    x: {
      latitude: 24.2221531,
      longitude: 54.6860747,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    text: "",
    name:""
  };
  addaddress = () => {
    if (this.state.name !== "") {
        this.setState({loading:true});
      insertToFirestore(
          {
              uid:auth().currentUser.uid,
              name:this.state.name,
              description:this.state.text,
              latitude:this.state.x.latitude,
              longitude:this.state.x.longitude,
              date:new Date()
          },"Addresses",
          ()=>{
            this.setState({loading:false});
              this.props.onSave({
                uid:auth().currentUser.uid,
                name:this.state.name,
                description:this.state.text,
                latitude:this.state.x.latitude,
                longitude:this.state.x.longitude,
                date:new Date()
            });

          }
          )
    } else {
      ToastAndroid.show("Add Name", ToastAndroid.SHORT);
    }
  };
  render() {
    if (this.state.loading) {
        return (
          <ActivityIndicator
            style={{marginTop: '50%'}}
            size={'large'}
            color={'red'}
          />
        );
      }
    return (
      <View style={styles.container}>
          
        <ScrollView>
          <View>
            <MapView
              style={{
                flex: 1,
                width: "100%",
                height: 300,
              }}
              zoom={18}
              initialRegion={{
                latitude: this.state.lat,
                longitude: this.state.long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                draggable
                coordinate={{
                  latitude: this.state.lat,
                  longitude: this.state.long,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                onDragEnd={(e) =>
                  this.setState({ x: e.nativeEvent.coordinate })
                }
              >
                        <Image source={require('../assets/vendorm.png')} style={{height: 35, width:35 }} />

              </Marker>
            </MapView>
            

            <View
              style={{
                backgroundColor: "#fff",
                margin: 10,
                padding: 10,
                borderRadius: 10,
              }}
            >
                <View
                style={{ borderColor: "#f1f1f1",borderWidth:2, margin: 10, padding: 10 }}
              >
                <TextInput
                  onChangeText={(e) => this.setState({ name: e })}
                  placeholder="Address Name"
                ></TextInput>
                </View>
              <View
                style={{ borderColor: "#f1f1f1",borderWidth:2, margin: 10, padding: 10 }}
              >
                <TextInput
                  multiline
                  numberOfLines={4}
                  onChangeText={(e) => this.setState({ text: e })}
                  placeholder="Address Details"
                ></TextInput>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.btnmain}
                  onPress={() => {
                    this.addaddress();
                  }}
                >
                  <View>
                    <Text style={styles.btntext}>
                      Save
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    width: "85%",
    height: "85%",
    backgroundColor: "#fafafa",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  bgwhite: {
    marginTop: 15,
    backgroundColor: "#fff",
    // flexDirection: "row",
    padding: 20,
    marginBottom: 10,
  },

  btnmain: {
    backgroundColor: "#039466",

    width: "80%",
    alignSelf: "center",
    marginTop: 20,

    padding: 10,
  },
  btntext: {
    color: "#fff",
    textAlign: "center",
  },

  SLip: {
    marginTop: 15,
    backgroundColor: "#fff",
    padding: 20,
  },

  sliptext: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
  },

  bgcopun: {
    marginTop: 15,
    backgroundColor: "#fff",
    flexDirection: "row",
    height: 45,
  },

  Inputstyle: {
    width: "70%",
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderColor: "#737373",
    paddingLeft: 10,
    height: "80%",
    alignSelf: "center",
  },

  Checkoffer: {
    width: "30%",
    fontWeight: "bold",
    fontSize: 12,
    color: "#000",
    alignSelf: "center",
    padding: 20,
  },

  Headings: {
    width: "80%",
    fontWeight: "bold",
    fontSize: 12,
    color: "#000",
  },

  Foodname: {
    width: "50%",
    fontWeight: "bold",
    fontSize: 12,
    color: "#000",
  },

  foodPrice: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 12,
    width: "20%",
  },
});