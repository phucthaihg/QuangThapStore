class LayoutService {
    constructor() {    
        this.loadNavbar();
        this.loadFooter();
        this.loadCartPanel();
        this.loadWishlistPanel();
    }

    loadNavbar() {
        // Load navbar

        // Insert navbar and footer
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        if (navbarPlaceholder) {
            navbarPlaceholder.innerHTML = 
        `
            <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <a class="navbar-brand" href="index.html">
                    <img src="image/logo.png" alt="Waggy" height="30">
                    <span class="secondary-font">Quang Thap</span>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="category.html?category=curtains">Curtains</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="category.html?category=wallpapers">Wallpapers</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Blog</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Contact</a>
                        </li>
                    </ul>
                    <form class="d-flex me-2">
                        <input class="form-control me-2" type="search" placeholder="Search">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <div class="d-flex">
                        <div id="account-info" class="me-2">
                            <!-- Account information will be dynamically inserted here -->
                        </div>
                        <!--a href="#" class="btn btn-outline-secondary me-2" title="Account">
                            <i class="bi bi-person"></i>
                        </a-->
                        <a href="#" class="btn btn-outline-secondary me-2" title="Wishlist">
                            <i class="bi bi-heart"></i>
                        </a>

                        <a href="#" class="btn btn-outline-primary position-relative" title="Cart">
                            <i class="bi bi-cart"></i>
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                3
                                <span class="visually-hidden">items in cart</span>
                            </span>
                        </a>

                    </div>
                </div>
            </div>
        </nav>
        `;

        this.loadAccountInfoHTML()
        }
        
    }

    loadAccountInfoHTML() {
        // Display account information if user is logged in
        const accountInfo = document.getElementById('account-info');
        const accountService = new AccountService();
        const currentUser = accountService.getCurrentUser();
        if (currentUser) {
            accountInfo.innerHTML = `            
                <a href="#" class="btn btn-outline-secondary me-2" title="Account">
                ${currentUser.name}
                </a>
                <button id="logout-btn" class="btn btn-secondary">Logout</button>
            `;        
        } else {
            accountInfo.innerHTML = `
                <a href="#" class="btn btn-outline-secondary me-2" title="Account">
                    <i class="bi bi-person"></i>
                </a>
            `;
        }
    }

    loadFooter() {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = `
        <!-- Footer -->
        <footer class="bg-dark text-light py-5">
            <div class="container">
                <div class="row">
                    <div class="col-md-3">
                        <h5>About Us</h5>
                        <p>Luxury Curtains & Wallpapers</p>
                    </div>
                    <div class="col-md-3">
                        <h5>Quick Links</h5>
                        <ul class="list-unstyled">
                            <li><a href="#" class="text-light">Home</a></li>
                            <li><a href="#" class="text-light">Shop</a></li>
                            <li><a href="#" class="text-light">Blog</a></li>
                            <li><a href="#" class="text-light">Contact</a></li>
                        </ul>
                    </div>
                    <div class="col-md-3">
                        <h5>Contact Us</h5>
                        <p>Email: cuahangquangthap@gmail.com<br>Phone: +1 234 567 8900</p>
                    </div>
                    <div class="col-md-3">
                        <h5>Newsletter</h5>
                        <form>
                            <div class="input-group mb-3">
                                <input type="email" class="form-control" placeholder="Enter your email">
                                <button class="btn btn-primary" type="submit">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
        `;
        }
    }

    loadCartPanel() {
        const cartPanelPlaceholder = document.getElementById('cartPanel-placeholder');
        if (cartPanelPlaceholder) {
            cartPanelPlaceholder.innerHTML = `
            <!-- Sliding Cart Panel -->
        <div id="cartPanel" class="cart-panel">
            <div class="cart-header">
                <h5>Your Cart</h5>
                <button type="button" class="btn-close close-cart-btn" ></button>
            </div>
            <div class="cart-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="cartItems">
                        <!-- Cart items will be dynamically inserted here -->
                    </tbody>
                </table>
            </div>
            <div class="cart-footer">
                <h5>Total: $<span id="cartTotal">0.00</span></h5>
                <a href="checkout.html" class="btn btn-primary">Checkout</a>
            </div>
        </div>
        `;
        }
    }

    loadWishlistPanel() {
        const wishlistPanelPlaceholder = document.getElementById('wishlistPanel-placeholder');
        if (wishlistPanelPlaceholder) {
            wishlistPanelPlaceholder.innerHTML = `
        <!-- Sliding Wishlist Panel -->
        <div id="wishlistPanel" class="wishlist-panel">
            <div class="wishlist-header">
                <h5>Your Wishlist</h5>
                <button type="button" class="btn-close close-wishlist-btn"></button>
            </div>
            <div class="wishlist-body">
                <ul id="wishlistItems" class="list-group">
                    <!-- Wishlist items will be dynamically inserted here -->
                </ul>
            </div>
        </div>
        `;
        }
    }
}