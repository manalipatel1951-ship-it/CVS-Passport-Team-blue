import NpIllustration from './NpIllustration.jsx';
import { media } from '../config/media.js';

// MinuteTwin's main video area. Plays the real video once `media.npVideoSrc` is set
// (see src/config/media.js); until then shows the animated illustration.
export default function NpMedia({ speaking, nodKey }) {
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
  return <NpIllustration speaking={speaking} nodKey={nodKey} />;
}
