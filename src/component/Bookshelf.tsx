import * as React from "react";
import BookCover from "./BookCover";
import BookReader from "./BookReader";
import { books } from "./books";
import type { Book } from "./books";
import "./Bookshelf.sass";

export default function Bookshelf({ active }: { active: boolean })
{
  const [selection, setSelection] = React.useState<{ book: Book; cover: HTMLButtonElement } | null>(null);
  const [lastPages, setLastPages] = React.useState<Record<string, number>>({});
  const activeBook = selection?.book;

  function closeBook(page: number)
  {
    setLastPages((previous) => ({ ...previous, [activeBook.id]: page }));
    setSelection(null);
  }

  return <section className="bookshelf" aria-labelledby="books-heading">
    <h2 id="books-heading">Books</h2>
    <ul className="bookshelf-grid">
      {books.map((book) => <li key={book.id}>
        <button
          type="button"
          className="book-card"
          data-selected={activeBook?.id === book.id || undefined}
          data-long-title={book.title.length > 12 || undefined}
          aria-label={`Read ${book.title}`}
          aria-describedby={`book-author-${book.id}`}
          aria-haspopup="dialog"
          onClick={(event) => {
            event.currentTarget.focus();
            setSelection({
              book,
              cover: event.currentTarget,
            });
          }}
        >
          <BookCover book={book} authorId={`book-author-${book.id}`} />
        </button>
      </li>)}
    </ul>
    {activeBook && <BookReader
      key={activeBook.id}
      book={activeBook}
      cover={selection.cover}
      active={active}
      startPage={lastPages[activeBook.id] ?? 0}
      onClose={closeBook}
    />}
  </section>;
}
