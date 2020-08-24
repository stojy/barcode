
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
  video.addEventListener('loadedmetadata', (_e) => {
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

export function getCameraResolution(): [number, number] {
  // use low(er) resolution (e.g. 480px) instead of the camera's maximum allowed resolution to reduce processing overheads.. also not neeed to read a barcode
  let width = 480
  let height = 240

  // camera screen/width is taken from a landscape perspective, so for potrait (e.g. mobile) usage the values are reversed
  if (window.screen.height > window.screen.width) {
    return [ height, width ]
  }
  return [ width, height ]
}

