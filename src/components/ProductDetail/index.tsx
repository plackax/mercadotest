import { useEffect, useState } from "react";
import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";
import { initialProductLoader, ServiceResponseProductDetail } from "../../interfaces";
import { receiveProductInfo } from "../../services";
import ProductDetailContent from "../ProductDetailContent";

const ProductDetail = (props:any) => {
    const [productLoader, setProductLoader] = useState<ServiceResponseProductDetail>(initialProductLoader);
     
    useEffect(() => {

        const idParam = props.match.params.id;
        receiveProductInfo(idParam).then((response:ServiceResponseProductDetail) => {
            setProductLoader(response);
        })
    }, [props.match.params.id])

    return (
        <>
            {productLoader.loading ? <div className="centerContent"><Spinner color="#273674" size={25} /></div> : null}
            {productLoader.error !== '' ? <div className="centerContent errorText">{productLoader.error}</div> : null}
            {productLoader.data && productLoader.data.hasOwnProperty('item') ? <ProductDetailContent data={productLoader.data} /> : null}
        </>
    )
}

export default ProductDetail;