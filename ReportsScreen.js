import React, {useState, useEffect, useContext} from 'react';
import {View, Button, ScrollView, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {listReports, ensureExists} from './Database';
import {ReportContext} from './ReportContext';
import { extractDateWithWeekday } from './Utils';

export default function ReportsScreen() {
  const navigation = useNavigation();
  const {activeReport, setActiveReport} = useContext(ReportContext);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    ensureExists();
    const unsubscribe = navigation.addListener('focus', async () => {
      const newReports = await listReports();
      setReports(newReports);
    });

    return unsubscribe;
  }, [navigation]);

  const handleEditReport = (report) => {
    setActiveReport(report?.id);
    if (report?.id == null || report?.id === activeReport) {
      navigation.navigate('EditReport', {report});
    }
  };

  return (
    <ScrollView>
      <Button title="New Report" color='orange' onPress={() => handleEditReport({})} />
      {reports.map((report) => (
        <View key={report.id} style={{marginTop: 16}}>
          <Button
            title={report.name || '[Untitled]'}
            onPress={() => handleEditReport(report)}
            color={activeReport && activeReport === report.id ? 'green' : undefined}
          />
          <Text>{`${extractDateWithWeekday(report.date)}, ${report.picture_count} pics`}</Text>
        </View>
      ))}
    </ScrollView>
  );
}