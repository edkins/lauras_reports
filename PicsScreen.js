import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {listPics} from './Database'
import {ReportContext} from './ReportContext';

export default function PicsScreen() {
    const navigation = useNavigation();
    const [pics, setPics] = useState([]);
    const {activeReport} = useContext(ReportContext);

    useEffect(() => {
        const fetchPics = async () => {
            if (activeReport != null) {
                const newPics = await listPics(activeReport);
                setPics(newPics);
            }
        };

        const unsubscribe = navigation.addListener('focus', fetchPics);

        return unsubscribe;
    }, [navigation, activeReport]);

    return (
        <ScrollView>
            <View>
                {
                    pics.length === 0 && (
                        <View style={{marginTop: 16}}>
                            <Text>No pictures yet.</Text>
                        </View>
                    )
                }
                {pics.map((pic) => (
                    <View key={pic.id} style={{marginTop: 16}}>
                        <Image source={{uri: pic.uri}} style={{width: 200, height: 200}} />
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}