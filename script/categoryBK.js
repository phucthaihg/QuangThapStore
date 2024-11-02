document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    if (category) {
        document.getElementById('categoryTitle').textContent = capitalizeFirstLetter(category);
        loadProducts(category);
    } else {
        document.getElementById('categoryTitle').textContent = 'All Products';
        loadAllProducts();
    }
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function loadProducts(category) {
    const filteredProducts = Object.values(products).filter(product => capitalizeFirstLetter(product.category) === capitalizeFirstLetter(category));
    console.log(filteredProducts);

    displayProducts(filteredProducts);
    setupPagination(Math.ceil(filteredProducts.length / 8)); // Assuming 12 products per page
}

function loadAllProducts() {
    const allProducts = Object.values(products);
    displayProducts(allProducts);
    setupPagination(Math.ceil(allProducts.length / 8)); // Assuming 12 products per page
}

function displayProducts(productsToDisplay) {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Clear existing products

    productsToDisplay.forEach(product => {
        productList.appendChild(createProductCard(product));
    });
}

function createProductCard(product) {
    console.log(product)
    const card = document.createElement('div');
    card.className = 'col-md-4 col-lg-3';
    card.innerHTML = `
        <div class="card h-100">
            <a href="product.html?id=${product.id}" class="text-decoration-none">
                <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.shortDescription}</p>
                    <p class="card-text mt-auto"><strong>${product.price}</strong></p>
                    <button class="btn btn-primary mt-2" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="btn btn-outline-secondary mt-2" onclick="addToWishlist(${product.id})">Add to Wishlist</button>
                </div>
            </a>
        </div>
    `;
    return card;
}

function setupPagination(totalPages) {
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = ''; // Clear existing pagination

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = 'page-item';
        const a = document.createElement('a');
        a.className = 'page-link';
        a.href = '#';
        a.textContent = i;
        a.onclick = function(e) {
            e.preventDefault();
            goToPage(i);
        };
        li.appendChild(a);
        paginationElement.appendChild(li);
    }
}

function goToPage(page) {
    // Implement page navigation logic here
    console.log(`Navigating to page ${page}`);
}

// Assuming addToCart and addToWishlist functions are defined in cart.js and wishlist.js respectively