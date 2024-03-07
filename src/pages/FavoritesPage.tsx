import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
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

    useEffect(() => {
        (async () => {
            let data: any = await AsyncStorage.getItem('favorites');

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
                    ))}
                </View>
            </ScrollView>
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