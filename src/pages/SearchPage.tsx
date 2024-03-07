import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import SearchSvg from '../components/icons/SearchSvg';
import { Product, loadAllProducts } from '../helpers/helpers';
import AnalogItem from '../components/analog/AnalogItem';

const SearchPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filtredProducts, setFiltredProducts] = useState<Product[]>([]);
    const [filter, setFilter] = useState<string>();

    const handleFilter = (nameFilter: string) => {
        const filtred = products?.filter(({name}) => name.trim().toLowerCase().includes(nameFilter.trim().toLowerCase()));

        setFiltredProducts([]);
        setFiltredProducts(filtred);
    }

    useEffect(() => {
        (async () => {
            const copmonentsLlist = await loadAllProducts();

            setProducts(copmonentsLlist);
            setFiltredProducts(copmonentsLlist);
        })();
    },[]);

    return (
        <View style={styles.main}>
            <View style={styles.search}>
                <View><Text style={styles.searchTitle}>Поиск</Text></View>
                <View
                    style={styles.input}
                >   
                    <SearchSvg/>
                    <TextInput
                        placeholder='Введите компонент'
                        style={styles.inputField}
                        value={filter}
                        onChangeText={handleFilter}
                    />
                </View>
            </View>
            <ScrollView style={styles.items}>
                <View style={styles.itemsWrapper}>
                    {filtredProducts && filtredProducts.map(({
                        id,
                        barcode,
                    }) => (
                        <View key={id} style={styles.item}>
                            <AnalogItem
                                id={id}
                                barcode={barcode}
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        paddingVertical: 20,
        backgroundColor: '#036C5520',
    },
    search: {
        marginBottom: 20,
        paddingHorizontal: 16,
    },
    searchTitle: {
        fontWeight: '600',
        fontSize: 24,
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        color: 'black'
    },
    input: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        padding: 8,
        borderWidth: 2,
        borderRadius: 20,
        position: 'relative',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    inputField: {
        position: 'relative',
        flex: 1,
    },
    items: {
        width: '100%',
        height: '83%',
        paddingHorizontal: 16,
    },
    itemsWrapper: {
        display: 'flex',
        gap: 20,
        marginVertical: 20,
    },
    item: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,  
        elevation: 1,
    }
})

export default SearchPage;