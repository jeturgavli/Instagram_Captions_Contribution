document.getElementById('submitBtn').addEventListener('click', function() {
    const githubUsername = document.getElementById('githubUsername').value;
    const caption = document.getElementById('caption').value;
    const mood = document.getElementById('mood').value;

    if (githubUsername && caption && mood) {
        fetch('/add_caption', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: githubUsername, caption, mood })
        }).then(response => response.json())
          .then(data => alert(data.message))
          .catch(error => console.error('Error:', error));
    } else {
        alert('Please fill in all fields');
    }
});

document.getElementById('viewCaptionsBtn').addEventListener('click', function() {
    window.location.href = '/captions';
});

document.getElementById('darkModeSwitch').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
});
