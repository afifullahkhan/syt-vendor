/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Plancard from '../components/planscard';
import FB from '../components/floatingbutton';

import Header from '../components/header';
import { useEffect } from 'react';
import { deletePlan, getPlans } from '../redux/Actions/PlanActions';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { MappedElement } from '../utils/helpers';

function Plan({navigation}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlans());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const stateProps = useSelector(({Plans}) => {
    return {...Plans};
  });
  const {loading, data} = stateProps;
  if (loading) {
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
    <Header title="Plans" onPress={() => navigation.openDrawer()} />
    <View style={styles.content}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MappedElement
          data={data}
          renderElement={(obj, index) => {
            return (
              <Plancard
                plan={obj}
                key={obj.id?obj.id:''}
                onDelete={(id) =>
                    dispatch(deletePlan(id, () => dispatch(getPlans())))
                  }
              />
            );
          }}
        />
      </ScrollView>
    </View>
    <FB onPress={() => navigation.navigate('Createplan')} />
  </View>
  );
}

export default Plan;

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
