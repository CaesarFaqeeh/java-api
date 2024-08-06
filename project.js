document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = 'https://dummyjson.com/products';
    const productList = document.getElementById('product-list');
    const message = document.getElementById('message');
    const searchBox = document.getElementById('search-box');
    const categoryFilter = document.getElementById('category-filter');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    function fetchProducts() {
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                const products = data.products;
                displayProducts(products);
                populateCategories(products);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                message.innerText = 'Error fetching products';
            });
    }

    function displayProducts(products) {
        productList.innerHTML = '';
        if (products.length === 0) {
            message.innerText = 'No products found';
            return;
        }
        message.innerText = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('col-md-4');
            productCard.innerHTML = `
                <div class="product-card card mb-4 animate__animated animate__fadeInUp">
                    <a href="project.html?id=${product.id}" class="product-link">
                        <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text"><strong>Price:</strong> $${product.price}</p>
                        <button class="btn btn-primary">Buy</button>
                        <button class="btn btn-secondary">Add to Cart</button>
                    </div>
                </div>
            `;
            productList.appendChild(productCard);
        });
    }

    function populateCategories(products) {
        const categories = [...new Set(products.map(product => product.category))];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    searchBox.addEventListener('input', () => {
        const query = searchBox.value.toLowerCase();
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                const filteredProducts = data.products.filter(product => product.title.toLowerCase().includes(query));
                displayProducts(filteredProducts);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                message.innerText = 'Error fetching products';
            });
    });

    categoryFilter.addEventListener('change', () => {
        const selectedCategory = categoryFilter.value;
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                const filteredProducts = selectedCategory ? data.products.filter(product => product.category === selectedCategory) : data.products;
                displayProducts(filteredProducts);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                message.innerText = 'Error fetching products';
            });
    });

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        document.querySelectorAll('.navbar, .card, .btn-outline-light, .product-card').forEach(element => {
            element.classList.toggle('dark-mode');
        });
    }

    darkModeToggle.addEventListener('click', toggleDarkMode);

    fetchProducts();
});
