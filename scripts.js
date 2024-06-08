let cart = JSON.parse(localStorage.getItem('cart')) || [];
let categories = JSON.parse(localStorage.getItem('categories')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('category-list')) {
        loadCategories();
    }
    if (document.getElementById('product-list')) {
        loadProductsByCategory();
    }
    if (document.getElementById('product-details')) {
        loadProductDetails();
    }
    if (document.getElementById('cart-list')) {
        updateCart();
    }
});

function loadCategories() {
    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = '';
    categories.forEach((category, index) => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'category';
        categoryElement.innerHTML = `
            <h2>${category.name}</h2>
            <button onclick="viewCategory(${index})">عرض المنتجات</button>
        `;
        categoryList.appendChild(categoryElement);
    });
}

function viewCategory(categoryId) {
    localStorage.setItem('currentCategory', JSON.stringify(categories[categoryId]));
    window.location.href = 'category.html';
}

function loadProductsByCategory() {
    const category = JSON.parse(localStorage.getItem('currentCategory'));
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.filter(product => product.category === category.name).forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.images[0]}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>السعر: ${product.price}</p>
            <button onclick="viewProduct(${index})">عرض التفاصيل</button>
        `;
        productList.appendChild(productElement);
    });
}

function viewProduct(productId) {
    localStorage.setItem('currentProduct', JSON.stringify(products[productId]));
    window.location.href = 'product.html';
}

function loadProductDetails() {
    const product = JSON.parse(localStorage.getItem('currentProduct'));
    const productDetails = document.getElementById('product-details');
    productDetails.innerHTML = `
        <img src="${product.images[0]}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>السعر: ${product.price}</p>
        <p>الألوان المتوفرة:</p>
        <select id="product-color">
            ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
        </select>
        <p>الأحجام المتوفرة:</p>
        <select id="product-size" onchange="displaySizeDetails()">
            ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
        </select>
        <div id="size-details"></div>
        <p>${product.details}</p>
        <button onclick="addToCart(${product.id})">أضف إلى السلة</button>
    `;
}

function displaySizeDetails() {
    const product = JSON.parse(localStorage.getItem('currentProduct'));
    const selectedSize = document.getElementById('product-size').value;
    const sizeDetails = product.sizesDetails[selectedSize] || {};
    document.getElementById('size-details').innerHTML = `
        <p>العرض: ${sizeDetails.width || ''}</p>
        <p>الطول: ${sizeDetails.height || ''}</p>
        <p>الارتفاع: ${sizeDetails.depth || ''}</p>
    `;
}

function addToCart(productId) {
    const product = products[productId];
    const selectedColor = document.getElementById('product-color').value;
    const selectedSize = document.getElementById('product-size').value;
    const productWithOptions = { ...product, selectedColor, selectedSize };
    cart.push(productWithOptions);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const cartElement = document.getElementById('cart-list');
    if (cartElement) {
        cartElement.innerHTML = '';
        cart.forEach((product, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${product.name} - ${product.price} - ${product.selectedColor} - ${product.selectedSize}
                <button onclick="removeFromCart(${index})">إزالة</button>
            `;
            cartElement.appendChild(li);
        });
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function checkout() {
    const fullName = document.getElementById('full-name').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const whatsappCountryCode = document.getElementById('whatsapp-country-code').value;
    const whatsappNumber = document.getElementById('whatsapp-number').value;

    if (fullName && phoneNumber && whatsappNumber) {
        const order = {
            fullName,
            phoneNumber,
            whatsappNumber: whatsappCountryCode + whatsappNumber,
            cart
        };
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        alert('تم تأكيد الطلب بنجاح!');
        cart = [];
        localStorage.removeItem('cart');
        updateCart();
    } else {
        alert('يرجى إدخال جميع البيانات المطلوبة.');
    }
}
