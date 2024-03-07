import db from '../../db.json';

export interface ProductComponent {
    number?: number, // поле для сортировки по составу
    id: string,
    name: string,
    danger: number,
    benefit: number,
    alergy?: boolean,
    quantity?: {
        count: number,
        measure: string, // TODO возможно расширение видов измерения
    },
    description?: string;
    cancer?: boolean;
};

export interface Product {
    id: string;
    type: string;
    barcode: number;
    name: string;
    components: ProductComponent[]; // массив состава
    analogs: Analog[],
    nutrion: {
        proteins: number;
        fats: number;
        carbohydrates: number;
        calories: number;
    };
    rating: number;
    imageSrc: string;
    created: string;
    updated: string;
};

export interface Analog {
    id: string;
    barcode: number;
};

// TODO функция заглушка, сервер должен отдавать только один продукт более того возникает баг изза зацикливания импортов, так что нужно вынести это отдельно
export const loadSelectedProducts = async (barcode: number): Promise<Product | undefined> => {
    const products = await loadAllProducts();
    let product;
    
    products.forEach((elm: Product) => {
        if (elm.barcode === barcode) {
            product = elm;
        };
    })
    
    return product;
};

// TODO функция заглушка, сервер должен отдавать только один продукт
export const loadSelectedComponents = async (code: string): Promise<ProductComponent | undefined> => {
    const components = await loadAllComponents();
    let component;
    
    components.forEach((elm: ProductComponent) => {
        
        if (elm.id === code) {
            component = elm;
        };
    })
    
    return component;
};

export const loadAllComponents = async (): Promise<ProductComponent[]> => {
    const productsJson = JSON.parse(JSON.stringify(db));

    const {
        components,
    } = productsJson;

    return components;
};

export const loadAllProducts = async (): Promise<Product[]> => {
    const productsJson = JSON.parse(JSON.stringify(db));

    const {
        products,
    } = productsJson;

    return products;
};

export const dangerColors: any = {
    0: '#FFFFFF',
    1: '#f9cfcf',
    2: '#f6b7b7',
    3: '#f39f9f',
    4: '#f08888',
    5: '#ee7c7c',
    6: '#ed7070',
    7: '#ea5858',
    8: '#e84c4c',
    9: '#e74040',
    10: '#e53434',
}

export const benefitColors: any = {
    0: '#e8f6e8',
    1: '#ddf2dd',
    2: '#d2edd1',
    3: '#c7e9c6',
    4: '#bbe4bb',
    5: '#b0e0af',
    6: '#99d798',
    7: '#83ce81',
    8: '#6cc56b',
    9: '#56bc54',
    10: '#3fb33d',
}

// export const getColor = (type: string, number: number): string => {
//     let color = '#FFFFFF';


//     return color;
// }