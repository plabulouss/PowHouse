const videos = document.querySelectorAll(".no-controls-video");

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
