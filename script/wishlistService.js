class WishlistService {

  constructor() {
    if (!localStorage.getItem('wishlist')) {
      localStorage.setItem('wishlist', JSON.stringify([]));
    }
  }

  getWishlist() {
    return JSON.parse(localStorage.getItem('wishlist')) || [];
  }


  addToWishlist(productId) {
    const wishlist = this.getWishlist();
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));

      console.log(`Added product ${productId} to wishlist`);
    } else {
      console.log(`Product ${productId} is already in the wishlist`);
    }
  }

  removeFromWishlist(productId) {
    const wishlist = this.getWishlist();   
    const updatedWishlist = wishlist.filter(item => item !== productId);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  }

  toggleWishlist(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const wishlistPanel = document.getElementById('wishlistPanel');
    wishlistPanel.classList.toggle('open');
  }

  updateWishlistUI() {
    console.log('updateWishlistUI called');
    const wishlist = this.getWishlist();
    
    const wishlistIcon = document.querySelector('.bi-heart + .badge');
    if (wishlistIcon) {
      wishlistIcon.textContent = wishlist.length;      
    }

    this.updateWishlistPanel();
  }

  updateWishlistPanel() {
    console.log('updateWishlistPanel called');
    const productService = new ProductService();
    const wishlist = this.getWishlist();
    const wishlistItems = document.getElementById('wishlistItems');
    if (wishlistItems) {
      if (wishlist.length === 0) {
        wishlistItems.innerHTML = '<li class="list-group-item">Your wishlist is empty</li>';
      } else {
        wishlistItems.innerHTML = '';
        wishlist.forEach(productId => {
          const product = productService.getProductById(productId);
          wishlistItems.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
              ${product.name}
              <span>
                <button class="btn btn-sm btn-primary me-2 add-to-cart" data-product-id="${productId}">Add to Cart</button>
                <button class="btn btn-sm btn-danger remove-from-wishlist" data-product-id="${productId}">Remove</button>
              </span>
            </li>
          `;
        });
      }
    }
  }

}