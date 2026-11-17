import * as React from "react";
import BookIllustration from "./BookIllustration";
import type { Book } from "./books";

export default function BookCover({ book, authorId, decorative = false }: {
  book: Book;
  authorId?: string;
  decorative?: boolean;
})
{
  return <>
    <span className="book-card-heading">
      <span className="book-card-title">{book.title}</span>
      {book.subtitle && <span className="book-card-subtitle">{book.subtitle}</span>}
    </span>
    <BookIllustration image={book.coverImage} alt="" loading={decorative ? "eager" : "lazy"} />
    <span className="book-card-author" id={authorId}>{book.author}</span>
    {!decorative && <span className="book-card-arrow" aria-hidden="true">↗</span>}
  </>;
}
