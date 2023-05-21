import React, {useState, useEffect} from 'react';
import {View, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getReports} from './Database';

export default function ReportsScreen() {
  const navigation = useNavigation();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const newReports = await getReports();
      setReports(newReports);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{flex: 1, padding: 16}}>
      <Button title="New Report" color='green' onPress={() => navigation.navigate('EditReport', {report:{}})} />
      {reports.map((report) => (
        <View key={report.id} style={{marginTop: 16}}>
          <Button title={report.name || '[Untitled]'} onPress={() => navigation.navigate('EditReport', {report})} />
        </View>
      ))}
    </View>
  );
}