import * as React from "react";
import BookIllustration from "./BookIllustration";
import BookReader from "./BookReader";
import { books } from "./books";
import type { Book } from "./books";
import "./Bookshelf.sass";

export default function Bookshelf()
{
  const [activeBook, setActiveBook] = React.useState<Book | null>(null);
  const [lastPages, setLastPages] = React.useState<Record<string, number>>({});

  function closeBook(page: number)
  {
    setLastPages((previous) => ({ ...previous, [activeBook.id]: page }));
    setActiveBook(null);
  }

  return <section className="bookshelf" aria-labelledby="books-heading">
    <h2 id="books-heading">Books</h2>
    <ul className="bookshelf-grid">
      {books.map((book) => <li key={book.id}>
        <button
          type="button"
          className="book-card"
          data-long-title={book.title.length > 12 || undefined}
          aria-label={`Read ${book.title}`}
          aria-describedby={`book-author-${book.id}`}
          aria-haspopup="dialog"
          onClick={(event) => {
            event.currentTarget.focus();
            setActiveBook(book);
          }}
        >
          <span className="book-card-heading">
            <span className="book-card-title">{book.title}</span>
            {book.subtitle && <span className="book-card-subtitle">{book.subtitle}</span>}
          </span>
          <BookIllustration image={book.coverImage} alt="" loading="lazy" />
          <span className="book-card-author" id={`book-author-${book.id}`}>{book.author}</span>
          <span className="book-card-arrow" aria-hidden="true">↗</span>
        </button>
      </li>)}
    </ul>
    {activeBook && <BookReader
      key={activeBook.id}
      book={activeBook}
      startPage={lastPages[activeBook.id] ?? 0}
      onClose={closeBook}
    />}
  </section>;
}
