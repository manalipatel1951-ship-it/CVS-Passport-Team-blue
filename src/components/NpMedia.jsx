import { media } from '../config/media.js';

// The person on the MinuteTwin video call.
const MINUTETWIN_PHOTO = './media/minutetwin.png';

// MinuteTwin's main video area. Plays a real video once `media.npVideoSrc` is set
// (see src/config/media.js). Until then, shows the still photo.
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
    <img
      src={MINUTETWIN_PHOTO}
      alt=""
      className="h-full w-full object-cover object-center"
    />
  );
}
