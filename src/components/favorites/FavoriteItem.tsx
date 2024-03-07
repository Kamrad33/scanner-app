import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParams } from '../../pages/ProfileStackPage';
import { Product, loadSelectedProducts } from '../../helpers/helpers';
import CrossSvg from '../icons/CrossSvg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface FavoriteProps {
    id: string;
    barcode: number;
    callback?: () => void;
};

const FavoriteItem = ({
    id,
    barcode,
    callback,
}: FavoriteProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParams>>();

    const [item, setItem] = useState<Product>();

    const loadProduct = async (code: number) => {
        const product = await loadSelectedProducts(code);

        return product;
    };

    interface OpenProductProps {
        type: number,
        code: number,
    };

    const openProduct = (props: OpenProductProps) => {
        const {
            type,
            code,
        } = props;

        navigation.navigate('ProductPage', {
            type,
            code,
        });
    };

    const deleteItem = async (id: string) => {
        let data: any = await AsyncStorage.getItem('favorites');
        if (!!data) {
            data = JSON.parse(data);
        }

        const newData = data.filter((item: any) => item.id !== id);
        try {
            await AsyncStorage.setItem('favorites', JSON.stringify(newData));
            } catch (e) {
        }

        callback && callback();
    }

    useEffect(() => {
        (async () => {
            let loaded = await loadProduct(barcode);
            
            setItem(loaded);
        })();
    }, []);

    return (
        <View>
            {!!item && (
                <View style={styles.analog}>
                    <TouchableOpacity
                        style={styles.analogItem}
                        onPress={() => {
                            openProduct({
                                type: Number(item.type),
                                code: Number(item.barcode),
                            });
                        }}
                    >
                        <View style={styles.analogPhoto}>
                            {item && (
                                <Image source={{uri: item.imageSrc}} style={styles.analogPhotoImg}/>
                            )}
                        </View>
                        <View><Text>{item?.name}</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => deleteItem(id)}
                    >
                        <CrossSvg />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    analog: {
        flex: 1,
        width: '100%',
        padding: 20,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
    },
    analogPhoto: {
        width: 100,
        height: 100,
        borderRadius: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,  
        elevation: 1,
    },
    analogPhotoImg: {
        height: '100%',
        objectFit: 'cover',
        borderRadius: 20,
    },
    analogItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    deleteButton: {
        height: 20,
        width: 20,
    },
})

export default FavoriteItem;