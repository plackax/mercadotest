import ProductItem from "../ProductItem";

const ProductListItems = (props:any) => {
    const { products } = props;
    return (
        <div className="whiteContent">
            <div className="products">
                {products.map((item:any) => (
                    <ProductItem data={item} key={item.id} />
                ))}
            </div>
        </div>
    )
}

export default ProductListItems;