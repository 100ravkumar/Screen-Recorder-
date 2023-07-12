// background.js

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'startTranscription' || request.type === 'stopTranscription') {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, request);
      });
    }
  });
  