export function initVideo() {
  document.querySelectorAll('[data-video-toggle]').forEach(wrapper => {
    const video = wrapper.querySelector('video');
    if (!video) return;

    wrapper.addEventListener('click', () => {
      video.paused ? video.play() : video.pause();
    });
  });
}
