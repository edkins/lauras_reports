import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {deleteReport, saveReport} from './Database';

export default function EditReportScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [report, setReport] = useState(route.params.report);

  const handleSaveReport = async () => {
    try {
      await saveReport(report);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred while saving the report.', [{text: 'OK'}]);
    }
  };

  const handleDeleteReport = () => {
    Alert.alert(
      'Delete Report',
      'Are you sure you want to delete this report?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteReport(report.id);
              navigation.goBack();
            } catch (error) {
              console.log(error);
              Alert.alert('Error', 'An error occurred while deleting the report.', [{text: 'OK'}]);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={{flex: 1, padding: 16}}>
      <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 16}}>Edit Report</Text>
      <TextInput
        style={{borderWidth: 1, borderColor: 'gray', padding: 8, marginBottom: 16}}
        placeholder="Report Name"
        value={report.name}
        onChangeText={(text) => setReport({...report, name: text})}
      />
      <TextInput
        style={{borderWidth: 1, borderColor: 'gray', padding: 8, marginBottom: 16, height: 100}}
        placeholder="Comments"
        multiline={true}
        value={report.comments}
        onChangeText={(text) => setReport({...report, comments: text})}
      />
      <Button title="Save Report" onPress={handleSaveReport} />
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Button title="Delete Report" onPress={handleDeleteReport} color='red' />
      </View>
    </View>
  );
}