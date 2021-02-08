import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';

import Menucard from '../components/menucard';
import FB from '../components/floatingbutton';
import Header from '../components/header';
import {useDispatch, useSelector} from 'react-redux';
import {deleteMenuItem, getMenuItems} from '../redux/Actions/MenuActions';
import {MappedElement} from '../utils/helpers';

function Menu({navigation}) {
  const dispatch = useDispatch();
  const stateProps = useSelector(({Menu}) => {
    return {
      ...Menu,
    };
  });
  const {loading, data} = stateProps;
  useEffect(() => {
    dispatch(getMenuItems());
  }, []);
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
      <Header title="Menus" onPress={() => navigation.openDrawer()} />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <MappedElement
            data={data}
            renderElement={(obj, index) => {
              return (
                <Menucard
                  item={obj}
                  key={obj.id?obj.id:''}
                  onDelete={(id) =>
                    dispatch(deleteMenuItem(id, () => dispatch(getMenuItems())))
                  }
                />
              );
            }}
          />
        </ScrollView>
      </View>
      <FB onPress={() => navigation.navigate('Createmenu')} />
    </View>
  );
}

export default Menu;

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
});
