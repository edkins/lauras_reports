import React, {useState, useEffect, useContext} from 'react';
import {View, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getReports, ensureExists} from './Database';
import {ReportContext} from './ReportContext';

export default function ReportsScreen() {
  const navigation = useNavigation();
  const {activeReport, setActiveReport} = useContext(ReportContext);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    ensureExists();
    const unsubscribe = navigation.addListener('focus', async () => {
      const newReports = await getReports();
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
    <View style={{flex: 1, padding: 16}}>
      <Button title="New Report" onPress={() => handleEditReport({})} />
      {reports.map((report) => (
        <View key={report.id} style={{marginTop: 16}}>
          <Button
            title={report.name || '[Untitled]'}
            onPress={() => handleEditReport(report)}
            color={activeReport && activeReport === report.id ? 'green' : undefined}
          />
        </View>
      ))}
    </View>
  );
}