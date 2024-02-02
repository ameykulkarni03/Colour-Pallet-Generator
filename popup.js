document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "extractColors"}, function(response) {
            if (response && response.colors) {
                updatePopupWithColors(response.colors);
            } else {
                console.error("Could not receive colors from the content script.");
                document.getElementById('palette').textContent = 'No colors received. Make sure the content script is loaded and the webpage has colors defined in styles.';
            }
        });
    });
});

function updatePopupWithColors(colors) {
    const palette = document.getElementById('palette');
    palette.innerHTML = ''; // Clear existing colors

    colors.forEach(color => {
        const colorBlock = document.createElement('div');
        colorBlock.className = 'color-block';
        colorBlock.style.backgroundColor = color;
        colorBlock.textContent = color; // Display color value
        palette.appendChild(colorBlock);
    });
}
