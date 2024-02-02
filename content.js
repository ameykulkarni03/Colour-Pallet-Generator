// Function to extract colors from the page
function extractColors() {
    const colors = new Set(); // Use a Set to ensure uniqueness
    const elements = document.querySelectorAll('*'); // Select all elements on the page

    elements.forEach(element => {
        const style = window.getComputedStyle(element);
        // Add color properties you're interested in
        const backgroundColor = style.backgroundColor;
        const textColor = style.color;

        if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'transparent') {
            colors.add(backgroundColor);
        }
        if (textColor && textColor !== 'rgba(0, 0, 0, 0)' && textColor !== 'transparent') {
            colors.add(textColor);
        }
    });

    return Array.from(colors); // Convert Set to Array to return
}

// Listen for a message from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extractColors") {
        const colors = extractColors();
        sendResponse({colors: colors});
    }
    return true; // Keep the messaging channel open for asynchronous response
});
