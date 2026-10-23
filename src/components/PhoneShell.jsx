import BackButton from './BackButton.jsx';
import { useAppState } from '../state/AppState.jsx';

/**
 * The phone-sized frame every screen sits in.
 * - Phones: fills the whole screen, at any phone size.
 * - Tablet/desktop: a centered phone the shape of a regular iPhone (390×844)
 *   with a thick black edge.
 *
 * Props:
 * - title:      screen heading shown in the top bar
 * - back:       where Back goes (a route like "/fam"), true for "previous screen",
 *               or false to hide it (only for home-like screens and the video call)
 * - leading:    element shown instead of the Back button (e.g. a profile icon)
 * - titleIcon:  small icon just left of the title (e.g. the CVS heart on Caregiver Passport steps)
 * - actions:    elements on the right of the top bar (e.g. round icon buttons)
 * - banner:     optional element under the top bar (e.g. "Viewing Sarah's health as caregiver")
 * - footer:     optional element pinned to the bottom (e.g. bottom navigation, chat box)
 * - hideHeader: hide the top bar entirely (e.g. welcome screen, video call)
 * - gray:       light gray page background (for screens made of white cards)
 * - bare:       no padding around the content (e.g. full-screen video)
 * - overlay:    something covering the whole phone (e.g. the splash animation, a pop-up sheet)
 */
export default function PhoneShell({
  title,
  back = true,
  leading,
  titleIcon,
  actions,
  banner,
  footer,
  hideHeader = false,
  gray = false,
  bare = false,
  overlay,
  children,
}) {
  const { notice } = useAppState();
  return (
    <div className="phone-stage">
      <div className={`phone-frame safe-area ${gray ? 'bg-canvas' : 'bg-white'}`}>
        {(!hideHeader || banner) && (
          <header>
            {!hideHeader && (
              <div className="flex min-h-16 items-center gap-2 border-b border-line bg-white px-4 py-2">
                {leading ??
                  (back !== false && <BackButton to={back === true ? undefined : back} />)}
                {title && (
                  <h1 className="flex min-w-0 flex-1 items-center gap-2 text-xl leading-tight font-bold text-ink">
                    {titleIcon}
                    <span className="min-w-0">{title}</span>
                  </h1>
                )}
                {actions && (
                  <div className="ml-auto flex shrink-0 items-center gap-1">{actions}</div>
                )}
              </div>
            )}
            {banner}
          </header>
        )}
        <main
          className={`no-scrollbar flex flex-1 flex-col overflow-y-auto ${bare ? '' : 'px-4 py-5'}`}
        >
          {children}
        </main>
        {footer && <footer>{footer}</footer>}

        {/* Small pop-up message, e.g. "Not part of this demo" */}
        <div
          role="status"
          className="pointer-events-none absolute inset-x-4 bottom-28 flex justify-center"
        >
          {notice && (
            <p className="animate-slide-in rounded-full bg-ink px-5 py-3 text-base font-semibold text-white shadow-lg">
              {notice}
            </p>
          )}
        </div>
        {overlay}
      </div>
    </div>
  );
}
