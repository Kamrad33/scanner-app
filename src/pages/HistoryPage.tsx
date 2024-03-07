import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HistoryItem from '../components/history/HistoryItem';

interface HistoryProps {
    type: number,
    code: number,
    target: number,
    id: number,
};

const HistoryPage = () => {
    const [history, setHistory] = useState<HistoryProps[]>([]);
    const [updated, setUpdated] = useState<number>(Date.now());
    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {
            let data: any = await AsyncStorage.getItem('history');
            
            if (!!data) {
                data = JSON.parse(data);

                setHistory(data);
            }
        })();
    }, [updated, isFocused]);

    return(
        <View style={styles.main}>
            <ScrollView>
                <View style={styles.mainWrapper}>
                    {!!history && history.map(({
                        target,
                        code,
                        type,
                        id,
                    }, index) => (
                        <HistoryItem
                            key={index}
                            id={id}
                            barcode={code}
                            callback={() => setUpdated(Date.now())}
                        />
                    ))}

                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#036C5520',
        height: '100%',
        paddingHorizontal: 16,
    },
    mainWrapper: {
        display: 'flex',
        gap: 20,
        marginVertical: 20,
    },
    text: {
        fontSize: 20,
        color: 'black'
    },
})

export default HistoryPage;