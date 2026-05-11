
// ------------------------------
// LocalStorage Setup
// ------------------------------

// Initialize cart and wishlist
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// ------------------------------
// Add to Cart Button
// ------------------------------
const addToCartButtons = document.querySelectorAll('.cart-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productRow = button.closest('tr') || button.closest('.product-item');
        const productName = productRow.querySelector('td:first-child, .product-name').innerText;
        const priceText = productRow.querySelector('td:nth-child(2), .product-price').innerText.replace('$','');
        const price = parseFloat(priceText);

        // Check if already in cart
        const existing = cart.find(item => item.name === productName);
        if(existing){
            existing.quantity += 1;
        } else {
            cart.push({name: productName, price: price, quantity: 1});
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${productName} added to cart!`);
        updateCartCount();
    });
});

// ------------------------------
// Wishlist Button
// ------------------------------
const wishlistButtons = document.querySelectorAll('.wishlist-btn');
wishlistButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productRow = button.closest('tr') || button.closest('.product-item');
        const productName = productRow.querySelector('td:first-child, .product-name').innerText;
        const priceText = productRow.querySelector('td:nth-child(2), .product-price').innerText.replace('$','');
        const price = parseFloat(priceText);

        const exists = wishlist.find(item => item.name === productName);
        if(exists){
            alert(`${productName} is already in wishlist.`);
            return;
        }
        wishlist.push({name: productName, price: price});
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert(`${productName} added to wishlist!`);
        updateWishlistCount();
    });
});

// ------------------------------
// Remove from Wishlist
// ------------------------------
const removeButtons = document.querySelectorAll('.remove-btn');
removeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const row = button.closest('tr');
        const productName = row.querySelector('td:first-child').innerText;
        wishlist = wishlist.filter(item => item.name !== productName);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        row.remove();
        updateWishlistCount();
        alert(`${productName} removed from wishlist!`);
    });
});

// ------------------------------
// Update Cart/Wishlist Count (Header)
// ------------------------------
function updateCartCount(){
    const cartCount = document.getElementById('cart-count');
    if(cartCount){
        cartCount.innerText = cart.reduce((sum,item)=>sum+item.quantity,0);
    }
}
function updateWishlistCount(){
    const wishCount = document.getElementById('wishlist-count');
    if(wishCount){
        wishCount.innerText = wishlist.length;
    }
}

// ------------------------------
// Load Cart/Wishlist Count on Page Load
// ------------------------------
updateCartCount();
updateWishlistCount();

// ------------------------------
// FAQ Toggle
// ------------------------------
const faqHeaders = document.querySelectorAll('.faq-section h2');
faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const p = header.nextElementSibling;
        p.style.display = p.style.display === 'block' ? 'none' : 'block';
    });
});

// ------------------------------
// Contact Form Submission
// ------------------------------
const contactForm = document.querySelector('.contact-container form');
if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        alert("Message sent! (Simulation)");
        contactForm.reset();
    });
}

// ------------------------------
// Login / Register Form
// ------------------------------
const loginForm = document.querySelector('.login-form form');
if(loginForm){
    loginForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        alert("Login successful! (Simulation)");
        loginForm.reset();
    });
}
const registerForm = document.querySelector('.register-form form');
if(registerForm){
    registerForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        alert("Registration successful! (Simulation)");
        registerForm.reset();
    });
}



// Get cart from localStorage
function getCart(){
    let cart = localStorage.getItem("cart");

    if(cart){
        return JSON.parse(cart);
    }else{
        return [];
    }
}

// Save cart
function saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add product
function addToCart(name, price){

    let cart = getCart();

    let product = cart.find(item => item.name === name);

    if(product){
        product.quantity += 1;
    }else{
        cart.push({
            name:name,
            price:price,
            quantity:1
        });
    }

    saveCart(cart);

    alert(name + " added to cart ✅");
}