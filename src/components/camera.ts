
export function getCapabilities(callback: any) {
  navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: 'environment',
    }
  })
    .then((stream) => {
      const video = document.querySelector('video');
      if (!video) {
        throw new Error("can't find video tag")
      }

      video.srcObject = stream;

      // get the active track of the stream
      const track = stream.getVideoTracks()[0];

      video.addEventListener('loadedmetadata', (e) => {
        window.setTimeout(() => (
          onCapabilitiesReady(track.getCapabilities())
        ), 500);
      });

      function onCapabilitiesReady(capabilities: MediaTrackCapabilities) {
        callback(capabilities);

        if (!!video)
          video.pause();
      }
    })
    .catch(err => console.error('getUserMedia() failed: ', err));
}
