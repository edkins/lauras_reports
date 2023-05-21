import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation, useNavigationState} from '@react-navigation/native';
import React from 'react';
import {Button, View} from 'react-native';
import CameraScreen from './CameraScreen';
import PicsScreen from './PicsScreen';
import ReportsScreen from './ReportsScreen';
import EditReportScreen from './EditReportScreen';
import { ReportProvider } from './ReportContext';
import CommentScreen from './CommentScreen';

const Stack = createStackNavigator();

function AppStack() {
  const navigation = useNavigation();
  const routes = useNavigationState((state) => state?.routes);
  const currentRouteName = routes ? routes[routes.length - 1].name : '';
  return (
        <Stack.Navigator
        screenOptions={{
            headerTitleAlign: 'center',
            headerTitleStyle: {fontWeight: 'bold'},
            headerLeft: () => (
            <View style={{marginLeft: 10}}>
                <Button title="Reports" onPress={() => navigation.navigate('Reports')}
                  color={currentRouteName === 'Reports' ? 'green' : undefined}/>
            </View>
            ),
            headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
                <View style={{marginRight: 10}}>
                <Button title="Pics" onPress={() => navigation.navigate('Pics')}
                  color={currentRouteName === 'Pics' ? 'green' : undefined} />
                </View>
                <View style={{marginRight: 10}}>
                <Button title="Camera" onPress={() => navigation.navigate('Camera')}
                  color={currentRouteName === 'Camera' ? 'green' : undefined} />
                </View>
            </View>
            ),
        }}>
        <Stack.Screen name="Reports" component={ReportsScreen} />
        <Stack.Screen name="EditReport" component={EditReportScreen} />
        <Stack.Screen name="Pics" component={PicsScreen} />
        <Stack.Screen name="Comment" component={CommentScreen} />
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