import fetch from 'node-fetch';
const API_URL = 'https://api.mercadolibre.com/';

const serviceController = {
    assignAuthor: function() {
        return {
            author: {
                name: 'José David',
                lastname: 'Rivas Hernández'
            }
        }
    },
    formatItems: function(products) {
        return products.map(item => {
            return {
                id: item.id,
                title: item.title,
                price: {
                    currency: item.currency_id,
                    amount: item.price,
                    decimals: 0
                },
                picture: item.thumbnail,
                condition: item.condition,
                free_shipping: item.shipping.free_shipping,
            }
        })
    },
    getListOfProducts: async function(req, res, next) {
        try {
            if (req.query && req.query.q && req.query.q.trim() !== '') {
                const result = await fetch(API_URL + 'sites/MCO/search?q=' + req.query.q + '&limit=4');
                const response = await result.json();
                res.products = response;
                next();
            } else {
                res.json({error: true, message: 'La búsqueda no cuenta con los parámetros necesarios'});
            }
        } catch (err) {
            console.error(err);
            res.json({error: true, message: 'Ha ocurrido un error inesperado. Por favor intente nuevamente más tarde.'});
        }
    },
    handleListOfProductsResponse: function(req, res) {
        const categories = [];
        if (res.products.filters && res.products.filters.length) {
            res.products.filters.forEach(item => {
                if (item.id === 'category') {
                    // Se que entre los posibles filtros si estemos revisando los valores de las categorías
                    const categoriesArray = item.values[0].path_from_root;
                    categoriesArray.forEach(category => {
                        categories.push(category.name);
                    })
                }
            })
        }

        const response = {
            ...serviceController.assignAuthor(),
            categories,
            items: serviceController.formatItems(res.products.results)
        }
        res.json(response);
    },
    getInfoFromProduct: async function(req, res, next){
        
        try {
            if (req.params && req.params.id && req.params.id !== '') {
                const productRequest = await fetch(API_URL + 'items/' + req.params.id);
                const productResponse = await productRequest.json();

                const descriptionRequest = await fetch(API_URL + 'items/' + req.params.id + '/description');
                const descriptionResponse = await descriptionRequest.json();

                const categoriesRequest = await fetch(API_URL + 'categories/' + productResponse.category_id);
                const categoriesResponse = await categoriesRequest.json();

                res.productInfo = {productResponse, descriptionResponse, categoriesResponse};
                next();
            } else {
                res.json({error: true, message: 'No ha proporcionado la información necesaria para obtener un producto.'});
            }
        } catch (err) {
            console.error(err);
            res.json({error: true, message: 'Ha ocurrido un error inesperado. Por favor intente nuevamente más tarde.'});
        }
    },
    handleProductResponse: function(req, res){
        const data = res.productInfo.productResponse;
        const desc = res.productInfo.descriptionResponse;
        const cats = res.productInfo.categoriesResponse;
        if (data.error) {
            res.json({
                error: true,
                message: data.message
            });
        }

        const image = (data.pictures && typeof data.pictures['0'] !== 'undefined') ? data.pictures[0].url : '';
        const categories = [];
        if (res.productInfo.categoriesResponse && res.productInfo.categoriesResponse.path_from_root) {
            const categoriesArray = res.productInfo.categoriesResponse.path_from_root;
            categoriesArray.forEach(category => {
                categories.push(category.name);
            })
        }

        const response = {
            author: serviceController.assignAuthor(),
            categories,
            item: {
                id: data.id,
                title: data.title,
                price: {
                    currency: data.currency_id,
                    amount: data.price,
                    decimals: 0
                },
                picture: image,
                condition: data.condition,
                free_shipping: data.shipping.free_shipping,
                sold_quantity: data.sold_quantity,
                description: desc.plain_text
            }
        };
        res.json(response);
    }
};



// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
export default serviceController;
