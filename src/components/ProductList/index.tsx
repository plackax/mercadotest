import { useEffect, useState } from "react";
import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";
import { initialProductLoader, ServiceResponseProductList } from "../../interfaces";
import { receiveProductList, useQuery } from "../../services";
import ProductListContent from "../ProductListContent";

const ProductList = () => {
    const query = useQuery();
    const searchText = query.get('search');

    const [productLoader, setProductLoader] = useState<ServiceResponseProductList>(initialProductLoader);
    
    useEffect(() => {
        // setProductLoader(initialProductLoader);
        receiveProductList(searchText).then((response:ServiceResponseProductList) => {
            setProductLoader(response);
        })
    }, [searchText])

    return (
        <>
            {productLoader.loading ? <div className="centerContent"><Spinner color="#273674" size={25} /></div> : null}
            {productLoader.error !== '' ? <div className="centerContent errorText">{productLoader.error}</div> : null}
            {productLoader.data && productLoader.data.hasOwnProperty('items') ? <ProductListContent data={productLoader.data} /> : null}
        </>
    )
}

export default ProductList;