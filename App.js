import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import AuthStack from './Stacks/AuthStack';
import VendorStack from './Stacks/VendorStack';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StyleSheet} from 'react-native';
import {DrawerContent} from './screens/content';
import store from './redux/store';
import {Provider} from 'react-redux';
const Drawer = createDrawerNavigator();
export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  // Handle user state changes
  async function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (initializing) {
    return (
      <ActivityIndicator
        style={{marginTop: '40%'}}
        size={'large'}
        color={'red'}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#F3F4F9" />
        {!user ? (
          <AuthStack />
        ) : (
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="drawer" component={VendorStack} />
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  drawerStyle: {
    borderBottomRightRadius: 45,
    borderTopRightRadius: 55,
    marginTop: 20,
    overflow: 'hidden',
  },
});
