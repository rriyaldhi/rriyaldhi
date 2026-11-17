import * as React from "react";
import BookCover from "./BookCover";
import BookIllustration from "./BookIllustration";
import type { Book } from "./books";

interface BookReaderProps
{
  book: Book;
  startPage: number;
  cover: HTMLButtonElement;
  active: boolean;
  onClose: (page: number) => void;
}

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function BookReader({ book, startPage, cover, active, onClose }: BookReaderProps)
{
  const dialog = React.useRef<HTMLDialogElement>(null);
  const reading = React.useRef<HTMLDivElement>(null);
  const flight = React.useRef<HTMLDivElement>(null);
  const flightCover = React.useRef<HTMLDivElement>(null);
  const spread = React.useRef<HTMLDivElement>(null);
  const motion = React.useRef<Animation[]>([]);
  const titleId = React.useId();
  const { pages } = book;
  const [{ current, previous }, setPage] = React.useState({ current: startPage, previous: startPage });

  function clearMotion()
  {
    motion.current.forEach((animation) => animation.cancel());
    motion.current = [];
    flight.current.hidden = true;
    dialog.current.removeAttribute('data-cover-motion');
  }

  function moveCover(direction: 'normal' | 'reverse')
  {
    const reader = dialog.current;
    const origin = cover.getBoundingClientRect();
    const frame = reader.getBoundingClientRect();
    const page = reading.current.getBoundingClientRect();
    const narrow = window.matchMedia('(max-width: 720px)').matches;
    const x = (narrow ? frame.left : page.left) - origin.left;
    const y = frame.top - origin.top;
    const scaleX = (narrow ? frame.width : page.width) / origin.width;
    const scaleY = frame.height / origin.height;
    const dock = `translate(${x}px, ${y}px) perspective(1400px) scale(${scaleX}, ${scaleY})`;
    const duration = direction === 'normal' ? 540 : 420;

    Object.assign(flight.current.style, {
      top: `${origin.top}px`,
      left: `${origin.left}px`,
      width: `${origin.width}px`,
      height: `${origin.height}px`,
    });
    flight.current.hidden = false;
    reader.style.setProperty('--cover-duration', `${duration}ms`);
    reader.dataset.coverMotion = direction;

    const options: KeyframeAnimationOptions = { duration, direction, fill: 'both' };
    const readerReveal: Keyframe[] = [
      { opacity: 0 },
      { opacity: 0, offset: 0.48, easing: 'ease-out' },
      { opacity: 1, offset: 0.86 },
      { opacity: 1 },
    ];
    const flightAnimation = flightCover.current.animate([
      { transform: 'translate(0, 0) perspective(1400px) scale(1, 1) rotateY(0deg)', easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      { transform: `${dock} rotateY(0deg)`, offset: 0.48, easing: 'ease-in-out' },
      { transform: `${dock} rotateY(-104deg)` },
    ], options);
    motion.current = [
      flightAnimation,
      spread.current.animate(readerReveal, options),
    ];
    flightAnimation.onfinish = () => {
      if (direction === 'reverse') reader.close();
      clearMotion();
    };
  }

  React.useLayoutEffect(() => {
    dialog.current.showModal();
    if (!reducedMotion()) moveCover('normal');
    return () => motion.current.forEach((animation) => animation.cancel());
  }, [cover]);

  React.useLayoutEffect(() => {
    const reader = dialog.current;
    if (!active && reader.open)
    {
      clearMotion();
      reader.close();
    }
  }, [active]);

  function closeReader()
  {
    const reader = dialog.current;
    if (reader.hasAttribute('data-closing')) return;
    if (reducedMotion())
    {
      reader.close();
      return;
    }

    if (reader.dataset.coverMotion === 'normal')
    {
      reader.setAttribute('data-closing', '');
      motion.current[0].onfinish = () => {
        reader.close();
        clearMotion();
      };
      motion.current.forEach((animation) => animation.reverse());
      return;
    }

    clearMotion();
    reader.setAttribute('data-closing', '');
    moveCover('reverse');
  }

  React.useLayoutEffect(() => {
    // On narrow screens the cover sits above the page. Start each turn at the reading area.
    dialog.current.scrollTop = current === previous ? 0 : reading.current.offsetTop;
  }, [current, previous]);

  function turnPage(direction: -1 | 1)
  {
    if (dialog.current.hasAttribute('data-closing')) return;
    setPage((page) => {
      const next = page.current + direction;
      return next < 0 || next >= pages.length
        ? page
        : { current: next, previous: page.current };
    });
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDialogElement>)
  {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if ((event.target as HTMLElement).closest("a")) return;

    if (event.key === "ArrowLeft" || event.key === "ArrowRight")
    {
      event.preventDefault();
      turnPage(event.key === "ArrowLeft" ? -1 : 1);
    }
  }

  return <dialog
    ref={dialog}
    className="book-reader"
    aria-labelledby={titleId}
    onKeyDown={handleKeyDown}
    onCancel={(event) => {
      event.preventDefault();
      closeReader();
    }}
    onClose={() => onClose(current)}
  >
    <div className="book-flight" ref={flight} hidden aria-hidden="true">
      <div className="book-card" ref={flightCover} data-long-title={book.title.length > 12 || undefined}>
        <BookCover book={book} decorative />
      </div>
    </div>
    <div className="book-spread" ref={spread}>
      <button
        type="button"
        className="book-close"
        aria-label="Close book"
        onClick={closeReader}
      >
        ×
      </button>
      <header className="book-cover" data-long-title={book.title.length > 12 || undefined}>
        <h2 id={titleId}>{book.title}</h2>
        {book.subtitle && <p className="book-subtitle">{book.subtitle}</p>}
        <p className="book-author">{book.author}</p>
      </header>
      <div className="book-reading" ref={reading}>
        <div className="book-leaves">
          {pages.map((page, index) => {
            const active = index === current;
            const turningForward = index === previous && previous < current;
            const turningBack = active && previous > current;
            const underTurn = index === previous && previous > current;

            return <article
              key={index}
              className={[
                "book-leaf",
                active || underTurn ? "book-leaf--visible" : "",
                turningForward ? "book-leaf--turn-forward" : "",
                turningBack ? "book-leaf--turn-back" : "",
              ].join(" ")}
              aria-hidden={!active}
              inert={!active}
            >
              <BookIllustration image={page.image} alt={page.alt} />
              <h3>{page.title}</h3>
              <p>{page.text}</p>
              {page.source && <a className="book-source" href={page.source.url}>{page.source.label}</a>}
            </article>;
          })}
        </div>
        <div className="book-controls" role="group" aria-label="Book pages">
          <button type="button" aria-label="Previous page" aria-disabled={current === 0} onClick={() => turnPage(-1)}>
            <span aria-hidden="true">←</span> Previous
          </button>
          <span role="status">Page {current + 1} of {pages.length}</span>
          <button type="button" aria-label="Next page" aria-disabled={current === pages.length - 1} onClick={() => turnPage(1)}>
            Next <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  </dialog>;
}
