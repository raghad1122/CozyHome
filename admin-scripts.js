let categories = JSON.parse(localStorage.getItem('categories')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('adminLoggedIn') !== 'true' && window.location.pathname.endsWith('admin.html')) {
        window.location.href = 'login.html';
    }
    loadCategoriesAdmin();
    loadProductsAdmin();
    loadOrders();
});

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === 'cozyhome11@gmail.com' && password === 'cozyhome11') {
        localStorage.setItem('adminLoggedIn', 'true');
        window.location.href = 'admin.html';
    } else {
        alert('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
}

function logout() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'login.html';
}

function addCategory() {
    const name = document.getElementById('category-name').value;

    const newCategory = {
        id: categories.length,
        name
    };

    categories.push(newCategory);
    localStorage.setItem('categories', JSON.stringify(categories));

    document.getElementById('category-form').reset();
    alert('تمت إضافة التصنيف بنجاح');
    loadCategoriesAdmin();
}

function loadCategoriesAdmin() {
    const categoryListAdmin = document.getElementById('category-list-admin');
    const productCategorySelect = document.getElementById('product-category');
    categoryListAdmin.innerHTML = '';
    productCategorySelect.innerHTML = '';
    categories.forEach((category, index) => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'admin-category';
        categoryElement.innerHTML = `
            <h2>${category.name}</h2>
            <button onclick="deleteCategory(${index})">حذف</button>
        `;
        categoryListAdmin.appendChild(categoryElement);

        const option = document.createElement('option');
        option.value = category.name;
        option.innerText = category.name;
        productCategorySelect.appendChild(option);
    });
}

function deleteCategory(categoryId) {
    categories.splice(categoryId, 1);
    localStorage.setItem('categories', JSON.stringify(categories));
    loadCategoriesAdmin();
}

function addProduct() {
    const category = document.getElementById('product-category').value;
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const colors = document.getElementById('product-colors').value.split(',');
    const sizes = document.getElementById('product-sizes').value.split(',');
    const images = Array.from(document.getElementById('product-images').files).map(file => URL.createObjectURL(file));
    const newProduct = {
        id: products.length,
        category,
        name,
        price,
        colors,
        sizes,
        images
    };

    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));

    document.getElementById('product-form').reset();
    alert('تمت إضافة المنتج بنجاح');
    loadProductsAdmin();
    loadProductsCustomer();  // للتأكد من أن المنتجات تظهر للزبائن أيضًا
}

function loadProductsAdmin() {
    const productListAdmin = document.getElementById('product-list-admin');
    productListAdmin.innerHTML = '';
    products.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.className = 'admin-product';
        productElement.innerHTML = `
            <img src="${product.images[0]}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>السعر: ${product.price}</p>
            <p>الألوان المتوفرة: ${product.colors.join(', ')}</p>
            <p>الأحجام المتوفرة: ${product.sizes.join(', ')}</p>
            <button onclick="editProduct(${index})">تعديل</button>
            <button onclick="deleteProduct(${index})">حذف</button>
        `;
        productListAdmin.appendChild(productElement);
    });
}

function editProduct(productId) {
    const product = products[productId];
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-colors').value = product.colors.join(',');
    document.getElementById('product-sizes').value = product.sizes.join(',');
    deleteProduct(productId);
}

function deleteProduct(productId) {
    products.splice(productId, 1);
    localStorage.setItem('products', JSON.stringify(products));
    loadProductsAdmin();
}

function loadOrders() {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';
    orders.forEach(order => {
        const li = document.createElement('li');
        li.innerHTML = `
            <p>الاسم: ${order.fullName}</p>
            <p>الهاتف: ${order.phoneNumber}</p>
            <p>الواتس: ${order.whatsappNumber}</p>
            <ul>
                ${order.cart.map(product => <li>${product.name} - ${product.price}</li>).join('')}
            </ul>
        `;
        orderList.appendChild(li);
    });
}