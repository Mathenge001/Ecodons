// Function to open the modal
function openModal() {
    document.getElementById('addItemModal').style.display = 'block';
}

// Function to close the modal
function closeModal() {
    document.getElementById('addItemModal').style.display = 'none';
}

// Function to handle item submission
function submitItem() {
    // Retrieve form data
    const itemPhoto = document.getElementById('itemPhoto').files[0];
    const itemName = document.getElementById('itemName').value;
    const itemCategory = document.getElementById('itemCategory').value;
    const itemQuantity = document.getElementById('itemQuantity').value;
    const itemExpiration = document.getElementById('itemExpiration').value;
    const itemLocation = document.getElementById('itemLocation').value;
    const itemSource = document.getElementById('itemSource').value;

    // Store data in local storage
    const itemData = {
        photo: itemPhoto.name,
        name: itemName,
        category: itemCategory,
        quantity: itemQuantity,
        expiration: itemExpiration,
        location: itemLocation,
        source: itemSource
    };
    localStorage.setItem('itemData', JSON.stringify(itemData));

    // Close modal after submission (optional)
    closeModal();

    // Redirect to home page or perform necessary actions
    window.location.href = 'home-page.html';
}

// Function to open settings page
function openSettings() {
    // Implement functionality to open settings page (check-profile.html)
    // Example: window.location.href = 'check-profile.html';
}

// Function to handle item purchase
function purchaseItem() {
    // Implement purchase logic (e.g., remove item from display)
    // You may remove the item from the DOM or mark it as sold

    // Show confirmation modal
    document.getElementById('confirmationModal').style.display = 'block';

    // Optionally: Notify donor via backend or email
    notifyDonor();
}

// Function to close confirmation modal
function closeConfirmationModal() {
    document.getElementById('confirmationModal').style.display = 'none';
}

// Function to confirm receipt of item
function confirmReceived() {
    // Implement logic to mark item as received or remove from display
    // Here, simulate removing item from DOM
    document.querySelector('.item').style.display = 'none';

    // Optionally: Implement rating functionality
    rateDonor();

    // Close confirmation modal
    closeConfirmationModal();
}

// Function to notify donor (placeholder for backend or email notification)
function notifyDonor() {
    // Implement notification logic here (e.g., backend API call, email sending)
    // Placeholder for demonstration
    console.log('Notification sent to donor');
}

// Function to rate donor (placeholder)
function rateDonor() {
    // Implement rating functionality here (e.g., display rating form)
    // Placeholder for demonstration
    const rating = prompt('Rate the donor (1-5 stars):');
    if (rating) {
        alert(`Thank you for rating ${rating} stars!`);
        // Optionally: Store rating in backend or local storage
    }
}
