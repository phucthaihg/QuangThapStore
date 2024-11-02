function getProductDetails(id) {
    const products = {
      1: { name: "Premium Dog Food", price: 24.99 },
      2: { name: "Gourmet Cat Food", price: 19.99 },
      3: { name: "Tropical Fish Flakes", price: 9.99 },
      4: { name: "Exotic Bird Seeds", price: 14.99 },
      5: { name: "Hamster Pellets", price: 7.99 },
      6: { name: "Rabbit Hay", price: 12.99 },
      7: { name: "Turtle Pellets", price: 8.99 },
      101: { name: "Cozy Dog Sweater", price: 29.99 },
      102: { name: "Funny Cat Costume", price: 24.99 },
      103: { name: "Waterproof Dog Raincoat", price: 34.99 },
      104: { name: "Stylish Pet Bandana", price: 9.99 }
    };
    return products[id] || { name: "Unknown Product", price: 0 };
  }
  
// Initialize cart and wishlist as empty arrays
let cart = [];
let wishlist = [];

function addToCart(productId) {
  // Check if the product is already in the cart
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    // If the item is already in the cart, increase its quantity
    existingItem.quantity += 1;
  } else {
    // If it's a new item, add it to the cart with quantity 1
    cart.push({ id: productId, quantity: 1 });
  }
  
  // Update the cart UI
  updateCartUI();
  
  // Optionally, save the cart to localStorage
  saveCartToLocalStorage();
  
  console.log(`Added product ${productId} to cart`);
}

function addToWishlist(productId) {
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    updateWishlistUI();
    saveWishlistToLocalStorage();
    console.log(`Added product ${productId} to wishlist`);
  } else {
    console.log(`Product ${productId} is already in the wishlist`);
  }
}

function updateCartUI() {
  // Update the cart icon or dropdown in the navbar
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartBadge = document.querySelector('.bi-cart + .badge');
  if (cartBadge) {
    cartBadge.textContent = cartItemCount;
  }
  
  // Update the cart panel contents
  updateCartPanel();
}

function updateWishlistUI() {
  const wishlistIcon = document.querySelector('.bi-heart + .badge');
  if (wishlistIcon) {
    wishlistIcon.textContent = wishlist.length;
  }
  updateWishlistPanel();
}

function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function saveWishlistToLocalStorage() {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function toggleCart(event) {
    console.log('toggleCart called');
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const cartPanel = document.getElementById('cartPanel');
    cartPanel.classList.toggle('open');
  }

function toggleWishlist() {
  const wishlistPanel = document.getElementById('wishlistPanel');
  wishlistPanel.classList.toggle('open');
}

function updateCartPanel() {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  let total = 0;

  if (cartItems && cartTotal) {
    if (cart.length === 0) {
      cartItems.innerHTML = '<tr><td colspan="5">Your cart is empty</td></tr>';
      cartTotal.textContent = '0.00';
    } else {
      cartItems.innerHTML = '';

      cart.forEach(item => {
        const product = getProductDetails(item.id);
        const itemTotal = product.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
          <tr>
            <td>${product.name}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>
              <input type="number" class="form-control form-control-sm" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
            </td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td><button class="btn btn-sm btn-danger" onclick="removeItem(${item.id})">Remove</button></td>
          </tr>
        `;
      });

      cartTotal.textContent = total.toFixed(2);
    }
  }
}

function updateWishlistPanel() {
  const wishlistItems = document.getElementById('wishlistItems');
  if (wishlistItems) {
    if (wishlist.length === 0) {
      wishlistItems.innerHTML = '<li class="list-group-item">Your wishlist is empty</li>';
    } else {
      wishlistItems.innerHTML = '';
      wishlist.forEach(productId => {
        const product = getProductDetails(productId);
        wishlistItems.innerHTML += `
          <li class="list-group-item d-flex justify-content-between align-items-center">
            ${product.name}
            <span>
              <button class="btn btn-sm btn-primary me-2" onclick="addToCart(${productId}); removeFromWishlist(${productId});">Add to Cart</button>
              <button class="btn btn-sm btn-danger" onclick="removeFromWishlist(${productId})">Remove</button>
            </span>
          </li>
        `;
      });
    }
  }
}

function updateQuantity(id, newQuantity) {
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity = parseInt(newQuantity);
    updateCartUI();
    saveCartToLocalStorage();
  }
}

function removeItem(id) {
  const index = cart.findIndex(item => item.id === id);
  if (index !== -1) {
    cart.splice(index, 1);
    updateCartUI();
    saveCartToLocalStorage();
  }
}

function removeFromWishlist(productId) {
  const index = wishlist.indexOf(productId);
  if (index !== -1) {
    wishlist.splice(index, 1);
    updateWishlistUI();
    saveWishlistToLocalStorage();
  }
}

// Load cart and wishlist from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
  }
  
  const savedWishlist = localStorage.getItem('wishlist');
  if (savedWishlist) {
    wishlist = JSON.parse(savedWishlist);
    updateWishlistUI();
  }

  // Add event listeners for cart and wishlist toggles
  document.body.addEventListener('click', function(event) {
    const cartToggle = event.target.closest('.bi-cart');
    if (cartToggle) {
      toggleCart(event);
    }
  });
  
  document.body.addEventListener('click', function(event) {
    const wishlistToggle = event.target.closest('.bi-heart');
    if (wishlistToggle) {
        toggleWishlist(event);
    }
  });

});