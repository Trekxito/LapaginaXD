let store_products = [];
let store_categories = [];
let current_category = undefined;

const ecwid_api_url = 'https: //app.ecwid.com/api/v3/73530757/';

let price_formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2

});

document.onload = getStoreCategories;

const getStoreItems = () => {
    const headers = { Accept: 'application/json', Authorization: 'Bearer public_ZE7TN14Xk6R7T3zhF3m23Bs8Ws2YWXeJ' }
    fetch(`${ecwid_api_url}/products`, {
            headers: headers,
            method: 'GET'
        })
        .then(promise => promise.json())
        .then(json_data => {
            store_products = json_data.items;
            current_category = store_categories[0];
            console.log(store_products);
        });
}

const getStoreCategories = () => {
    const headers = { Accept: 'application/json', Authorization: 'Bearer public_ZE7TN14Xk6R7T3zhF3m23Bs8Ws2YWXeJ' }
    fetch(`${ecwid_api_url}/categories`, {
            headers: headers,
            method: 'GET'
        })
        .then(response => response.json())
        .then(categories_data => {
            store_categories = categories_data.items;
            getStoreItems();

        });
}

const getCurrentCategoryProducts = () => {
    if (current_category == undefined) return [];

    let products = store_products.filter(product => product.categoryIds.includes(current_category.id));
    return products;
}


const wrapper = document.getElementById('productos');
const mid_wrapper = document.createElement('div');
wrapper.innerHTML = '';
mid_wrapper.id = 'productos';
category_items.forEach(p => {
    const new_product = document.createElement('div');
    new_product.className = ('product-item');
    new_product.innerHTML = `<div class="pr-image">
                                        <img src="${product.thumbnailUrl}>
                                    </div>
                                    <div class="pr-info">
                                        <div class="pr-info-name>
                                            ${product.name}
                                        </div>
                                        <div class= pr-info-price>
                                            ${price_formatter.format(product.price)}
                                        </div>
                                    </div>
        `;
    mid_wrapper.appendChild(new_product);
});
wrapper.appendChild(mid_wrapper);