import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Picker,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/header';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {addMenuItem, getMenuItems} from '../redux/Actions/MenuActions';
import auth from '@react-native-firebase/auth';
import {MultipleSelectPicker} from 'react-native-multi-select-picker';
import {MappedElement} from '../utils/helpers';
const checkboxes = [
  {
    value: 'Milk',
    label: 'Milk',
  },
  {
    value: 'Eggs',
    label: 'Eggs',
  },
  {
    value: 'Fish',
    label: 'Fish',
  },
  {
    value: 'Crustacean',
    label: 'Crustacean',
  },
  {
    value: 'Soybeans',
    label: 'Soybeans',
  },
  {
    value: 'Wheat',
    label: 'Wheat',
  },
  {
    value: 'Peanuts',
    label: 'Peanuts',
  },
  {
    value: 'Tree Nuts',
    label: 'Tree Nuts',
  },
];
function Createmenu({navigation}) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [des, setDes] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedIngredients, setSelectedingredients] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const stateProps = useSelector(({Menu}) => {
    return {
      ...Menu,
    };
  });
  const {loading} = stateProps;
  const additems = () => {
    if (name === '' || price === '' || des === '' || selectedItem === '') {
      alert('Fill all the fields!');
      return;
    }
    dispatch(
      addMenuItem(
        {
          uid: auth().currentUser.uid,
          phoneNumber: auth().currentUser.phoneNumber,
          name: name,
          price: price,
          description: des,
          category: selectedItem,
          ingredients: selectedIngredients,
        },
        () => {
          dispatch(getMenuItems());
          navigation.goBack();
        },
      ),
    );
  };
  if (loading) {
    return (
      <ActivityIndicator
        style={{marginTop: '60%'}}
        size={'large'}
        color={'red'}
      />
    );
  }
  return (
    <View style={styles.container}>
      <Header
        title="Create Menu"
        onPress={() => navigation.goBack()}
        type="back"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View>
            <Text style={styles.text}>Category</Text>
            <View style={styles.input}>
              <Picker
                selectedValue={selectedItem}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedItem(itemValue)
                }
                mode="dropdown"
                itemStyle={{
                  backgroundColor: 'grey',
                  fontFamily: 'Ebrima',
                  fontSize: 15,
                }}>
                <Picker.Item label="Desi" value="desi" />
                <Picker.Item label="Fast Food" value="fastfood" />
                <Picker.Item label="Chinese" value="chinese" />
                <Picker.Item label="BBQ" value="bbq" />
                <Picker.Item label="Pizza" value="pizza" />
                <Picker.Item label="Others" value="others" />
                <Picker.Item label="Beverages" value="beverages" />
                <Picker.Item label="Appetizers" value="appetizers" />
              </Picker>
            </View>
          </View>
          <View>
            <Text style={styles.text}>Item Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setName(text)}
              value={name}
            />
          </View>
          <View>
            <Text style={styles.text}>Price</Text>
            <TextInput
              keyboardType={'number-pad'}
              style={styles.input}
              onChangeText={(text) => setPrice(text)}
              value={price}
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

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.text}>
              Select Ingredients that contains Allergies
            </Text>
          </TouchableOpacity>
          <View style={styles.ingredientsContainer}>
            <MappedElement
              data={selectedIngredients}
              renderElement={(obj, index) => {
                return (
                  <View style={styles.ingredient} key={obj.value}>
                    <Text style={styles.ingredientText}>{obj.value}</Text>
                  </View>
                );
              }}
            />
          </View>

          <View style={styles.button}>
            <Button title="Add" onPress={additems} />
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
            <Text style={styles.modaltext1}>Filter Allergies</Text>
            <Icon
              name="close"
              size={25}
              color="#A40F13"
              style={{marginRight: 5, position: 'absolute', right: 10, top: 25}}
              onPress={() => setModalVisible(false)}
            />
            <MultipleSelectPicker
              items={checkboxes}
              style={{width: 320}}
              onSelectionsChange={(ele) => {
                setSelectedingredients(ele);
              }}
              selectedItems={selectedIngredients}
              checkboxStyle={{height: 20, width: 20}}
            />
            <TouchableOpacity
              style={styles.buttondone}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.buttontext}>Set</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Createmenu;

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
    marginTop: 5,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 12,
    marginVertical: 5,
    paddingHorizontal: 8,
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
  },
  buttontext: {
    color: 'white',
    fontSize: 16,
  },
});
