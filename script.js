
const products = [
    { id: 1, name: "Casing iPhone 12", price: 150000, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQqm3E3xPYdqjjW1ChwmOOnPfLWXDZMtI_z6D2ma1YFTpI40SxShkfOvx8gdhYj47v61iUs2JcGuH4v_lv4IEnY2CNTSKViUnikZan1L-uNHxR9z93U7NUuPRQ" },
    { id: 2, name: "Casing Samsung Galaxy S21", price: 130000, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQT1ZMizHNtCPiTW7Az5_XoOWTwTKkoIPboPrOm3q0EDk8MIGFxMR4Xw5p-ZSQEoHkqMxo6MAYMJO0J9TRqBSao2Ted_OuzbdGQ-13q7ntF8EMQvjqEZFHm" },
    { id: 3, name: "Casing Xiaomi Redmi Note 10", price: 90000, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTnLSCYQU1uJi6qdU75KlomhzkRuD-N3WobvoEDC67wkW2x4KhscDCkvrca0z3c7w4D6HJmhYZAuEtHjMEIUKfKS3DiXZ201GxeuZlkxsjCtOXMv_yalWv7UQ" },
    { id: 4, name: "Casing Oppo A54", price: 80000, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ28foW6UO6uf5Gw_AN5CwlLOt-e8DzQxCEkhysQamMCcX2tLqOJkHa_gwd_pc8zUgejwlLDO4xwf5LqKBCQVkWl9-twgo-CxqTxKPIb77_4nSUAnggn3tZ" }
];

let cart = [];

function renderProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>Rp ${product.price.toLocaleString()}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(productDiv);
    });
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<li>Your cart is empty.</li>';
        cartTotalContainer.textContent = '';
        checkoutBtn.style.display = 'none';
        return;
    }
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - Rp ${item.price.toLocaleString()} x ${item.quantity}`;
        cartItemsContainer.appendChild(li);
        total += item.price * item.quantity;
    });
    cartTotalContainer.textContent = `Total: Rp ${total.toLocaleString()}`;
    checkoutBtn.style.display = 'inline-block';
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderCart();
}

function checkout() {
    if (cart.length === 0) return;
    let message = 'Pesanan saya:%0A';
    let total = 0;
    cart.forEach(item => {
        message += `- ${item.name} x ${item.quantity} = Rp ${item.price * item.quantity}%0A`;
        total += item.price * item.quantity;
    });
    message += `Total: Rp ${total}%0A`;
    message += 'Mohon konfirmasi pesanan saya. Terima kasih!';
    const whatsappUrl = `https://wa.me/6285823708661?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

document.getElementById('checkout-btn').addEventListener('click', checkout);

// Login feature
const loginForm = document.getElementById('login-form');
const container = document.querySelector('.container');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const loginError = document.getElementById('login-error');

function checkLogin() {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
        loginForm.style.display = 'none';
        container.style.display = 'block';
        logoutBtn.style.display = 'inline-block';
    } else {
        loginForm.style.display = 'block';
        container.style.display = 'none';
        logoutBtn.style.display = 'none';
    }
}

loginBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    // Simple hardcoded credentials
    if (username === 'Sayyid' && password === '12345') {
        localStorage.setItem('loggedIn', 'true');
        loginError.style.display = 'none';
        checkLogin();
    } else {
        loginError.style.display = 'block';
    }
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedIn');
    checkLogin();
});

// Menu buttons functionality
const menu = document.getElementById('menu');
const productsSection = document.getElementById('products');
const cartSection = document.getElementById('cart');
const menuProductsBtn = document.getElementById('menu-products');
const menuCartBtn = document.getElementById('menu-cart');

function showProducts() {
    productsSection.style.display = 'flex';
    cartSection.style.display = 'none';
}

function showCart() {
    productsSection.style.display = 'none';
    cartSection.style.display = 'block';
}

menuProductsBtn.addEventListener('click', showProducts);
menuCartBtn.addEventListener('click', showCart);

// Show menu on login
function updateMenuVisibility() {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
        menu.style.display = 'block';
        showProducts();
    } else {
        menu.style.display = 'none';
    }
}

// Update menu visibility on login status change
function checkLogin() {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
        loginForm.style.display = 'none';
        container.style.display = 'block';
        logoutBtn.style.display = 'inline-block';
        menu.style.display = 'block';
        showProducts();
    } else {
        loginForm.style.display = 'block';
        container.style.display = 'none';
        logoutBtn.style.display = 'none';
        menu.style.display = 'none';
    }
}

// Initial render and login check
renderProducts();
renderCart();
checkLogin();
