export const initialProductLoader = {
    loading: true,
    error: '',
    data: []
};

export interface Author {
    name: string;
    lastname: string;
}

export interface PriceObject {
    currency: string;
    amount: number;
    decimals: number;
}

export interface ItemList {
    id: string;
    title: string;
    price: PriceObject;
    picture: string;
    condition: string;
    free_shipping: boolean;
}

export interface ItemSingle extends ItemList {
    sold_quantity: number;
    description: string;
}

export interface HandleErrorResponse {
    error?: boolean;
    message?: string;
}

export interface BasicHandleServiceData extends HandleErrorResponse {
    author: Author;
    categories: Array<string>;
}

export interface ResponseProductDetail extends BasicHandleServiceData {
    item: ItemSingle;
}

export interface ResponseProductList extends BasicHandleServiceData {
    items: ItemList;
}

export interface ServiceResponseProductDetail {
    loading: boolean;
    error?: string;
    data: ResponseProductDetail|never[];
}

export interface ServiceResponseProductList {
    loading: boolean;
    error?: string;
    data: ResponseProductList|never[]; 
}