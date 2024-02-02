chrome.runtime.onInstalled.addListener(() => {
  console.log('Color Palette Generator installed.');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getColorPalette") {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {action: "extractColors"}, (response) => {
        sendResponse({colors: response.colors});
      });
    });
    return true; 
  }
});
  