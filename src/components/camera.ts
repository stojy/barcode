
let _track: MediaStreamTrack;

export async function getCapabilities(callback: any) {
  // not supported on firefox or iOS app hosted WkWebView
  var stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: 'environment',
    }
  });

  // assign the stream to a video tag (assumed to exist)
  const video = document.querySelector('video');
  if (!video) {
    throw new Error("can't find video tag")
  }
  video.srcObject = stream;

  // retrieve capabilities from the stream's active track
  _track = stream.getVideoTracks()[0];
  video.addEventListener('loadedmetadata', (e) => {
    window.setTimeout(() => (
      onCapabilitiesReady(_track.getCapabilities())
    ), 500);
  });

  function onCapabilitiesReady(capabilities: MediaTrackCapabilities) {
    if (callback)
      callback(capabilities);
    if (video)
      video.pause();
  }
}

export async function setTorch(enabled: boolean) {
  if (!_track) {
    await getCapabilities(null);
  }
  await _track.applyConstraints({
    advanced: [{ torch: enabled } as any]
  }) 
}

