import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { ProfileStackParams } from './ProfileStackPage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavoriteItem from '../components/favorites/FavoriteItem';

interface FavoritesProps {
    id: number,
    type: number,
    code: number,
    target: number,
}

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState<FavoritesProps[]>([]);
    const isFocused = useIsFocused();
    const [updated, setUpdated] = useState<number>(Date.now());
    const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParams>>();

    const storeData = async (value: any) => {
        try {
            await AsyncStorage.setItem('favorites', '');
            // const x = await AsyncStorage.getItem('my-key');
            setFavorites([]);
            } catch (e) {
            // saving error
        }
    };

    useEffect(() => {
        console.log('FAV EFF');
        
        (async () => {
            let data: any = await AsyncStorage.getItem('favorites');
            console.log('eff', data);

            if (!!data) {
                data = JSON.parse(data);

                setFavorites(data);
            }
        })();
    }, [updated, isFocused]);

    return(
        <View>
            <ScrollView style={styles.main}>
                <View style={styles.mainWrapper}>
                    {!!favorites && favorites.map(({
                        id,
                        target,
                        code,
                        type,
                    }, index) => (
                        <FavoriteItem
                            key={index}
                            id={String(id)}
                            barcode={code}
                            callback={() => setUpdated(Date.now())}
                        />
                        // <Text style={styles.text}>{analog.barcode}</Text>
                    ))}
                </View>
            </ScrollView>
            {/* <Button
                title='test'
                onPress={() => storeData('X' + Date.now())}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#036C5520',
        height: '100%',
        paddingHorizontal: 16,
    },
    mainWrapper: {
        display: 'flex',
        gap: 20,
        marginVertical: 20,
    },
    text: {
        fontSize: 20,
        color: 'black'
    },
});

export default FavoritesPage;