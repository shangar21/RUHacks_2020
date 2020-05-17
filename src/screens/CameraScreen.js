import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button,
  Alert,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import {localizeObjects, getRecipies} from '../img_process';

import {
  takePicture,
  defaultPictureTakeOptions,
} from 'react-native-camera-hooks/src/takePicture';

const CameraScreen = ({route, navigation, initialProps}) => {
  const [items, setItems] = React.useState([]);
  const [
    {cameraRef, type, ratio, autoFocus, autoFocusPoint, isRecording},
    {
      toggleFacing,
      touchToFocus,
      textRecognized,
      facesDetected,
      recordVideo,
      setIsRecording,
    },
  ] = useCamera(initialProps);

  return (
    <>
      <View>
        <Button color={'blue'} title={'Swap Camera'} onPress={toggleFacing} />
      </View>
      <View style={{flex: 1}}>
        <RNCamera
          ref={cameraRef}
          autoFocusPointOfInterest={autoFocusPoint.normalized}
          type={type}
          ratio={ratio}
          style={{flex: 1}}
          autoFocus={autoFocus}
          onTextRecognized={textRecognized}
          onFacesDetected={facesDetected}
        />
        <View>
          <Button
            color={'gray'}
            title="TAKE PHOTO"
            onPress={async () => {
              try {
                const promise = await takePicture(
                  {cameraRef: cameraRef},
                  defaultPictureTakeOptions,
                );
                const newItems = await localizeObjects(promise.uri);
                Alert.alert("Here's what Google found:", newItems.toString(), [
                  {
                    text: 'GOOGLE BIG STUPID!',
                    style: 'destructive',
                  },
                  {
                    text: 'Google Great!',
                    onPress: () => setItems([...items, ...newItems]),
                  },
                ]);
              } catch (e) {
                console.log(e);
              }
            }}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {items.length > 0 ? (
            <>
              <View style={{flex: 1}}>
                <Button
                  color={'red'}
                  title={'Clear List'}
                  onPress={() => setItems([])}
                />
              </View>
              <View style={{flex: 1}}>
                <Button
                  color={'blue'}
                  title={'View List'}
                  onPress={() =>
                    Alert.alert('Current Fridge List:', items.toString(), [
                      {
                        text: 'Okie Dokie!',
                        style: 'destructive',
                      },
                    ])
                  }
                />
              </View>
              <View style={{flex: 1}}>
                <Button
                  color={'green'}
                  title="GET BEST RECIPE"
                  onPress={async () => {
                    try {
                      console.log(items);
                      navigation.navigate('RecipeScreen', {
                        recipe: await getRecipies(items),
                      });
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                />
              </View>
            </>
          ) : (
            <></>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 30,
  },

  body: {
    flex: 1,
  },

  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default CameraScreen;
