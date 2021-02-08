/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Picker,
  TextInput,
  ScrollView,
} from 'react-native';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuItems } from '../redux/Actions/MenuActions';
import { Modal } from 'react-native';
import { MultipleSelectPicker } from 'react-native-multi-select-picker';
import { ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MappedElement } from '../utils/helpers';
import { addPlan, getPlans } from '../redux/Actions/PlanActions';
import auth from '@react-native-firebase/auth';
function CreatePlan({ navigation }) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [des, setDes] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('Daily');
  // const [days, setDays] = useState('');
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);
  useEffect(() => {
    dispatch(getMenuItems());
  }, []);
  const stateProps = useSelector(({ Menu, Plans }) => {
    return {
      Menu, Plans
    };
  });
  const { data } = stateProps.Menu;
  const { loading } = stateProps.Plans;
  const getMenuItemsInValueLabelObject = (menuItems) => {
    let arr = [];
    menuItems.forEach(element => {
      arr.push({ label: element.name, value: element.id });
    });
    return arr;
  }
  const handleSubmit = () => {
    if (name === '' || price === '' || des === '' || selectedMenuItems.length === 0 ) {
      alert('Fill all the fields!');
      return;
    }
    // if (!(parseInt(days) > 0 && parseInt(days) < 8)) {
    //   alert('Invalid Days, days can be between 1-7');
    //   return;
    // }
    dispatch(
      addPlan(
        {
          resId: auth().currentUser.uid,
          resPhoneNumber: auth().currentUser.phoneNumber,
          name: name,
          price: price,
          description: des,
          menuItems: selectedMenuItems,
          type: selectedType,
        },
        () => {
          dispatch(getPlans());
          navigation.goBack();
        },
      ),
    );
  }
  if (loading) {
    return (
      <ActivityIndicator
        style={{ marginTop: '60%' }}
        size={'large'}
        color={'red'}
      />
    );
  }
  return (
    <View style={styles.container}>
      <Header
        title="Create Plan"
        onPress={() => navigation.goBack()}
        type="back"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View>
            <Text style={styles.text}>Category</Text>
            <View style={styles.input}>
              <Picker
                selectedValue={selectedType}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedType(itemValue)
                }
                mode="dropdown"
                itemStyle={{
                  backgroundColor: 'grey',
                  fontFamily: 'Ebrima',
                  fontSize: 15,
                }}>
              <Picker.Item label="Daily" value="Daily" />
                        <Picker.Item label="Weekly" value="Weekly" />
                        <Picker.Item label="Monthly" value="Monthly" />
              </Picker>
            </View>
          </View>
          <View>
            <Text style={styles.text}>Plan Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setName(text)}
              value={name}
            />
          </View>
          <View>
            <Text style={styles.text}>Price</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setPrice(text)}
              value={price}
              keyboardType="numeric"
            />
          </View>
          <View>
            <Text style={styles.text}>Description</Text>
            <TextInput
              style={styles.inputdes}
              onChangeText={(text) => setDes(text)}
              numberOfLines={5}
              multiline={true}
              value={des}
              maxLength={120}
            />
          </View>
          {/* <View>
            <Text style={styles.text}>Days (1-7):</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setDays(text)}
              value={days}
              maxLength={1}
              keyboardType="numeric"
            />
          </View> */}
          <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}><Text style={styles.text}>Select Menu Items</Text></TouchableOpacity>
            <View style={styles.ingredientsContainer}>
              <MappedElement
                data={selectedMenuItems}
                renderElement={(obj, index) => {
                  return (
                    <View style={styles.ingredient} key={obj.value}>
                      <Text style={styles.ingredientText}>{obj.label}</Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
          <View style={styles.button}>
            <Button title="Add" onPress={handleSubmit} />
          </View>
        </View>
      </ScrollView>
      <Modal animationType={'slide'} transparent={true} visible={modalVisible}>
        <View
          style={{
            display: 'flex',
            flex: 1,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000000aa',
          }}>
          <View style={styles.modal}>
            <Text style={styles.modaltext1}>Menu Items</Text>
            <Icon
              name="close"
              size={25}
              color="#A40F13"
              style={{ marginRight: 5, position: 'absolute', right: 10, top: 25 }}
              onPress={() => setModalVisible(false)}
            />
            <MultipleSelectPicker
              items={getMenuItemsInValueLabelObject(data)}
              style={{ width: 320 }}
              onSelectionsChange={(ele) => {
                setSelectedMenuItems(ele);
              }}
              selectedItems={selectedMenuItems}
              checkboxStyle={{ height: 20, width: 20 }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CreatePlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
  },
  content: {
    width: '85%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  text: {
    color: 'grey',
    fontSize: 15,
    marginVertical: 5,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 12,
    marginVertical: 5,
    paddingHorizontal: 8,
  },
  inputdes: {
    height: 100,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 12,
    marginVertical: 5,
    paddingHorizontal: 8,
    textAlignVertical: 'top',
  },
  button: {
    width: '40%',
    alignSelf: 'center',
    marginTop: 10,
  },

  modal: {
    display: 'flex',
    position: 'absolute',
    flex: 1,
    padding: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    width: '90%',
    alignContent: 'center',
    marginVertical: 70,
    borderRadius: 10,
    paddingTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  modaltext1: {
    textAlign: 'center',
    width: '70%',
    marginTop: 15,
    fontSize: 20,
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  ingredient: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#A40F13',
    marginHorizontal: 3,
  },
  ingredientText: {
    color: 'white',
  },
  buttondone: {
    alignItems: 'center',
    backgroundColor: '#A40F13',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderColor: '#A40F13aa',
    borderWidth: 2,
    width: '100%',
    marginTop: 25,
    zIndex: 999,
  },
  buttontext: {
    color: 'white',
    fontSize: 16,
  },
});
