import * as React from "react";
import BookIllustration from "./BookIllustration";
import type { Book } from "./books";

interface BookReaderProps
{
  book: Book;
  startPage: number;
  onClose: (page: number) => void;
}

export default function BookReader({ book, startPage, onClose }: BookReaderProps)
{
  const dialog = React.useRef<HTMLDialogElement>(null);
  const titleId = React.useId();
  const { pages } = book;
  const [{ current, previous }, setPage] = React.useState({ current: startPage, previous: startPage });

  React.useLayoutEffect(() => {
    dialog.current.showModal();
  }, []);

  React.useLayoutEffect(() => {
    dialog.current.scrollTop = 0;
  }, [current]);

  function turnPage(direction: -1 | 1)
  {
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
    onClose={() => onClose(current)}
  >
    <button
      type="button"
      className="book-close"
      aria-label="Close book"
      onClick={() => dialog.current.close()}
    >
      ×
    </button>
    <div className="book-spread">
      <header className="book-cover" data-long-title={book.title.length > 12 || undefined}>
        <h2 id={titleId}>{book.title}</h2>
        {book.subtitle && <p className="book-subtitle">{book.subtitle}</p>}
        <p className="book-author">{book.author}</p>
      </header>
      <div className="book-reading">
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
              <BookIllustration page={page} />
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
