import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image, ScrollView, TextInput, Alert, Button} from 'react-native';
import {ReportContext} from './ReportContext';
import {getPic, updatePic, deletePic} from './Database';
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
    navigation.goBack();
  };

  const handleDeletePic = async () => {
    Alert.alert(
      'Delete Picture',
      'Are you sure you want to delete this picture from the database? (It will remain in your photos folder)',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await deletePic(route.params.id);
            navigation.navigate('Pics');
          },
        },
      ],
      {cancelable: false},
    );
  };


  return (
    <View style={{flex:1}}>
    <ScrollView>
      <View>
        <Image source={{uri: route.params.uri}} style={{width: 200, height: 200}} />
        <Text>{pic.text}</Text>
        <Text>{pic.date}</Text>
        <TextInput multiline={true} numberOfLines={4} placeholder="Add comment" value={pic.comments} onChangeText={(comments) => setPic({...pic, comments})} />
        <Button title="Save" onPress={handleSaveComment} />
      </View>
    </ScrollView>
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
      <Button title="Delete from database" onPress={handleDeletePic} color="red"/>
    </View>
    </View>
);
}