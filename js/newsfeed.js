document.getElementById('search-button').addEventListener('click', function() {
    var query = document.getElementById('search-bar').value.toLowerCase();
    var posts = document.querySelectorAll('.post');

    posts.forEach(function(post) {
        var title = post.querySelector('h2').textContent.toLowerCase();
        var content = post.querySelector('p').textContent.toLowerCase();

        if (title.includes(query) || content.includes(query)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
});

// Example code for edit and delete buttons
document.querySelectorAll('.edit-button').forEach(function(button) {
    button.addEventListener('click', function() {
        alert('Edit functionality is not yet implemented.');
    });
});

document.querySelectorAll('.delete-button').forEach(function(button) {
    button.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete this post?')) {
            button.parentElement.remove();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var now = new Date();
    var hour = now.getHours();
    var body = document.body;

    if (hour >= 7 && hour < 10) {
        body.style.background = 'linear-gradient(to bottom, #87CEEB, #FFD700, #98FB98, #F5F5DC)';
    } else if (hour >= 10 && hour < 17) {
        body.style.background = 'linear-gradient(to bottom, #1E90FF, #32CD32, #FFA500, #FFFFFF)';
    } else {
        body.style.background = 'linear-gradient(to bottom, #003366, #8A2BE2, #D3D3D3, #C0C0C0)';
    }
});

