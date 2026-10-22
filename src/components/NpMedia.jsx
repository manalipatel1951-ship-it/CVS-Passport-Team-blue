import { media } from '../config/media.js';

// MinuteTwin's main video area. Plays the real video once `media.npVideoSrc` is set
// (see src/config/media.js); until then shows a gray placeholder.
export default function NpMedia() {
  if (media.npVideoSrc) {
    return (
      <video
        src={media.npVideoSrc}
        autoPlay
        playsInline
        className="h-full w-full object-cover"
        aria-label="MinuteTwin video"
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
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-neutral-600">
      <span
        aria-hidden="true"
        className="flex h-32 w-32 items-center justify-center rounded-full bg-neutral-400 text-4xl font-bold text-neutral-800"
      >
        AI
      </span>
      <span className="text-base text-white">Video placeholder</span>
    </div>
  );
}
