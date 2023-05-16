import { Camera, CameraType } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { useState } from 'react';

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = Camera.useCameraPermissions();
  return (
    <View style={styles.container}>
      {
        (hasPermission) ?
          <Camera style={styles.camera} type={type} ref={(r) => camera=r}>
            <View style={styles.buttonContainer}>
              <Button
                title="Flip Camera"
                onPress={() => {
                  setType(
                    type === CameraType.back
                      ? CameraType.front
                      : CameraType.back
                  );
                }}
              />
              <Button
                title="Take Picture"
                onPress={async () => {
                  if (this.camera) {
                    const mediaPermission = await MediaLibrary.requestPermissionsAsync();
                    console.log(mediaPermission);
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
          </Camera>
        :
          <Text>No access to camera/media</Text>
      }
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: 300,
    height: 300,
  },
});
