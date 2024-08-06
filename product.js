document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const apiUrl = `https://dummyjson.com/products/${productId}`;
    const productDetail = document.getElementById('product-detail');
    const relatedProductList = document.getElementById('related-product-list');
    const allProductsUrl = 'https://dummyjson.com/products';

    function fetchProductDetail() {
        fetch(apiUrl)
            .then(res => res.json())
            .then(product => {
                displayProductDetail(product);
                fetchRelatedProducts(product.category, product.id);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
                productDetail.innerHTML = '<p>Error fetching product details</p>';
            });
    }

    function displayProductDetail(product) {
        productDetail.innerHTML = `
            <div class="card mb-4">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${product.thumbnail}" class="img-fluid rounded-start" alt="${product.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text"><strong>Price:</strong> $${product.price}</p>
                            <p class="card-text"><strong>Category:</strong> ${product.category}</p>
                            <a href="nameProject‏.html" class="btn btn-primary">Back to Products</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function fetchRelatedProducts(category, currentProductId) {
        fetch(allProductsUrl)
            .then(res => res.json())
            .then(data => {
                const relatedProducts = data.products.filter(product => product.category === category && product.id !== currentProductId);
                displayRelatedProducts(relatedProducts);
            })
            .catch(error => {
                console.error('Error fetching related products:', error);
            });
    }

    function displayRelatedProducts(products) {
        relatedProductList.innerHTML = '';
        if (products.length === 0) {
            relatedProductList.innerHTML = '<p>No related products found</p>';
            return;
        }
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('col-md-4');
            productCard.innerHTML = `
                <div class="product-card card mb-4">
                    <a href="project.html?id=${product.id}" class="product-link">
                        <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text"><strong>Price:</strong> $${product.price}</p>
                    </div>
                </div>
            `;
            relatedProductList.appendChild(productCard);
        });
    }

    fetchProductDetail();
});
