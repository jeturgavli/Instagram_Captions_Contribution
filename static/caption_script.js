document.addEventListener('DOMContentLoaded', function() {
    fetch('/get_captions')
        .then(response => response.json())
        .then(data => {
            const captionsList = document.getElementById('captionsList');
            data.captions.forEach(caption => {
                const captionItem = document.createElement('div');
                captionItem.className = 'list-group-item';
                captionItem.innerHTML = `
                    <strong>@${caption.username}</strong>:
                    <span>${caption.caption} <span class="badge bg-${caption.mood}">${caption.mood}</span></span>
                    <button class="btn btn-sm btn-secondary float-end" onclick="copyToClipboard('${caption.caption}')">Copy</button>
                `;
                captionsList.appendChild(captionItem);
            });
        })
        .catch(error => console.error('Error:', error));
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Caption copied to clipboard!');
    }).catch(err => {
        console.error('Error copying text: ', err);
    });
}

document.getElementById('darkModeSwitch').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
});
