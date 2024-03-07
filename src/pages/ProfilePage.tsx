import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, BackHandler, Alert } from 'react-native';
import { ProfileStackParams } from './ProfileStackPage';
import { useNavigation } from '@react-navigation/native';

const ProfilePage = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParams>>();

    const showConfirmDialog = () => {
        return Alert.alert(
            "Выйти из приложения?",
            "Вы уверены, что хотите выйти из приложения",
            [
            {
                text: "Да",
                onPress: () => {
                    BackHandler.exitApp();
                },
            },
            {
                text: "Нет",
            },
            ]
        );
    };
    
    return(
        <View style={styles.main}>
            <View style={styles.navButtons}>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => navigation.navigate('HistoryPage')}
                >
                    <Text style={styles.navButtonText}>История</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => navigation.navigate('FavoritesPage')}
                >
                    <Text style={styles.navButtonText}>Избранное</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => navigation.navigate('ComponentsFilterPage')}
                >
                    <Text style={styles.navButtonText}>Фильтр</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.exitButton}
                onPress={() => showConfirmDialog()}
            >
                <Text style={styles.exitButtonText}>Выход</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#036C5520',
        height: '100%',
        padding: 16,
        display: 'flex',
        justifyContent: 'space-between'
    },
    navButtons: {
        display: 'flex',
        gap: 20
    },
    navButton: {
    },
    navButtonText: {
        fontSize: 32,
        fontWeight: '500',
    },
    exitButton: {
        backgroundColor: '#5AAAD1',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 24,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,  
        elevation: 1,
    },
    exitButtonText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
    }
});

export default ProfilePage;