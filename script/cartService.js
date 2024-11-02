class CartService {

  constructor() {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }
  // Get cart from localStorage
  getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }

  addToCart(productId) {
    console.log('addToCart', productId);
    const cart = this.getCart();

    // Check if the product is already in the cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
      // If the item is already in the cart, increase its quantity
      existingItem.quantity += 1;
    } else {
      // If it's a new item, add it to the cart with quantity 1
      cart.push({ id: productId, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  removeFromCart(itemId) {
    const cart = this.getCart();
    const updatedCart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  updateCartItemQuantity(itemId, quantity) {
    const cart = this.getCart();
    const item = cart.find(i => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
  }

  getCartTotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }


  toggleCart(event) {
    console.log('toggleCart called');
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const cartPanel = document.getElementById('cartPanel');
    cartPanel.classList.toggle('open');
  }

  updateCartUI() {
    const cart = this.getCart();

    // Update the cart icon in the navbar
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartBadge = document.querySelector('.bi-cart + .badge');
    if (cartBadge) {
      cartBadge.textContent = cartItemCount;
    }

    // Update the cart panel contents
    this.updateCartPanel();
  }

  updateCartPanel() {
    const cart = this.getCart();

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
          const productService = new ProductService();
          const product = productService.getProductById(item.id);
          const itemTotal = product.price * item.quantity;
          total += itemTotal;

          cartItems.innerHTML += `
            <tr>
              <td>${product.name}</td>
              <td>$${product.price}</td>
              <td>
                <input type="number" class="form-control form-control-sm cart-item-quantity" value="${item.quantity}" min="0" data-product-id="${item.id}"  style="width: 70px;">
              </td>
              <td>$${itemTotal.toFixed(2)}</td>
              <td><button class="btn btn-sm btn-danger remove-from-cart" data-product-id="${item.id}">Remove</button></td>
            </tr>
          `;
        });

        cartTotal.textContent = total.toFixed(2);
      }
    }
  }

}
