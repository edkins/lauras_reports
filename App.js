import { Camera, CameraType } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { useState } from 'react';

export default function App() {
  const [modeScreen, setModeScreen] = useState('reports');
  const [type, setType] = useState(CameraType.back);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={{flex: 1}}>
          <Button
              title="Reports"
              color={modeScreen === 'reports' ? colorActive : colorGrey}
              onPress={() => setModeScreen('reports')}
          />
        </View>
        <View style={{flex: 1}}>
          <Button
              title="Pics"
              color={modeScreen === 'pics' ? colorActive : colorGrey}
              onPress={() => setModeScreen('pics')}
          />
        </View>
        <View style={{flex: 1}}>
          <Button
              title="Camera"
              color={modeScreen === 'camera' ? colorActive : colorGrey}
              onPress={async () => {
                const mediaPermission = await MediaLibrary.requestPermissionsAsync();
                const cameraPermission = await Camera.requestCameraPermissionsAsync();
                if (mediaPermission.status === 'granted' && cameraPermission.status === 'granted') {
                  setModeScreen('camera');
                }
              }}
          />
        </View>
      </View>
      {
        (modeScreen === 'reports') ?
          <View>
            <Text>Reports</Text>
          </View>
        : (modeScreen === 'pics') ?
          <View>
            <Text>Pics</Text>
          </View>
        : (modeScreen === 'camera') ?
          <>
            <Camera style={styles.camera} type={type} ref={(r) => camera=r} useCamera2APi={true}>
            </Camera>
            <View>
              <Button
                title="Take Picture"
                onPress={async () => {
                  if (this.camera) {
                    console.log('Taking picture...');
                    const photo = await camera.takePictureAsync();
                    console.log('Picture taken!', photo);
                    await MediaLibrary.saveToLibraryAsync(photo.uri);
                    console.log('Picture saved!');
                  } else {
                    console.log('Camera not ready');
                  }
                }}
              />
            </View>
          </>
        : null
      }
    </SafeAreaView>
  );
}

const colorGrey = '#ccc';
const colorActive = '#f80';
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  wideButton: {
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  camera: {
    width: 300,
    height: 300,
  },
});
