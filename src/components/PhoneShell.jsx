import BackButton from './BackButton.jsx';

/**
 * The phone-sized frame every screen sits in.
 * - Phones: fills the whole screen.
 * - Tablet/desktop: a centered, phone-width column with a soft frame.
 *
 * Props:
 * - title:      screen heading shown in the top bar
 * - back:       where Back goes (a route like "/fam"), true for "previous screen",
 *               or false to hide it (only for the very first screen)
 * - banner:     optional element under the top bar (e.g. "Viewing Sarah's dashboard as caregiver")
 * - footer:     optional element pinned to the bottom (e.g. bottom navigation)
 * - hideHeader: hide the top bar entirely (e.g. full-bleed welcome screen)
 */
export default function PhoneShell({
  title,
  back = true,
  banner,
  footer,
  hideHeader = false,
  children,
}) {
  return (
    <div className="flex min-h-dvh justify-center sm:items-center sm:py-6">
      <div className="flex min-h-dvh w-full max-w-[430px] flex-col bg-white sm:min-h-0 sm:h-[min(900px,calc(100dvh-3rem))] sm:overflow-hidden sm:rounded-[2rem] sm:border sm:border-line sm:shadow-xl">
        {!hideHeader && (
          <header className="flex min-h-14 items-center gap-2 border-b border-line px-2">
            {back !== false && <BackButton to={back === true ? undefined : back} />}
            {title && <h1 className="flex-1 truncate pr-2 text-xl font-bold text-ink">{title}</h1>}
          </header>
        )}
        {banner}
        <main className="flex flex-1 flex-col overflow-y-auto px-4 py-5">{children}</main>
        {footer}
      </div>
    </div>
  );
}
