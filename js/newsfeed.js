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
