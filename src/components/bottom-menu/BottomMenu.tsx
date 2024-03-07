import React, { useEffect, useState } from 'react';

import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ScanSvg from '../icons/ScanSvg';
import ProfileSvg from '../icons/ProfileSvg';
import SearchSvg from '../icons/SearchSvg';
// import { PagesEnum } from '../../../Navigator';
import { useNavigation } from '@react-navigation/native';
import { PagesEnum, RootStackParams } from '../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import{ NativeStackNavi } from '@react-navigation/native-stack';

// TODO УСТАРЕВШИЙ
const BottomMenu = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const [state, setState] = useState<string>('');

    const handleLoadPage = (page: PagesEnum) => {
        setState('DA');
        console.log(state, page, navigation);
        // navigation.navigate('X');
        // navigation.navigate('ScannerPage');
    };

    return (
        <View style={styles.bottomMenu}>   
            <TouchableOpacity onPress={() => handleLoadPage(PagesEnum.PROFILE_PAGE)}>
                <View style={styles.bottomMenuButton}>
                    <ProfileSvg />
                    <Text>Профиль</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLoadPage(PagesEnum.SCANNER_PAGE)}>
                <View style={styles.bottomMenuButton}>
                    <ScanSvg />
                    <Text>Сканировать</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLoadPage(PagesEnum.SEARCH_PAGE)}>
                <View style={styles.bottomMenuButton}>
                    <SearchSvg />
                    <Text>Найти</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomMenu: {
        width: '100%',
        height: 60,
        position: 'absolute',
        bottom: 0,
        flex: 1,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    bottomMenuButton: {
        margin: 4,
        display: 'flex',
        alignItems: 'center',
    },
})

export default BottomMenu;