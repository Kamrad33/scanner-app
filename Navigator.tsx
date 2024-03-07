import React from 'react';
import ProfilePage from './src/pages/ProfilePage';
import ScannerPage from './src/pages/ScannerPage';
import SearchPage from './src/pages/SearchPage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// export enum PagesEnum {
//     SCANNER_PAGE = 'SCANNER_PAGE',
//     PROFILE_PAGE = 'PROFILE_PAGE',
//     SEARCH_PAGE = 'SEARCH_PAGE',
// }

const Navigator = () => { 
    const RootStack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <RootStack.Navigator>
                <RootStack.Screen
                    name="ScannerPage"
                    component={ScannerPage}
                    options={
                        {title: 'Сканнер'}
                    }
                />
                <RootStack.Screen
                    name="ProfilePage"
                    component={ProfilePage}
                    options={
                        {title: 'Профиль'}
                    }
                />
                <RootStack.Screen
                    name="SearchPage"
                    component={SearchPage}
                    options={
                        {title: 'Поиск'}
                    }
                />
            </RootStack.Navigator>
        </NavigationContainer>
    )
};

export default Navigator;