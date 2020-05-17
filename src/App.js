/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CameraScreen from './screens/CameraScreen';
import RecipeScreen from './screens/RecipeScreen';
import Button from './Button'

const Stack = createStackNavigator();

const HomeScreen = ({route, navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#AAA',
      }}>
        <Image source={require('./images/iu.png')} style={{height: 500, width: 400}}/>
      <View style={{width: '90%'}}>
        <Button
          textColor={'#000'}
          color={'#F90'}
          title="Show me your fridge!"
          onPress={() => navigation.navigate('CameraScreen')}
        />
      </View>
    </View>
  );
};

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{title: "What's in my fridge?"}}
        />
        <Stack.Screen name="CameraScreen" component={CameraScreen} options={{title: "Show me your fridge!"}}/>
        <Stack.Screen name="RecipeScreen" component={RecipeScreen} options={{title: "Here's what we found!"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 30,
  },
});

export default App;
