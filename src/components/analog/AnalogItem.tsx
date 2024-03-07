import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScannerStackParams } from '../../pages/ScannerStackPage';
import { Product, loadSelectedProducts } from '../../helpers/helpers';

export interface AnalogProps {
    id: string;
    barcode: number;
};

const AnalogItem = ({
    id,
    barcode,
}: AnalogProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<ScannerStackParams>>();

    const [analog, setAnalog] = useState<Product>();

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

        navigation.push('ProductPage', {
            type,
            code,
        });
    };

    useEffect(() => {
        (async () => {
            let loaded = await loadProduct(barcode);
            
            setAnalog(loaded);
        })();
    }, []);

    return (
        <View>
            {!!analog && (
                <TouchableOpacity
                    style={styles.analog}
                    onPress={() => {
                        openProduct({
                            type: Number(analog.type),
                            code: Number(analog.barcode),
                        });
                    }}
                >
                    <View style={styles.analogPhoto}>
                        {analog && (
                            <Image
                                source={{uri: analog.imageSrc}}
                                style={styles.analogPhotoImg}
                            />
                        )}
                    </View>
                    <View>
                        <Text style={styles.analogTitle}>{analog?.name}</Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    analog: {
        flex: 1,
        width: '100%',
    },
    analogPhoto: {
        width: '100%',
        height: 200,
        backgroundColor: '#FFFFFF'
    },
    analogPhotoImg: {
        height: '100%',
        objectFit: 'contain'
    },
    analogTitle: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 12,
        fontWeight: '600',
    }
})

export default AnalogItem;