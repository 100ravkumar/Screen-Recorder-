// popup.js





document.getElementById('transcriptionButton').addEventListener('click', function() {
    chrome.runtime.sendMessage({ type: 'startTranscription' });
  });
  
  document.getElementById('transcriptionstopButton').addEventListener('click', function() {
    chrome.runtime.sendMessage({ type: 'stopTranscription' });
  });
  
  
  
  
  