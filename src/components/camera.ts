
let _track: MediaStreamTrack;

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
      _track = stream.getVideoTracks()[0];

      video.addEventListener('loadedmetadata', (e) => {
        window.setTimeout(() => (
          onCapabilitiesReady(_track.getCapabilities())
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

export function setTorch(enabled: boolean) {
  debugger;
  _track.applyConstraints({
    advanced: [{ torch: enabled } as any]
  })
    .catch(e => console.log(e));
}

