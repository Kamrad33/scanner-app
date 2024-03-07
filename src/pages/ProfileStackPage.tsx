import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ProfilePage from './ProfilePage';
import HistoryPage from './HistoryPage';
import FavoritesPage from './FavoritesPage';
import ComponentsFilterPage from './ComponentsFilterPage';
import ProductPage from './ProductPage';

export type ProfileStackParams = {
    ProfilePage: any;
    HistoryPage: any;
    FavoritesPage: any;
    ComponentsFilterPage: any;
    ProductPage: {
        type: number;
        code: number;
        target?: number;
    };
};

const ProfileStack = createNativeStackNavigator<ProfileStackParams>();

const ProfileStackPage = ({ }) => {
    return (
        <ProfileStack.Navigator
            initialRouteName='ProfilePage'
            screenOptions={{
            }}
        >   
            <ProfileStack.Screen
                name='ProfilePage'
                component={ProfilePage}
                options={{
                    title: 'Главная'
                }}
            />
            <ProfileStack.Screen
                name='HistoryPage'
                component={HistoryPage}
                options={{
                    title: 'История'
                }}
            />
             <ProfileStack.Screen
                name='FavoritesPage'
                component={FavoritesPage}
                options={{
                    title: 'Избранное'
                }}
            />
             <ProfileStack.Screen
                name='ComponentsFilterPage'
                component={ComponentsFilterPage}
                options={{
                    title: 'Нежелательные компоненты'
                }}
            />
            <ProfileStack.Screen
                name='ProductPage'
                component={ProductPage}
                options={{
                    title: ''
                }}
            />
        </ProfileStack.Navigator>
    );
};

export default ProfileStackPage;