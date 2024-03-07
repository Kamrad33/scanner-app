import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { ScannerStackParams } from './ScannerStackPage';
import CrossSvg from '../components/icons/CrossSvg';
import HeartSvg from '../components/icons/HeartSvg';
import StarSvg from '../components/icons/StarSvg';
import AnalogItem from '../components/analog/AnalogItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product, ProductComponent, loadSelectedComponents, loadSelectedProducts } from '../helpers/helpers';
import ProductComponentItem from '../components/product-component/ProductComponentItem';

type ProductPageProps = NativeStackScreenProps<ScannerStackParams, "ProductPage">;

const ProductPage: React.FC<ProductPageProps> = ({navigation, route}) => {
    const {
        params,
    } = route;

    const [product, setProduct] = useState<Product | undefined>();
    const [component, setComponent] = useState<ProductComponent | undefined>();
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    // TODO dвынести в отдельный компонент
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

    const loadProduct = async (code: number) => {
        const product = await loadSelectedProducts(code);

        return product;
    };

    const loadComponent = async (code: string) => {
        const component = await loadSelectedComponents(code);

        return component;
    };

    const openComponentModal = async (id: string) => {
        setIsModalOpened(true);
        
        const component = await loadComponent(id);

        !!component && setComponent(component);
    };

    // TODO вынести в отдельную функцию
    const checkIsFavorite = async (id: any) => {
        const favorites =  await AsyncStorage.getItem('favorites');

        let favoritesArray: Product[] = [];

        if (!!favorites) {
            favoritesArray = JSON.parse(favorites);
        }

        return favoritesArray.find((item) => item.id === id);
    };

    const addFavorites = async () => {
        try {
            const favorites =  await AsyncStorage.getItem('favorites');
            let favoritesArray: any[] = [];

            if (product) {
                
                const isFavoriteCheck = await checkIsFavorite(product.id);

                if (!!favorites) {
                    favoritesArray = JSON.parse(favorites);
                }
    
                if (!!isFavoriteCheck) {
                    favoritesArray = favoritesArray.filter((item) => item.id !== isFavoriteCheck.id);
                    setIsFavorite(false);
                    
                } else {
                    product && favoritesArray.push({
                        id: product.id,
                        code: product.barcode,
                    });
                    setIsFavorite(true);
                }
            }

            await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        (async () => {
            let loaded = await loadProduct(params.code);
            
            setProduct(loaded);
        })();
    },[]);

    useEffect(() => {
        (async () => {
            const isFavoriteCheck = await checkIsFavorite(product?.id);
            
            isFavoriteCheck ? setIsFavorite(true) : setIsFavorite(false);
        })();
    }, [product]);

    return (
        <View>
            <ScrollView
                style={styles.main}
                scrollEnabled={!isModalOpened}
            >
                <View>
                    {!product && (
                        <View>
                            <Text>
                                Данного продукта пока нет в базе
                            </Text>
                        </View>
                    )}
                    {product && (
                        <View style={styles.product}>
                            <View style={styles.productPhoto}>
                                <Image source={{uri: product.imageSrc}} style={styles.productPhotoImg}/>
                            </View>

                            <View style={[styles.productBlock, styles.productBlockName]}>
                                <View style={styles.productBlockTitle}>
                                    <View>
                                        <Text style={styles.productBlockTitleText}>{product.name}</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={[
                                            styles.productBlockButton,
                                        ]}
                                        onPress={addFavorites}
                                    >
                                        <HeartSvg
                                            fill={isFavorite}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.productBlock}>
                                <View style={styles.productBlockTitle}>
                                    <Text style={styles.productBlockTitleText}>Отзывы</Text>
                                    <View style={styles.productBlockRow}>
                                        <Text style={styles.productBlockTitleText}>{product.rating}</Text>
                                        <TouchableOpacity style={styles.productBlockButton}>
                                            <StarSvg />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.productBlock}>
                                <View style={styles.productBlockTitle}>
                                    <Text style={styles.productBlockTitleText}>БЖУ</Text>
                                </View>
                                <View style={[
                                    styles.productBlockContent,
                                    styles.productBlockContentCallories,
                                ]}>
                                    <View style={styles.productBlockContentCalloriesItem}>
                                        <Text style={styles.productBlockContentCalloriesItemTitle}>Энергетическая ценность</Text>
                                        <Text style={styles.productBlockContentCalloriesItemValue}>{product.nutrion.calories} Ккал</Text>
                                    </View>
                                    <View style={styles.productBlockContentCalloriesItem}>
                                        <Text style={styles.productBlockContentCalloriesItemTitle}>Белки</Text>
                                        <Text style={styles.productBlockContentCalloriesItemValue}>{product.nutrion.proteins} г.</Text>
                                    </View>
                                    <View style={styles.productBlockContentCalloriesItem}>
                                        <Text style={styles.productBlockContentCalloriesItemTitle}>Жиры</Text>
                                        <Text style={styles.productBlockContentCalloriesItemValue}>{product.nutrion.fats} г.</Text>
                                    </View>
                                    <View style={styles.productBlockContentCalloriesItem}>
                                        <Text style={styles.productBlockContentCalloriesItemTitle}>Углеводы</Text>
                                        <Text style={styles.productBlockContentCalloriesItemValue}>{product.nutrion.carbohydrates} г.</Text>
                                    </View>
                                </View>
                            </View>
                                <View style={styles.productBlock}>
                                    <View style={styles.components}>
                                        {/* TODO вынести в отдельный компонент и передавать пропсы чтобы отрисовывать разную степень полезности.опасности */}
                                        {product.components.map(({
                                                number,
                                                id,
                                                name,
                                                danger,
                                                benefit,
                                                alergy,
                                                quantity,
                                                cancer,
                                        }) => {
                                            return (
                                                <ProductComponentItem
                                                    key={id}
                                                    id={id}
                                                    name={name}
                                                    isEditable={false}
                                                    danger={danger}
                                                    benefit={danger}
                                                    alergy={alergy}
                                                    quantity={quantity}
                                                    cancer={cancer}
                                                    callback={() => openComponentModal(id)}
                                                />
                                            );
                                        })}
                                    </View>
                                </View>
                            <View style={styles.productBlock}>
                                <View style={styles.productBlockTitle}>
                                    <Text style={styles.productBlockTitleText}>Аналоги</Text>
                                </View>
                                <View style={styles.productBlockContent}>
                                    {!!product.analogs.length && (
                                        product.analogs.map(({id, barcode}, index) => (
                                            <AnalogItem
                                                key={index}
                                                id={id}
                                                barcode={barcode}
                                            />
                                        ))
                                    )}
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
            {isModalOpened && (
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.modalCloseButton}
                            onPress={() => setIsModalOpened(false)}
                        >
                            <CrossSvg />
                        </TouchableOpacity>
                        <View>
                            {!!component && (
                                <View style={styles.modalBody}>
                                    <Text style={styles.modalTitle}>{component.name}</Text>
                                    <ScrollView>
                                        <Text style={styles.modalText}>
                                            <Text style={styles.textBold}>Название: </Text>{component.name}
                                        </Text>
                                        <Text style={styles.modalText}>
                                            <Text style={styles.textBold}>Описание: </Text>{component.description}
                                        </Text>
                                        {!!component.alergy && (<Text style={[styles.modalText, styles.textBold, styles.textWarn]}>Возможный аллерген</Text>)}
                                        {!!component.cancer && (<Text style={[styles.modalText, styles.textBold, styles.textWarn]}>Возможный канцероген</Text>)}
                                    </ScrollView>
                                </View>
                            )}
                            {!component && (
                                <View>
                                    <Text>Информация о компоненте на данный момент недоступна</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#036C5520',
    },
    product: {
        width: '100%',
        height: "100%",
        display: 'flex',
        flexDirection:'column',
        gap: 20,
        marginVertical: 20,
    },
    productPhoto: {
        width: '100%',
        height: 200,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,  
        elevation: 1,
    },
    productPhotoImg: {
        height: '100%',
        objectFit: 'contain',
    },
    productBlock: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 24,
        fontWeight: '700',
        fontSize: 24,
        display: 'flex',
        gap: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,  
        elevation: 1
    },
    productBlockContent: {
        display: 'flex'
    },
    productBlockContentCallories: {},
    productBlockContentCalloriesItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    productBlockContentCalloriesItemTitle: {
        fontSize: 16,
    },
    productBlockContentCalloriesItemValue: {
        fontSize: 16,
        fontWeight: '600'
    },
    productBlockTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        maxWidth: '100%',
    },
    productBlockTitleText: {
        fontSize: 24,
        fontWeight: '600',
        maxWidth: '90%',
    },
    productBlockButton: {
        width: 32,
        height: 32,
    },
    productBlockRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    productBlockName: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modal: {
        backgroundColor: "#000000bb",
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 100,
        padding: 20,
    },
    modalContent: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        position: 'relative',
        paddingVertical: 64,
        paddingHorizontal: 20,
    },
    modalCloseButton: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: 20,
        right: 20,
    },
    isFavorite: {
        backgroundColor: 'red',
    },
    components: {
        display: 'flex',
        gap: 12,
    },
    modalBody: {
        maxHeight: '100%',
    },
    modalTitle: {
        fontSize: 28,
        textAlign: 'center',
        fontWeight: '600',
        marginBottom: 64,
    },
    modalText: {
        fontSize: 20,
        marginBottom: 12,
    },
    textBold: {
        fontWeight: '600'
    },
    textWarn: {
        color: '#e53434'
    }
})

export default ProductPage;