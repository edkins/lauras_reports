import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image, ScrollView, TextInput, TouchableOpacity, Button} from 'react-native';
import {ReportContext} from './ReportContext';
import {getPic, updatePic} from './Database';
import {useNavigation} from '@react-navigation/native';

export default function CommentScreen({route}) {
  const {activeReport} = useContext(ReportContext);
  const [pic, setPic] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const fetchComments = async () => {
      const newComments = await getPic(route.params.id);
      setPic(newComments);
    };

    fetchComments();
  }, [activeReport, route.params.id]);

  const handleSaveComment = async () => {
    await updatePic(route.params.id, pic.comments);
    navigation.navigate('Camera');
  };

  return (
    <ScrollView>
      <View>
        <Image source={{uri: route.params.uri}} style={{width: 200, height: 200}} />
        <Text>{pic.text}</Text>
        <Text>{pic.date}</Text>
        <TextInput multiline={true} numberOfLines={4} placeholder="Add comment" value={pic.comments} onChangeText={(comments) => setPic({...pic, comments})} />
        <Button title="Save" onPress={handleSaveComment} />
      </View>
    </ScrollView>
  );
}