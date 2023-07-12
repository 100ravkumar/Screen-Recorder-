// content.js

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'startTranscription') {
      startTranscription();
    } else if (request.type === 'stopTranscription') {
      stopTranscription();
    }
  });



  let desktopMediaStream = null;
  let isRecording = false;
  const desktopChunks = [];
  
  
  
  
  // Function for starting the recording
  async function startTranscription() {
    try {
      desktopMediaStream = await navigator.mediaDevices.getDisplayMedia({preferCurrentTab: true,
        video: { width: 1280, height: 720 },audio : true
      });
  
      const desktopMediaRecorder = new MediaRecorder(desktopMediaStream);
  
  
      desktopMediaRecorder.addEventListener('dataavailable', (event) => {
        if (event.data.size > 0) {
          desktopChunks.push(event.data);
        }
      });
  
      desktopMediaRecorder.start();
  
      isRecording = true;
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }
  
  function stopTranscription() {
    if (isRecording) {
      if (desktopMediaStream) {
        desktopMediaStream.getTracks().forEach((track) => track.stop());
      }
      
      isRecording = false;
  
      setTimeout(() => {
        // Stop recording system audio
  
        // Combine and download the recorded files separately
        downloadVideo(desktopChunks, 'screen_video.webm');
      }, 1000); // Delay the downloads by 1 second (adjust as needed)
    }
  }
  
  
  
  // Function to download the screen video
  function downloadVideo(chunks, fileName) {
    const combinedBlob = new Blob(chunks, { type: 'video/webm' });
    const combinedUrl = URL.createObjectURL(combinedBlob);
    const combinedLink = document.createElement('a');
    combinedLink.href = combinedUrl;
    combinedLink.download = fileName;
    combinedLink.click();
  }
  
  
  
  
  
  
    
  
  