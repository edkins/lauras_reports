import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {Button, View} from 'react-native';
import CameraScreen from './CameraScreen';
import PicsScreen from './PicsScreen';
import ReportsScreen from './ReportsScreen';
import EditReportScreen from './EditReportScreen';
import { ReportContext, ReportProvider } from './ReportContext';

const Stack = createStackNavigator();

function AppStack() {
  const navigation = useNavigation();
  return (
        <Stack.Navigator
        screenOptions={{
            headerTitleAlign: 'center',
            headerTitleStyle: {fontWeight: 'bold'},
            headerLeft: () => (
            <View style={{marginLeft: 10}}>
                <Button title="Reports" onPress={() => navigation.navigate('Reports')} />
            </View>
            ),
            headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
                <View style={{marginRight: 10}}>
                <Button title="Pics" onPress={() => navigation.navigate('Pics')} />
                </View>
                <View style={{marginRight: 10}}>
                <Button title="Camera" onPress={() => navigation.navigate('Camera')} />
                </View>
            </View>
            ),
        }}>
        <Stack.Screen name="Reports" component={ReportsScreen} />
        <Stack.Screen name="EditReport" component={EditReportScreen} />
        <Stack.Screen name="Pics" component={PicsScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <ReportProvider>
        <NavigationContainer>
        <AppStack />
        </NavigationContainer>
    </ReportProvider>
  );
}