import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {listPics, getReportName} from './Database';
import {ReportContext} from './ReportContext';
import {dateTimeWithWeekday} from './Utils';

export default function PicsScreen() {
  const navigation = useNavigation();
  const [pics, setPics] = useState([]);
  const [reportName, setReportName] = useState('');
  const {activeReport} = useContext(ReportContext);

  useEffect(() => {
    const fetchPics = async () => {
      if (activeReport != null) {
        const newPics = await listPics(activeReport);
        setPics(newPics);
        const newReportName = await getReportName(activeReport);
        setReportName(newReportName);
      }
    };

    const unsubscribe = navigation.addListener('focus', fetchPics);

    return unsubscribe;
  }, [navigation, activeReport]);

  const handlePress = (id) => {
    navigation.navigate('Comment', {id, uri: pics.find(pic => pic.id === id).uri});
  };

  return (
    <ScrollView>
      <View>
        <Text>{reportName}</Text>
        {pics.length === 0 && (
          <View style={{marginTop: 16}}>
            <Text>No pictures yet.</Text>
          </View>
        )}
        {pics.map((pic) => (
          <TouchableOpacity key={pic.id} style={{marginTop: 16}} onPress={() => handlePress(pic.id)}>
            <Image source={{uri: pic.uri}} style={{width: 200, height: 200}} />
            <Text>{dateTimeWithWeekday(pic.date)}</Text>
            <Text>{pic.comments}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}