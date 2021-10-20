const BreadCrumbs = (props:any) => {
    const { categories } = props;
    return (
        <div className="breadcrumbs">
            {categories.map((item:string) => (
                <span key={'category_' + item}>{item}</span>
            ))}
        </div>
    );
}

export default BreadCrumbs;