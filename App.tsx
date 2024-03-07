import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ProfileStackPage from './src/pages/ProfileStackPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScanSvg from './src/components/icons/ScanSvg';
import ProfileSvg from './src/components/icons/ProfileSvg';
import SearchSvg from './src/components/icons/SearchSvg';
import ScannerStackPage from './src/pages/ScannerStackPage';
import SearchStackPage from './src/pages/SearchStackPage';

export enum PagesEnum {
    SCANNER_PAGE = 'SCANNER_PAGE',
    PROFILE_PAGE = 'PROFILE_PAGE',
    SEARCH_PAGE = 'SEARCH_PAGE',
};

export type RootStackParams = {
    ScannerStackPage: any;
    ProfileStackPage: any;
    SearchStackPage: any;
    ProductPage: {
        type: number;
        code: number;
        target: number;
    };
};

const TabStack = createBottomTabNavigator<RootStackParams>();

export default function App() {

    return (
        <SafeAreaView
            style={styles.main}
        >   
            <StatusBar style="auto" />
                <NavigationContainer>
                    <TabStack.Navigator
                        initialRouteName='ScannerStackPage'
                        screenOptions={{
                            headerShown: false,
                            tabBarActiveBackgroundColor: '#C9C9C950',
                            tabBarActiveTintColor: '#147414',
                            tabBarAllowFontScaling: true,
                        }}
                    >
                        <TabStack.Screen
                            name='ProfileStackPage'
                            component={ProfileStackPage}
                            options={
                                {
                                    title: 'Главная',
                                    tabBarIcon: ({ color, size }) => (
                                        <ProfileSvg />
                                    )
                                }
                            }
                        />
                        <TabStack.Screen
                            name='ScannerStackPage'
                            component={ScannerStackPage}
                            options={
                                {
                                    title: 'Сканнер',
                                    tabBarIcon: ({ color, size }) => (
                                        <ScanSvg />
                                    ),
                                    tabBarStyle: {
                                        
                                    }
                                }
                            }
                        />
                        <TabStack.Screen
                            name='SearchStackPage'
                            component={SearchStackPage}
                            options={
                                {
                                    title: 'Поиск',
                                    tabBarIcon: ({ color, size }) => (
                                        <SearchSvg />
                                    )
                                }
                            }
                        />
                    </TabStack.Navigator>
                </NavigationContainer>
        </SafeAreaView>
  );    
}

const styles = StyleSheet.create({
    main: {
        width: '100%',
        flex: 1,
        position: 'relative',
    },
    bottomMenu: {
        width: '100%',
        height: 50,
        backgroundColor: 'green',
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bottomMenuButton: {
        height: '100%',
        width: 50,
        backgroundColor: 'yellow',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});