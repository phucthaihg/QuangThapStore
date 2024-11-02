document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        const product = getProductDetails(parseInt(productId));

        if (product) {
            console.log(product);
            // Update product details in the HTML
            document.getElementById('productName').textContent = product.name;
            document.getElementById('productPrice').textContent = `$${product.price}`;
            document.getElementById('productShortDescription').textContent = product.shortDescription;
            document.getElementById('productLongDescription').innerHTML = product.longDescription;


            // Set up main image
            const mainImageContainer = document.getElementById('mainImageContainer');
            const mainImage = document.createElement('img');
            mainImage.src = product.images[0];
            mainImage.alt = product.name;
            mainImage.className = 'img-fluid mb-3';
            mainImageContainer.appendChild(mainImage);

            // Set up thumbnails
            const thumbnailContainer = document.getElementById('thumbnailContainer');
            thumbnailContainer.style.display = 'flex';
            thumbnailContainer.style.justifyContent = 'start';
            thumbnailContainer.style.overflowX = 'auto';
            thumbnailContainer.style.gap = '8px';

            // Wait for the main image to load before setting up thumbnails
            mainImage.onload = () => {
                const maxThumbnails = Math.min(6, product.images.length);
                const thumbnailSize = Math.floor((mainImage.offsetWidth - (maxThumbnails - 1) * 8) / maxThumbnails);

                product.images.slice(0, maxThumbnails).forEach((imgSrc, index) => {
                    const thumbnail = document.createElement('img');
                    thumbnail.src = imgSrc;
                    thumbnail.alt = `${product.name} thumbnail ${index + 1}`;
                    thumbnail.className = 'img-thumbnail';
                    thumbnail.style.width = `${thumbnailSize}px`;
                    thumbnail.style.height = `${thumbnailSize}px`;
                    thumbnail.style.objectFit = 'cover';
                    thumbnail.style.cursor = 'pointer';
                    thumbnail.style.flexShrink = '0';

                    thumbnail.addEventListener('click', () => {
                        mainImage.src = imgSrc;
                        thumbnailContainer.querySelectorAll('img').forEach(img => img.classList.remove('active'));
                        thumbnail.classList.add('active');
                    });

                    thumbnailContainer.appendChild(thumbnail);
                });

                // Set the first thumbnail as active
                thumbnailContainer.querySelector('img').classList.add('active');

                // Adjust thumbnail container width to match main image
                thumbnailContainer.style.width = `${mainImage.offsetWidth}px`;
            };

            // Display reviews
            const reviewsContainer = document.getElementById('reviewsContainer');
            if (product.reviews && product.reviews.length > 0) {
                product.reviews.forEach(review => {
                    const reviewElement = document.createElement('div');
                    reviewElement.className = 'mb-3 p-3 border rounded';
                    reviewElement.innerHTML = `
                        <h4>${review.reviewer} <small class="text-muted">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</small></h4>
                        <p>${review.title}</p>
                        <p>${review.content}</p>
                    `;
                    reviewsContainer.appendChild(reviewElement);
                });
            } else {
                reviewsContainer.innerHTML = '<p>No reviews yet. Be the first to review this product!</p>';
            }

            // Handle review form submission
            const reviewForm = document.getElementById('reviewForm');
            reviewForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const reviewer = document.getElementById('reviewerName').value;
                const rating = document.getElementById('rating').value;
                const title = document.getElementById('reviewTitle').value;
                const content = document.getElementById('reviewText').value;
                
                // Here you would typically send this data to your server
                console.log('New review:', { reviewer, rating, title, content });
                
                // For now, let's just add it to the page
                const newReview = document.createElement('div');
                newReview.className = 'mb-3 p-3 border rounded';
                newReview.innerHTML = `
                    <h4>${reviewer} <small class="text-muted">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</small></h4>
                    <p>${title}</p>
                    <p>${content}</p>
                `;
                reviewsContainer.insertBefore(newReview, reviewsContainer.firstChild);
                
                // Clear the form
                reviewForm.reset();
            });

        } else {
            console.error('Product not found');
        }
    } else {
        console.error('No product ID provided in the URL');
    }
});