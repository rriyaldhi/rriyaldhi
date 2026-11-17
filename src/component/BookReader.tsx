import * as React from "react";
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

function coverTransform(cover: DOMRect, reader: DOMRect)
{
  const x = cover.left + cover.width / 2 - (reader.left + reader.width / 2);
  const y = cover.top + cover.height / 2 - (reader.top + reader.height / 2);
  const scale = Math.min(cover.width / reader.width, cover.height / reader.height, 0.8);
  return `perspective(1200px) translate(${x}px, ${y}px) rotateY(-24deg) scale(${scale})`;
}

const readerOpen = 'perspective(1200px) translate(0, 0) rotateY(0deg) scale(1)';
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function BookReader({ book, startPage, cover, active, onClose }: BookReaderProps)
{
  const dialog = React.useRef<HTMLDialogElement>(null);
  const reading = React.useRef<HTMLDivElement>(null);
  const motion = React.useRef<Animation>(null);
  const titleId = React.useId();
  const { pages } = book;
  const [{ current, previous }, setPage] = React.useState({ current: startPage, previous: startPage });

  React.useLayoutEffect(() => {
    const reader = dialog.current;
    reader.showModal();
    if (!reducedMotion())
    {
      motion.current = reader.animate([
        { transform: coverTransform(cover.getBoundingClientRect(), reader.getBoundingClientRect()) },
        { transform: readerOpen },
      ], { duration: 420, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
    }
    return () => motion.current?.cancel();
  }, [cover]);

  React.useLayoutEffect(() => {
    const reader = dialog.current;
    if (!active && reader.open)
    {
      motion.current?.cancel();
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

    const currentTransform = getComputedStyle(reader).transform;
    motion.current?.cancel();
    const origin = coverTransform(cover.getBoundingClientRect(), reader.getBoundingClientRect());
    reader.setAttribute('data-closing', '');
    motion.current = reader.animate([
      { transform: currentTransform === 'none' ? readerOpen : currentTransform },
      { transform: origin, opacity: 0 },
    ], { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.65, 1)', fill: 'forwards' });
    motion.current.onfinish = () => reader.close();
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
    data-opening-from-shelf=""
    aria-labelledby={titleId}
    onKeyDown={handleKeyDown}
    onCancel={(event) => {
      event.preventDefault();
      closeReader();
    }}
    onClose={() => onClose(current)}
  >
    <button
      type="button"
      className="book-close"
      aria-label="Close book"
      onClick={closeReader}
    >
      ×
    </button>
    <div className="book-spread">
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
