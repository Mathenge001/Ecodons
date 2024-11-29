document.addEventListener("DOMContentLoaded", () => {
    const profileData = JSON.parse(localStorage.getItem("profile"));
    if (profileData) {
        document.getElementById("profileImage").src = profileData.photo;
        document.getElementById("profileName").textContent = profileData.name;
    }
});

function openSettings() {
    window.location.href = "check-profile.html";
}

let cart = [];

function scrollToCategory(categoryId) {
    document.getElementById(categoryId).scrollIntoView({ behavior: 'smooth' });
}

function openModal() {
    document.getElementById('addItemModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('addItemModal').style.display = 'none';
}

function showItemDetails(element) {
    const itemDetailContent = document.getElementById('itemDetailContent');
    const item = {
        category: element.getAttribute('data-category'),
        name: element.getAttribute('data-name'),
        description: element.getAttribute('data-description'),
        amount: element.getAttribute('data-amount'),
        location: element.getAttribute('data-location'),
        imageSrc: element.querySelector('img').src
    };
    itemDetailContent.innerHTML = `
        <img src="${item.imageSrc}" alt="${item.name}" style="width:100%; border-radius: 10px;">
        <h3>${item.name}</h3>
        <p><strong>Description:</strong> ${item.description}</p>
        <p><strong>Amount:</strong> ${item.amount}</p>
        <p><strong>Location:</strong> ${item.location}</p>
        <button onclick="addToCart('${item.name}', '${item.category}', '${item.imageSrc}')">Add to Cart</button>
    `;
    document.getElementById('itemDetailModal').style.display = 'block';
}

function closeItemDetailModal() {
    document.getElementById('itemDetailModal').style.display = 'none';
}

function addToCart(name, category, imageSrc) {
    cart.push({ name, category, imageSrc });
    alert(`${name} added to cart.`);
    closeItemDetailModal();
}

function openCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <img src="${item.imageSrc}" alt="${item.name}" style="width: 50px; height: 50px; border-radius: 5px;">
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
    document.getElementById('cartModal').style.display = 'block';
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function checkout() {
    alert('Proceeding to checkout...');
    // Implement checkout logic
    cart = [];
    closeCart();
}

function filterItems(category) {
    const searchInput = document.querySelector(`#${category} .category-search`);
    const query = searchInput.querySelector('input').value.toLowerCase();
    const items = document.querySelectorAll(`#${category} .item`);
    items.forEach(item => {
        const name = item.getAttribute('data-name').toLowerCase();
        if (name.includes(query)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
