import { media } from '../config/media.js';

// The NP Digital Twin's main video area. Plays the real video once `media.npVideoSrc`
// is set (see src/config/media.js); until then shows a gray placeholder.
export default function NpMedia() {
  if (media.npVideoSrc) {
    return (
      <video
        src={media.npVideoSrc}
        autoPlay
        playsInline
        className="h-full w-full object-cover"
        aria-label="AI nurse practitioner video"
      >
        <track
          kind="captions"
          src={media.npCaptionsSrc ?? undefined}
          srcLang="en"
          label="English"
        />
      </video>
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-neutral-500">
      <span
        aria-hidden="true"
        className="flex h-28 w-28 items-center justify-center rounded-full bg-neutral-300 text-3xl font-bold text-neutral-700"
      >
        AI
      </span>
      <span className="text-base text-white">Video placeholder</span>
    </div>
  );
}
