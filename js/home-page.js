
//responsible for updating profile and name from set up
document.addEventListener("DOMContentLoaded", () => {
    const profileData = JSON.parse(localStorage.getItem("profile"));
    if (profileData) {
        document.getElementById("profileImage").src = profileData.photo;
        document.getElementById("profileName").textContent = profileData.name;
    }
});

//for opening settings when profile is tapped
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
    // Implement checkout logic
    cart = [];
    closeCart();
}


//add item form
function addItemToCategory(item) {
    const categoryElement = document.getElementById(item.category).querySelector('.items');
    const newItemElement = document.createElement('div');
    newItemElement.className = 'item';
    newItemElement.onclick = () => showItemDetails(newItemElement);
    newItemElement.setAttribute('data-category', item.category);
    newItemElement.setAttribute('data-name', item.name);
    newItemElement.setAttribute('data-description', item.description);
    newItemElement.setAttribute('data-amount', item.amount);
    newItemElement.setAttribute('data-location', item.location);
    newItemElement.setAttribute('data-expiry', item.expiry);
    newItemElement.setAttribute('data-expiry-image', item.expiryImage);
    newItemElement.innerHTML = `
        <img src="${URL.createObjectURL(item.image)}" alt="${item.name}">
        <p><strong>${item.name}</strong></p>
        <p>${item.amount}</p>
    `;
    categoryElement.appendChild(newItemElement);
}


document.getElementById('addItemForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newItem = {
        category: formData.get('itemCategory'),
        image: formData.get('itemImage'),
        name: formData.get('itemName'),
        amount: formData.get('itemAmount'),
        recipient: formData.get('itemRecipient'),
        recipientName: formData.get('recipientName'),
        type: formData.get('itemType'),
        description: formData.get('itemDescription'),
        location: formData.get('itemLocation'),
        expiry: formData.get('itemExpiry'),
        expiryImage: formData.get('expiryImage')
    };
    addItemToCategory(newItem);
    closeModal();
    event.target.reset();
});


//opening modals
window.onclick = function(event) {
    const addItemModal = document.getElementById('addItemModal');
    const itemDetailModal = document.getElementById('itemDetailModal');
    const cartModal = document.getElementById('cartModal');
    if (event.target === addItemModal) {
        closeModal();
    } else if (event.target === itemDetailModal) {
        closeItemDetailModal();
    } else if (event.target === cartModal) {
        closeCart();
    }

};


document.addEventListener("DOMContentLoaded", () => {
    const hour = new Date().getHours();
    const isDayTime = hour >= 6 && hour < 18; // Assume day time from 6 AM to 6 PM

    if (isDayTime) {
        document.body.classList.add("day");
    } else {
        document.body.classList.add("night");
    }
});









//menu
function toggleMenu() {
    const menu = document.getElementById('responsiveMenu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

//search
document.getElementById('searchButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const allItems = document.querySelectorAll('.item');

    allItems.forEach(item => {
        const itemName = item.getAttribute('data-name').toLowerCase();
        const itemDescription = item.getAttribute('data-description').toLowerCase();
        const itemLocation = item.getAttribute('data-location').toLowerCase();

        if (itemName.includes(searchTerm) || itemDescription.includes(searchTerm) || itemLocation.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});


//category search
function filterItems(category) {
    const searchInput = document.querySelector(`#${category} .category-search`);
    const filter = searchInput.value.toLowerCase();
    const itemsContainer = document.getElementById(`${category}Items`);
    const items = itemsContainer.getElementsByClassName('item');

    // Loop through all items and hide those that don't match the search query
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const name = item.getAttribute('data-name').toLowerCase();
        const amount = item.getAttribute('data-amount').toLowerCase();
        const location = item.getAttribute('data-location').toLowerCase();

        if (name.includes(filter) || amount.includes(filter) || location.includes(filter)) {
            item.style.display = ''; // Show item
        } else {
            item.style.display = 'none'; // Hide item
        }
    }
}
