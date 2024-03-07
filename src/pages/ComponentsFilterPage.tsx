import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ProductComponent, loadAllComponents } from '../helpers/helpers';
import SearchSvg from '../components/icons/SearchSvg';
import ProductComponentItem from '../components/product-component/ProductComponentItem';

const ComponentsFilterPage = () => {
    const [components, setComponents] = useState<ProductComponent[]>();
    const [filtredComponents, setFiltredComponents] = useState<ProductComponent[]>();
    const [filter, setFilter] = useState<string>();

    const handleFilter = (nameFilter: string) => {
        const filtred = components?.filter(({name}) => name.trim().toLowerCase().includes(nameFilter.trim().toLowerCase()));

        // console.log(filtred);
        setFiltredComponents(filtred);
    }

    useEffect(() => {
        (async () => {
            const copmonentsLlist = await loadAllComponents();

            setComponents(copmonentsLlist);
            setFiltredComponents(copmonentsLlist);
        })();
    },[]);

    return(
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
                    {filtredComponents && filtredComponents.map(({
                        id,
                        name,
                    }) => (
                        <ProductComponentItem
                            key={id}
                            id={id}
                            isEditable={true}
                            name={name}
                            callback={() => {}}
                        />
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
        maxHeight: '83%',
        paddingHorizontal: 16,
    },
    itemsWrapper: {
        display: 'flex',
        gap: 12,
    },
})

export default ComponentsFilterPage;