const videos = document.querySelectorAll(".no-controls-video");

function showPlaybackControls(video) {
  video.controls = true;
}

for (const video of videos) {
  video.addEventListener("error", () => {
    console.error("Homepage video failed to load.", video.currentSrc, video.error);
    showPlaybackControls(video);
  });
}

if (!("IntersectionObserver" in window)) {
  for (const video of videos) {
    showPlaybackControls(video);
  }
} else {
  const videoObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const video = entry.target;

        if (!(video instanceof HTMLVideoElement)) {
          throw new Error("A homepage video could not be observed.");
        }

        if (entry.isIntersecting) {
          video.play().catch((error) => {
            console.error("Homepage video playback failed.", error);
            showPlaybackControls(video);
          });
        } else {
          video.pause();
        }
      }
    },
    { threshold: 0.1 },
  );

  for (const video of videos) {
    videoObserver.observe(video);
  }
}
