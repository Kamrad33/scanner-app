import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CrossSvg from "../icons/CrossSvg";
import { ProductComponent, benefitColors, dangerColors } from '../../helpers/helpers';
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeartSvg from "../icons/HeartSvg";

interface ProductComponentItemProps {
    id: string;
    name: string;
    isEditable: boolean;
    danger?: number,
    benefit?: number,
    alergy?: boolean,
    quantity?: {
        count: number,
        measure: string,
    },
    cancer?: boolean,
    callback: () => void;
};

const ProductComponentItem = ({
    id,
    name,
    isEditable,
    danger,
    benefit,
    alergy,
    quantity,
    cancer,
    callback,
}: ProductComponentItemProps) => {
    const [isInFilter, setIsInFilter] = useState<boolean>();

    let localDanger = danger || 0;
    let localBenefit = benefit || 0;

    const checkIsInFilter = async (id: string) => {
        const componentsFilter: any = await AsyncStorage.getItem('componentsFilter');
        let componentsFilterArray: ProductComponent[] = [];

        if (!!componentsFilter) {
            componentsFilterArray = JSON.parse(componentsFilter);
        }

        if (componentsFilterArray.find((item) => item.id === id)) {
            setIsInFilter(true);
        } else {
            setIsInFilter(false);
        }

        return componentsFilterArray.find((item) => item.id === id);
    };

    const addToFilter = async () => {
        try {
            const filterList = await AsyncStorage.getItem('componentsFilter');
            let filterListArray: any[] = [];
            const isFilterCheck = await checkIsInFilter(id);

            if (!!filterList) {
                filterListArray = JSON.parse(filterList);
            }

            if (!isFilterCheck) {
                filterListArray.push({
                    id,
                    name,
                });
            }

            await AsyncStorage.setItem('componentsFilter', JSON.stringify(filterListArray));
            setIsInFilter(true);
        } catch (error) {
        }
    };

    const removeFromFilter = async () => {
        try {
            const filterList = await AsyncStorage.getItem('componentsFilter');
            let filterListArray: any[] = [];
            const isFilterCheck = await checkIsInFilter(id);

            if (!!filterList) {
                filterListArray = JSON.parse(filterList);
            }

            if (!!isFilterCheck) {
                filterListArray = filterListArray.filter((item) => item.id !== isFilterCheck.id)
            }

            await AsyncStorage.setItem('componentsFilter', JSON.stringify(filterListArray));
            setIsInFilter(false);
        } catch (error) {
        }
    };

    useEffect(() => {
        checkIsInFilter(id);
        console.log(danger);
        
    }, [isInFilter]);

    return(
        <TouchableOpacity
            style={[
                styles.component,
                {backgroundColor: localDanger >= localBenefit ? dangerColors[danger || 0]: benefitColors[benefit || 0]},
                isInFilter && styles.componentFilter,
            ]}
            onPress={callback}
        >
            <View>
                <Text style={styles.componentText}>{name}</Text>
            </View>
            {isEditable && isInFilter && (
                <TouchableOpacity
                    style={[
                        styles.componentButton,
                    ]}
                    onPress={removeFromFilter}
                >
                    <CrossSvg />
                </TouchableOpacity>
            )}
            {isEditable && !isInFilter && (
                <TouchableOpacity
                    style={[styles.componentButton, ]}
                    onPress={addToFilter}
                >
                    <HeartSvg />
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    component: {
        padding: 16,
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: '700',
        fontSize: 24,
        gap: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,  
        elevation: 1
    },
    componentWarn: {
        backgroundColor: 'red',
    },
    componentFilter: {
        backgroundColor: '#FFAE00',
    },
    componentText: {
        fontSize: 18,
    },
    componentButton: {
        width: 20,
        height: 20,
    }
})

export default ProductComponentItem;