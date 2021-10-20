import BreadCrumbs from "../BreadCrumbs";
import ProductListItems from "../ProductListItems";

const ProductListContent = (props:any) => {
    const { data } = props;
    const { categories, items } = data;
    return (
        <>
            <BreadCrumbs categories={categories} />
            <ProductListItems products={items} />
        </>
    )
}

export default ProductListContent;