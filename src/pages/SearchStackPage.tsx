import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import SearchPage from './SearchPage';
import ProductPage from './ProductPage';

export type SearchStackParams = {
    SearchPage: any;
    ProductPage: {
        type: number;
        code: number;
        target?: number;
    };
};

const SearchStack = createNativeStackNavigator<SearchStackParams>();

const SearchStackPage = () => {
    return (
        <SearchStack.Navigator
            initialRouteName='SearchPage'
        >
            <SearchStack.Screen
                name='SearchPage'
                component={SearchPage}
                options={{
                    title: 'Поиск'
                }}
            />
            <SearchStack.Screen
                name='ProductPage'
                component={ProductPage}
                options={{
                    title: ''
                }}
            />
        </SearchStack.Navigator>
    )
};

export default SearchStackPage;