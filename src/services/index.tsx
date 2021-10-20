import { useLocation } from "react-router";
import { ResponseProductDetail, ResponseProductList, ServiceResponseProductDetail, ServiceResponseProductList } from "../interfaces";

const URL_API = 'http://localhost:8081/api/';

export const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}
export const formatPrice = (nStr:string) => {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, "$1.$2");
    }
    return x1 + x2;
}

export const receiveProductList = async (word:string|null):Promise<ServiceResponseProductList> => {
    try {
        const response = await fetch(`${URL_API}items?q=${word}`);
        const result:ResponseProductList = await response.json();
        if (result.error) {
            // handle error received
            return {
                loading: false,
                error: result.message,
                data: []
            };
        } else {
            return {
                loading: false,
                error: '',
                data: result
            };
        }
    } catch (err) {
        console.error(err);
        return {
            loading: false,
            error: 'Ha ocurrido un error al intentar buscar productos',
            data: []
        };
    }
}

export const receiveProductInfo = async (id:string|null):Promise<ServiceResponseProductDetail> => {
    try {
        const response = await fetch(`${URL_API}items/${id}`);
        const result:ResponseProductDetail = await response.json();
        if (result.error) {
            // handle error received
            return {
                loading: false,
                error: result.message,
                data: []
            };
        } else {
            return {
                loading: false,
                error: '',
                data: result
            };
        }
    } catch (err) {
        console.error(err);
        return {
            loading: false,
            error: 'Ha ocurrido un error al intentar buscar productos',
            data: []
        };
    }
}