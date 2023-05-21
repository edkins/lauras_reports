import React, {useState, useRef, useEffect, useContext} from 'react';
import {View, Button, Alert, Text} from 'react-native';
import {Camera, CameraType, requestCameraPermissionsAsync} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import { ReportContext } from './ReportContext';
import { addPic, getReportName } from './Database';
import {useNavigation} from '@react-navigation/native';

export default function CameraScreen() {
  const navigation = useNavigation();
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef(null);
  const {activeReport, setActiveReport} = useContext(ReportContext);
  const [reportName, setReportName] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    (async () => {
      const {status: cameraStatus} = await requestCameraPermissionsAsync();
      const {status: mediaStatus} = await MediaLibrary.requestPermissionsAsync();
      if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
        Alert.alert('Permission denied', 'You need to grant camera and media library permission to use this feature.', [{text: 'OK'}]);
      } else {
        setIsCameraReady(true);
      }
    })();
  }, []);

  useEffect(() => {
    const fetchReportName = async () => {
        if (activeReport != null) {
            const newReportName = await getReportName(activeReport);
            setReportName(newReportName);
        }
        setIsFocused(true);
    };

    const unsubscribe = navigation.addListener('focus', fetchReportName);
    navigation.addListener('blur', () => {
      setIsFocused(false);
    });

    return unsubscribe;
  }, [navigation, activeReport]);

  return (
    <View style={{flex: 1}}>
        <Text>{reportName || '[please select a report]'}</Text>
        {isCameraReady && isFocused && reportName != null && (
          <View style={{aspectRatio: 1, width: wp('100%')}}>
              <Camera style={{flex: 1}} type={type} ref={cameraRef} useCamera2Api={true} ratio="1:1" onCameraReady={() => console.log(`Camera ready: ${type}`)} />
          </View>
        )}
      <View>
        <Button
          title="Take Picture"
          onPress={async () => {
            if (cameraRef.current) {
              console.log('Taking picture...');
              const photo = await cameraRef.current.takePictureAsync();
              console.log('Picture taken!', photo);
              const asset = await MediaLibrary.createAssetAsync(photo.uri);
              console.log(`Picture saved! ${asset}`);
              await addPic(activeReport, asset.uri);
              console.log('Picture added to db!');
            } else {
              console.log('Camera not ready');
            }
          }}
        />
      </View>
    </View>
  );
}