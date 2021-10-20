import { formatPrice } from "../../services";
import BreadCrumbs from "../BreadCrumbs";


const ProductDetailContent = (props:any) => {
    const { data } = props;
    const { item, categories } = data;
    return (
        <>
            <BreadCrumbs categories={categories} />
            <div className="whiteContent">
                <div className="contentProduct">
                    <img src={item.picture} alt={item.title} />
                    <div className="contentProductInfo">
                        <div className="sellit">{item.condition === 'new' ? 'Nuevo' : ''} - {item.sold_out} vendidos</div>
                        <h1 className="titleProduct">{item.title}</h1>
                        <div className="priceProduct">$ {formatPrice(item.price.amount)}</div>
                        <div className="buttonContainer"><button>Comprar</button></div>
                    </div>
                </div>
                <div className="descriptionProduct">
                    <h3>Descripción del producto</h3>
                    <div className="descriptionContent" dangerouslySetInnerHTML={{__html: item.description}}></div>
                </div>
            </div>
        </>
    )
}

export default ProductDetailContent;