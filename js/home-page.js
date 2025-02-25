// Responsible for updating profile and name from setup
document.addEventListener("DOMContentLoaded", () => {
    const profileData = JSON.parse(localStorage.getItem("profile"));
    if (profileData) {
        document.getElementById("profileImage").src = profileData.photo;
        document.getElementById("profileName").textContent = profileData.name;
    }
});

// For opening settings when profile is tapped
function openSettings() {
    window.location.href = "check-profile.html";
}

// Example cart data and user contact information
const cart = [
    { name: "T-shirt", amount: "10 pcs", location: "Naka, Nakuru" },
    { name: "Jeans", amount: "5 pcs", location: "Kahawa Wendani" }
];

const userContactDetails = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+254700123456"
};

// Convert cart and user details to a formatted string
function formatCartItems(cart) {
    return cart.map(item => `Name: ${item.name}, Amount: ${item.amount}, Location: ${item.location}`).join("\n");
}

function formatUserDetails(details) {
    return `Name: ${details.name}\nEmail: ${details.email}\nPhone: ${details.phone}`;
}

// On form submit
document.getElementById('checkoutForm').addEventListener('submit', function (event) {
    // Prevent default form submission to inject data dynamically
    event.preventDefault();

    // Prepare data
    const cartDetails = formatCartItems(cart);
    const contactDetails = formatUserDetails(userContactDetails);

    // Populate hidden form fields
    document.getElementById('userContactDetails').value = contactDetails;
    document.getElementById('cartItems').value = cartDetails;

    // Submit the form
    this.submit();
});

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
        expiry: element.getAttribute('data-expiry'),
        expiryImage: element.getAttribute('data-expiry-image'),
        imageSrc: element.querySelector('img').src
    };
    itemDetailContent.innerHTML = `
        <img src="${item.imageSrc}" alt="${item.name}" style="width:100%; border-radius: 10px;">
        <h3>${item.name}</h3>
        <p><strong>Description:</strong> ${item.description}</p>
        <p><strong>Amount:</strong> ${item.amount}</p>
        <p><strong>Location:</strong> ${item.location}</p>
        ${item.expiry ? `<p><strong>Expiry Date:</strong> ${item.expiry}</p>` : ''}
        ${item.expiryImage ? `<img src="${item.expiryImage}" alt="Expiry Date" style="width: 100%; border-radius: 10px;">` : ''}
        <button onclick="addToCart('${item.name}', '${item.category}', '${item.imageSrc}')">Get/Buy</button>
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
    cart = [];
    closeCart();
}

