import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Camera, CameraView, } from 'expo-camera/next';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { ScannerStackParams } from './ScannerStackPage';
import Svg, { Path } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScannerPage = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ScannerStackParams>>();

    let screen = Dimensions.get("window");
    
    const [isScanned, setIsScanned] = useState<any>(false);
    const [hasPermission, setHasPermission] = useState<any>(null);

    const getBarCodeScannerPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    const handleBarcodeScan = async (data: any) => {
        if (isScanned) {
            return undefined;
        }

        if (
            data.boundingBox.origin.x >= (screen.height / 2 - 100)
            && data.boundingBox.origin.x <= (screen.height / 2 + 100)
            && data.boundingBox.origin.y >= (screen.width / 4 - 50)
            && data.boundingBox.origin.y <= (screen.width / 4 + 50)
        ) {
            setIsScanned(true);
            setTimeout(() => {
                setIsScanned(false);
            }, 5000);

            // TODO переделать не REDUX
            await openProduct({
                type: Number(data.type),
                code: Number(data.data),
                target: Number(data.target)
            });
        }
    };

    interface OpenProductProps {
        type: number,
        code: number,
        target: number,
    };

    const openProduct = async (props: OpenProductProps) => {
        const {
            type,
            code,
            target
        } = props;
        
        try {
            const history = await AsyncStorage.getItem('history');
            let historyArray: any = [];

            if (!!history) {
                historyArray = JSON.parse(history);
                historyArray.push({
                    id: Date.now(),
                    type,
                    code,
                    target,
                });
            } else {
                historyArray.push({
                    id: Date.now(),
                    type,
                    code,
                    target,
                });
            }

            await AsyncStorage.setItem('history', JSON.stringify(historyArray));
            } catch (e) {
            console.log(e);
        }

        navigation.navigate('ProductPage', {
            type,
            code,
            target,
        });
    };

    useEffect(() => {
        getBarCodeScannerPermissions();
    }, []);

    if (hasPermission === null) {
        return <Text>Разрешите приложению доступ к камере</Text>;
    }

    if (hasPermission === false) {
        return <Text>Нет доступа к камере. Перейдите в настройки.</Text>;
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                onBarcodeScanned={(e) => handleBarcodeScan(e)}
            >
                <View style={styles.maskOutter}></View>
                <View style={styles.maskInner}>
                    <View style={styles.maskInnerFrame}></View>
                    <View style={styles.maskInnerCamera}>
                        <View style={styles.maskInnerCameraBox}>
                            <View style={[styles.maskInnerCameraBoxIcon, styles.maskInnerCameraBoxTopLeft]}>
                                <Svg width="100%" height="100%" viewBox="0 0 46 46" fill="none">
                                    <Path d="M43 3H3V43" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                                </Svg>
                            </View>
                            <View style={[styles.maskInnerCameraBoxIcon, styles.maskInnerCameraBoxTopRight]}>
                                <Svg width="100%" height="100%" viewBox="0 0 46 46" fill="none">
                                    <Path d="M43 3H3V43" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                                </Svg>
                            </View>
                            <View style={[styles.maskInnerCameraBoxIcon, styles.maskInnerCameraBoxBottomLeft]}>
                                <Svg width="100%" height="100%" viewBox="0 0 46 46" fill="none">
                                    <Path d="M43 3H3V43" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                                </Svg>
                            </View>
                            <View style={[styles.maskInnerCameraBoxIcon, styles.maskInnerCameraBoxBottomRight]}>
                                <Svg width="100%" height="100%" viewBox="0 0 46 46" fill="none">
                                    <Path d="M43 3H3V43" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                                </Svg>
                            </View>
                        </View>
                    </View>
                    <View style={styles.maskInnerFrame}></View>
                </View>
                <View style={styles.maskOutter}></View>
            </CameraView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        display: 'flex',
    },
    maskOutter: {
        flex: 2,
        backgroundColor: '#000000',
        opacity: 0.8,
    },
    maskInner: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    maskInnerFrame: {
        flex: 1,
        backgroundColor: '#000000',
        opacity: 0.8,
    },
    maskInnerCamera: {
        flex: 10,
    },
    maskInnerCameraBox: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    maskInnerCameraBoxIcon: {
        position: 'absolute',
        width: 40,
        height: 40,
    },
    maskInnerCameraBoxTopLeft: {
        top: -1,
        left: -1,
    },
    maskInnerCameraBoxTopRight: {
        top: -1,
        right: -1,
        transform: [{ rotate: '90deg'}],
    },
    maskInnerCameraBoxBottomLeft: {
        bottom: -1,
        left: -1,
        transform: [{ rotate: '-90deg'}],
    },
    maskInnerCameraBoxBottomRight: {
        bottom: -1,
        right: -1,
        transform: [{ rotate: '180deg'}],
    },
})

export default ScannerPage;