import React, {useState, useRef, useEffect} from 'react';
import {View, Button, Alert} from 'react-native';
import {Camera, CameraType, requestCameraPermissionsAsync} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'

export default function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const {status: cameraStatus} = await requestCameraPermissionsAsync();
      const {status: mediaStatus} = await MediaLibrary.requestPermissionsAsync();
      if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
        Alert.alert('Permission denied', 'You need to grant camera and media library permission to use this feature.', [{text: 'OK'}]);
      }
    })();
  }, []);

  return (
    <View style={{flex: 1}}>
        <View style={{aspectRatio: 1, width: wp('100%')}}>
            <Camera style={{flex: 1}} type={type} ref={cameraRef} useCamera2Api={true} ratio="1:1" />
        </View>
      <View>
        <Button
          title="Take Picture"
          onPress={async () => {
            if (cameraRef.current) {
              console.log('Taking picture...');
              const photo = await cameraRef.current.takePictureAsync();
              console.log('Picture taken!', photo);
              await MediaLibrary.saveToLibraryAsync(photo.uri);
              console.log('Picture saved!');
            } else {
              console.log('Camera not ready');
            }
          }}
        />
      </View>
    </View>
  );
}