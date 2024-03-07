import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import ScannerPage from './ScannerPage';
import ProductPage from './ProductPage';

export type ScannerStackParams = {
    ScannerPage: any;
    ProductPage: {
        type: number;
        code: number;
        target?: number;
    };
};

const ScannerStack = createNativeStackNavigator<ScannerStackParams>();

const ScannerStackPage = () => {
    return (
        <ScannerStack.Navigator
            initialRouteName='ScannerPage'
        >
            <ScannerStack.Screen
                name='ScannerPage'
                component={ScannerPage}
                options={{
                    title: 'Отсканируйте штрихкод'
                }}
            />
            <ScannerStack.Screen
                name='ProductPage'
                component={ProductPage}
                options={{
                    title: ''
                }}
            />
        </ScannerStack.Navigator>
    )
};

const styles = StyleSheet.create({
});

export default ScannerStackPage;