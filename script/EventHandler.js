class EventHandler {
    constructor(accountService, cartService, wishlistService, productService) {
        this.accountService = accountService;
        this.cartService = cartService;
        this.wishlistService = wishlistService;
        this.productService = productService;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.addEventListener('click', (event) => this.handleClick(event));
        document.addEventListener('change', (event) => this.handleChange(event));
    }

    handleClick(event) {
        // clicks on classes
        if (event.target.classList.contains('add-to-cart')) {
            this.handleAddToCart(event);
        } else if (event.target.classList.contains('remove-from-cart')) {
            this.handleRemoveFromCart(event);
        } else if (event.target.classList.contains('cart-item-quantity')) {
            this.handleUpdateCartQuantity(event);
        } else if (event.target.closest('.bi-cart')) {
            this.cartService.toggleCart(event);
        } else if (event.target.classList.contains('close-cart-btn')) {
            this.cartService.toggleCart(event);
        } else if (event.target.classList.contains('add-to-wishlist')) {
            this.handleAddToWishlist(event);
        } else if (event.target.classList.contains('remove-from-wishlist')) {
            this.handleRemoveFromWishlist(event);
        } else if (event.target.classList.contains('wishlist-item-quantity')) {
            this.handleUpdateWishlistQuantity(event);
        } else if (event.target.closest('.bi-heart')) {
            this.wishlistService.toggleWishlist(event);
        } else if (event.target.classList.contains('close-wishlist-btn')) {
            this.wishlistService.toggleWishlist(event);
        }
        
        // clicks on ids
        if (event.target.id === 'logout-btn') {
            this.handleLogout();
        } 

        // Add more click handlers as needed
    }

    handleChange(event) {
        if (event.target.classList.contains('cart-item-quantity')) {
            this.handleUpdateCartQuantity(event);
        }
    }

    handleAddToCart(event) {
        console.log('handleAddToCart', event.target);
        const productId = parseInt(event.target.dataset.productId);
        if (productId) {
            this.cartService.addToCart(productId);
            this.cartService.updateCartUI();
        }
    }

    handleRemoveFromCart(event) {
        const productId = parseInt(event.target.dataset.productId);
        if (productId) {
            this.cartService.removeFromCart(productId);
            this.cartService.updateCartUI();
        }
    }

    handleUpdateCartQuantity(event) {
        const productId = parseInt(event.target.dataset.productId);
        const newQuantity = parseInt(event.target.value);
        console.log(`Updating product ${productId} to quantity ${newQuantity}`);
        
        if (newQuantity > 0) {
            this.cartService.updateCartItemQuantity(productId, newQuantity);
        } else {
            this.cartService.removeFromCart(productId);
        }              
        this.cartService.updateCartUI();
    }

    handleAddToWishlist(event) {
        const productId = parseInt(event.target.dataset.productId);
        if (productId) {
            this.wishlistService.addToWishlist(productId);
            this.wishlistService.updateWishlistUI();
        }
    }   

    handleRemoveFromWishlist(event) {
        const productId = parseInt(event.target.dataset.productId);
        if (productId) {
            this.wishlistService.removeFromWishlist(productId);
            this.wishlistService.updateWishlistUI();
        }
    }   

    handleUpdateWishlistQuantity(event) {
        const productId = parseInt(event.target.dataset.productId);
        const newQuantity = parseInt(event.target.value);
        console.log(`Updating product ${productId} to quantity ${newQuantity}`);
        
        if (newQuantity > 0) {
            this.wishlistService.updateWishlistItemQuantity(productId, newQuantity);
        } else {
            this.wishlistService.removeFromWishlist(productId);
        }              
        this.wishlistService.updateWishlistUI();
    }

    handleLogout() {
        this.accountService.logout();
        location.reload();
    }

    // Add more event handling methods as needed
}