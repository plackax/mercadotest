import { Link } from "react-router-dom";
import { formatPrice } from "../../services";
import freeIcon from "./../../assets/shipping.png";

const ProductItem = (props:any) => {
    const { data } = props;
    return (
        <div className="productItem">
            <Link to={"/items/" + data.id} title={data.title}>
                <img src={data.picture} alt={data.title} />
            </Link>
            <Link to={"/items/" + data.id} className="productInfo" title={data.title}>
                <span className="productInfoPrice">
                    $ {formatPrice(data.price.amount)}
                    {data.free_shipping ? (
                        <img className="productInfoFreeShipping" src={freeIcon} alt="Free Shipping" />
                    ) : null}
                </span>
                <h1 className="productInfoTitle">{data.title}</h1>
            </Link>
        </div>
    );
}

export default ProductItem;