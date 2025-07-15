const statusText = document.getElementById("status");
const videoSource = document.getElementById("videoSource");
const media = document.getElementById("media");

function setMediaQuality() {
  let quality = 'high'; // default

  if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    if (connection.saveData || connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
      quality = 'low';
    } else if (connection.effectiveType === '3g') {
      quality = 'medium';
    }

    statusText.innerText = `Network: ${connection.effectiveType}, Save Data: ${connection.saveData}, Loading: ${quality} quality`;
  } else {
    statusText.innerText = "Network Information API is not supported. Defaulting to high quality.";
  }

  const videoMap = {
    low: 'assets/SampleVideo_360x240_1mb.mp4',
    medium: 'assets/SampleVideo_640x360_1mb.mp4',
    high: 'assets/SampleVideo_720x480_1mb.mp4'
  };

  videoSource.src = videoMap[quality];
  media.load();
  media.autoplay = true;
}

setMediaQuality();

// Reapply video quality if the network changes
if ('connection' in navigator && navigator.connection.addEventListener) {
  navigator.connection.addEventListener('change', setMediaQuality);
}
