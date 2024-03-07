import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, SafeAreaView, View, Image, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, CameraView } from 'expo-camera/next';

import ScannerPage from './src/pages/ScannerPage';
import BottomMenu from './src/components/bottom-menu/BottomMenu';
import MainStack from './Navigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ProfileStackPage from './src/pages/ProfileStackPage';
import SearchPage from './src/pages/SearchPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScanSvg from './src/components/icons/ScanSvg';
import ProfileSvg from './src/components/icons/ProfileSvg';
import SearchSvg from './src/components/icons/SearchSvg';
import ScannerStackPage from './src/pages/ScannerStackPage';
import SearchStackPage from './src/pages/SearchStackPage';
// import ProductPage, { ProductPageProps } from './src/pages/ProductPage';
// import { SafeAreaView } from 'react-native-safe-area-context';


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

const PageStack = createNativeStackNavigator<RootStackParams>();
const TabStack = createBottomTabNavigator<RootStackParams>();

export default function App() {
    // const [state, setState] = useState<string>('');
    // const [hasPermission, setHasPermission] = useState<any>(null);
    // const [scanned, setScanned] = useState(false);

    // const handlePress = () => {
    //     setState('DA');
    //     console.log(state);
        
    // };

    // useEffect(() => {
    //     const getBarCodeScannerPermissions = async () => {
    //       const { status } = await BarCodeScanner.requestPermissionsAsync();
    //       setHasPermission(status === 'granted');
    //     };
    
    //     getBarCodeScannerPermissions();
    //   }, []);
    
    //   const handleBarCodeScanned = ({ type, data }: any) => {
    //     setScanned(true);
    //     alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    //   };
    
    //   if (hasPermission === null) {
    //     return <Text>Requesting for camera permission</Text>;
    //   }
    //   if (hasPermission === false) {
    //     return <Text>No access to camera</Text>;
    //   }

    return (
    <SafeAreaView
        style={styles.main}
    >   
        <StatusBar style="auto" />
        {/* <Text>NEW</Text> */}
        {/* <ScannerPage ></ScannerPage> */}
        {/* <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
        /> */}
        {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
        {/* <Button
            title='STATE'
            onPress={handlePress}
        /> */}
        {/* <Image source={require('./assets/adaptive-icon.png')}/> */}
        {/* <View
            style={styles.bottomMenu}
        >   
            <TouchableOpacity onPress={handlePress}>
                <View style={styles.bottomMenuButton}>
                    <Image src={'./assets/barcode-scan_svgrepo.com.svg'} />
                </View>
            </TouchableOpacity>
        </View> */}

        {/* <MainStack /> */}
        {/* <Navigator /> */}



        {/* <NavigationContainer>
                    <PageStack.Navigator
                initialRouteName='ScannerPage'
            >
                <PageStack.Screen
                    name='ScannerPage'
                    component={ScannerPage}
                />
                <PageStack.Screen
                    name='ProductPage'
                    component={ProductPage}
                />
                <PageStack.Screen
                    name='ProfilePage'
                    component={ProfilePage}
                />
                <PageStack.Screen
                    name='SearchPage'
                    component={ProfilePage}
                />
            </PageStack.Navigator>
        </NavigationContainer> */}

        {/* <NavigationContainer>

            <TabStack.Navigator
                initialRouteName='ScannerPage'
                screenOptions={{
                    // headerShown: false,
                    tabBarActiveBackgroundColor: '#dddddd',
                    tabBarActiveTintColor: 'red',
                    tabBarAllowFontScaling: true,
                }}
            >
                <TabStack.Screen
                    name='ProfilePage'
                    component={ProfilePage}
                    options={
                        {
                            title: 'Профиль',
                            tabBarIcon: ({ color, size }) => (
                                <ProfileSvg />
                            )
                        }
                    }
                />
                <TabStack.Screen
                    name='ScannerPage'
                    component={ScannerPage}
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
                    name='SearchPage'
                    component={SearchPage}
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
        </NavigationContainer> */}
        
        {/* <BottomMenu /> */}




        <NavigationContainer>
            <TabStack.Navigator
                initialRouteName='ScannerStackPage'
                screenOptions={{
                    headerShown: false,
                    tabBarActiveBackgroundColor: '#dddddd',
                    // tabBarActiveTintColor: 'red',
                    tabBarAllowFontScaling: true,
                }}
            >
                <TabStack.Screen
                    name='ProfileStackPage'
                    component={ProfileStackPage}
                    options={
                        {
                            title: 'Профиль',
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
        // backgroundColor: 'red',
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