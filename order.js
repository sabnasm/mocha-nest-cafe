
/* ================= PRODUCTS ================= */

const products = [
    {
        id: 1,
        name: "Cappuccino",
        price: 149,
        image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=500"
    },
    {
        id: 2,
        name: "Iced Coffee",
        price: 169,
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500"
    },
    {
        id: 3,
        name: "Chocolate Cake",
        price: 179,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500"
    },
    {
        id: 4,
        name: "Croissant",
        price: 99,
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500"
    }
];

/* ================= CART ================= */

// Read the cart saved by the Menu page
let cart = JSON.parse(localStorage.getItem("mochaCart") || "[]");

const productGrid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const clearCartButton = document.getElementById("clearCart");

/* ================= SAVE CART ================= */

function saveCart() {
    localStorage.setItem("mochaCart", JSON.stringify(cart));
}

/* ================= DISPLAY PRODUCTS ================= */

function renderProducts() {
    if (!productGrid) return;

    productGrid.innerHTML = products.map(product => `
        <article class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button class="add-btn" data-id="${product.id}">
                + Add to Cart
            </button>
        </article>
    `).join("");
}

/* ================= ADD TO CART ================= */

function addToCart(id) {
    const product = products.find(item => item.id === id);
    if (!product) return;

    const existingItem = cart.find(item => item.name === product.name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    saveCart();
    renderCart();
}

/* ================= CHANGE QUANTITY ================= */

function changeQuantity(index, amount) {
    if (!cart[index]) return;

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    renderCart();
}

/* ================= DISPLAY CART ================= */

function renderCart() {
    if (!cartItems || !cartTotal) return;

    // Remove invalid cart entries
    cart = cart.filter(item =>
        item &&
        typeof item.name === "string" &&
        Number.isFinite(Number(item.price)) &&
        Number(item.quantity) > 0
    );

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-row">
                <div>
                    <strong>${item.name}</strong>
                    <div class="quantity-controls">
                        <button data-action="minus" data-index="${index}">−</button>
                        <span>${item.quantity}</span>
                        <button data-action="plus" data-index="${index}">+</button>
                    </div>
                </div>
                <span>₹${Number(item.price) * item.quantity}</span>
            </div>
        `).join("");
    }

    const total = cart.reduce((sum, item) =>
        sum + Number(item.price) * item.quantity, 0
    );

    cartTotal.textContent = `₹${total}`;
    saveCart();
}

/* ================= BUTTON EVENTS ================= */

if (productGrid) {
    productGrid.addEventListener("click", function(event) {
        const button = event.target.closest("[data-id]");
        if (button) addToCart(Number(button.dataset.id));
    });
}

if (cartItems) {
    cartItems.addEventListener("click", function(event) {
        const button = event.target.closest("[data-action]");
        if (!button) return;

        const index = Number(button.dataset.index);
        const amount = button.dataset.action === "plus" ? 1 : -1;

        changeQuantity(index, amount);
    });
}

if (clearCartButton) {
    clearCartButton.addEventListener("click", function() {
        cart = [];
        saveCart();
        renderCart();
    });
}

/* ================= INITIALIZE ================= */

renderProducts();
renderCart();
