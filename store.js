let store_products = [];
let store_categories = [];
let current_category = undefined;
let category_items = [];

const ecwid_api_url = 'https://app.ecwid.com/api/v3/73530757';

let price_formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2

});

getStoreCategories();

function getStoreItems() {
    const headers = { Accept: 'application/json', Authorization: 'Bearer public_ZE7TN14Xk6R7T3zhF3m23Bs8Ws2YWXeJ' }
    fetch(`${ecwid_api_url}/products`, {
            headers: headers,
            method: 'GET'
        })
        .then(promise => promise.json())
        .then(json_data => {
            store_products = json_data.items;
            current_category = store_categories[0];
            category_items = getCurrentCategoryProducts();
            updateStoreProducts();
        });
}

function getStoreCategories() {
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

function getCurrentCategoryProducts() {
    if (current_category == undefined) return [];

    let products = store_products.filter(product => product.categoryIds.includes(current_category.id));
    return products;
}


function updateStoreProducts() {
    const wrapper = document.getElementById('productos');
    const mid_wrapper = document.createElement('div');
    wrapper.innerHTML = '';
    mid_wrapper.id = 'products';
    mid_wrapper.className = ('grid grid-cols-3 bg-indigo-800');
    category_items.forEach(product => {
        const new_product = document.createElement('div');
        new_product.className = ('StoreItemCart col-span-1 bg-white mx-auto h-64 w-32 m-5 rounded-lg mt-10 mb-10');
        new_product.innerHTML = `<div class="ImageTam bg-white mt-10 m-2 mx-auto rounded-lg border-8">
                                    <img class="ImageTam rounded-lg" src="${product.thumbnailUrl}" alt="">
                                </div>
                                <p class="ml-10 mt-4 mr-2 text-blue-800">
                                    ${product.name}
                                </p>
                                <ul class="list-disc ml-16 mt-5  text-blue-800">
                                    <li>Lorem Ipsum</li>
                                    <li>Lorem Ipsum</li>
                                    <li>Lorem Ipsum</li>
                                </ul>
                                <br>
                                <div class="mt-2  text-blue-800 ml-12">
                                    ${price_formatter.format(product.price)}      
                                </div>
                                <button class="ml-10 mb-4 mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded">
                                    Carrito
                                </button>
            `;
        mid_wrapper.appendChild(new_product);
    });
    wrapper.appendChild(mid_wrapper);
}