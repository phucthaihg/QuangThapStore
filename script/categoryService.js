const categories = [
    {
      id: 1,
      name: "Curtains",
      description: "Various types of curtains for home decor.",
      image: "https://www.curtarra.com/Linencurtains-9C5.jpg",
      parentCategory: null // or the ID of a parent category
    },
    {
        id: 2,
        name: "Wallpapers",
        description: "Various types of wallpapers for home decor.",
        image: "https://res.cloudinary.com/gimmersta-wallpaper/image/upload/c_fill,f_auto,fl_progressive,q_auto,w_200,h_200/v1711026666/cronos-rw/product-group/nature.jpg",
        parentCategory: null // or the ID of a parent category
      },
          
  ];

class CategoryService {
    constructor() {}

    getCategoryById(id) {
        return categories.find(category => category.id === id);
    }

    getAllCategories() {
        return categories;
    }

    createCategoryCard(category) {
        return `
            <div class="card h-100">
                <a href="category.html?category=${category.name}" class="text-decoration-none">
                    <img src="${category.image}" class="card-img-top" alt="${category.name}">
                    <div class="card-body d-flex flex-column text-center">
                        <h5 class="card-title">${category.name}</h5>
                    </div>
                </a>            
            </div>
        `;
    }
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