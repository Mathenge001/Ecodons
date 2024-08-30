// Handle opening chat
function openChat(name, chatId) {
    document.getElementById('chats-list-section').style.display = 'none';
    document.getElementById('chat-window').style.display = 'flex';
    document.getElementById('chat-with').innerText = `Chat with ${name}`;

    // Load messages (mockup for now)
    document.getElementById('messages').innerHTML = `
        <div class="message received">
            <p>Hello, ${name}!</p>
            <div class="timestamp">10:00 AM</div>
        </div>
        <div class="message sent">
            <p>Hi there!</p>
            <div class="timestamp">10:01 AM</div>
        </div>
    `;
}

// Handle back button click
document.getElementById('back-btn').addEventListener('click', () => {
    document.getElementById('chats-list-section').style.display = 'flex';
    document.getElementById('chat-window').style.display = 'none';
});

// Time-based color theme change
function updateTheme() {
    const hour = new Date().getHours();
    const root = document.documentElement;

    if (hour >= 6 && hour < 18) {
        // Daytime colors
        root.style.setProperty('--background-color', '#87CEEB');
        root.style.setProperty('--header-background', '#00BFFF');
        root.style.setProperty('--button-background', '#3CB371');
        root.style.setProperty('--sent-background', '#90EE90');
        root.style.setProperty('--hover-background', '#F0F0F0');
    } else {
        // Nighttime colors
        root.style.setProperty('--background-color', '#2F4F4F');
        root.style.setProperty('--header-background', '#191970');
        root.style.setProperty('--button-background', '#708090');
        root.style.setProperty('--sent-background', '#778899');
        root.style.setProperty('--hover-background', '#696969');
    }
}

// Open group creation modal
document.getElementById('new-group-btn').addEventListener('click', () => {
    document.getElementById('group-modal').style.display = 'flex';
});

// Close group creation modal
document.getElementById('close-modal-btn').addEventListener('click', () => {
    document.getElementById('group-modal').style.display = 'none';
});

// Add member functionality
document.getElementById('add-member-btn').addEventListener('click', () => {
    const email = document.getElementById('add-member').value.trim();
    if (email) {
        const membersList = document.getElementById('members-list');
        const memberItem = document.createElement('div');
        memberItem.classList.add('member-item');
        memberItem.innerText = email;
        membersList.appendChild(memberItem);
        document.getElementById('add-member').value = '';
    }
});

// Create group functionality
document.getElementById('group-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const groupName = document.getElementById('group-name').value.trim();
    const groupDescription = document.getElementById('group-description').value.trim();
    const members = Array.from(document.querySelectorAll('#members-list .member-item'))
                        .map(item => item.innerText);

    if (groupName) {
        addChatToList(groupName);
        document.getElementById('group-modal').style.display = 'none';
        document.getElementById('group-name').value = '';
        document.getElementById('group-description').value = '';
        document.getElementById('members-list').innerHTML = '';
    }
});

// Function to add new chat to the chat list
function addChatToList(groupName) {
    const chatList = document.getElementById('chat-list');
    const chatItem = document.createElement('div');
    chatItem.classList.add('chat-item');
    chatItem.onclick = () => openChat(groupName, Date.now()); // Generate a unique ID
    chatItem.innerHTML = `
        <img src="img/sample-avatar-group.jpg" alt="${groupName}" class="chat-avatar">
        <div class="chat-info">
            <h3>${groupName}</h3>
            <p>Group created</p>
        </div>
    `;
    chatList.appendChild(chatItem);
}

// Handle sending messages
document.getElementById('send-btn').addEventListener('click', () => {
    const messageBox = document.getElementById('message-box');
    const messageText = messageBox.value.trim();
    if (messageText) {
        const messagesContainer = document.getElementById('messages');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'sent');
        messageDiv.innerHTML = `
            <p>${messageText}</p>
            <div class="timestamp">${new Date().toLocaleTimeString()}</div>
        `;
        messagesContainer.appendChild(messageDiv);
        messageBox.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
    }
});

// Handle file attachment
document.getElementById('attach-btn').addEventListener('click', () => {
    document.getElementById('file-input').click(); // Trigger file input dialog
});

// Handle file selection
document.getElementById('file-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const messagesContainer = document.getElementById('messages');
        const fileUrl = URL.createObjectURL(file); // Create URL for the file
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'sent');
        messageDiv.innerHTML = `
            <p>Attached file: <a href="${fileUrl}" download="${file.name}">${file.name}</a></p>
            <div class="timestamp">${new Date().toLocaleTimeString()}</div>
        `;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
    }
});

// Initialize theme
updateTheme();
