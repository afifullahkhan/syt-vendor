import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../components/header';
import Card from '../components/homecard';

function Allreport({navigation}) {
  return (
    <View style={styles.container}>
      <Header
        title="All Report"
        onPress={() => navigation.goBack()}
        type="back"
      />
      <View style={styles.content}>
        <View style={styles.innerdata}>
          <Text style={styles.heading1}>Last 7 Days</Text>
        </View>
        <View style={styles.innercontent}>
          <Card
            number="120"
            title="Orders."
            name="fast-food-outline"
            status="0"
          />
          <Card number="12000" title="Rs." name="cash" status="1" />
        </View>
        <View style={styles.innerdata}>
          <Text style={styles.heading1}>This Month</Text>
        </View>
        <View style={styles.innercontent}>
          <Card
            number="120"
            title="Orders."
            name="fast-food-outline"
            status="0"
          />
          <Card number="12000" title="Rs." name="cash" status="1" />
        </View>
        <View style={styles.innerdata}>
          <Text style={styles.heading1}>Last Month</Text>
        </View>
        <View style={styles.innercontent}>
          <Card
            number="120"
            title="Orders."
            name="fast-food-outline"
            status="0"
          />
          <Card number="12000" title="Rs." name="cash" status="1" />
        </View>
      </View>
    </View>
  );
}

export default Allreport;

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
    marginBottom: 100,
  },
  innercontent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '96%',
    alignSelf: 'center',
    marginTop: 10,
  },
  innerdata:{
    width: '94%',
    alignSelf: 'center',
    marginTop: 10,
  },
  heading1: {
    fontSize: 15,
    fontFamily:'Montserrat-Bold',
  },
});
