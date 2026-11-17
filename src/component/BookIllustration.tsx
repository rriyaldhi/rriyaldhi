import type { BookPage } from "./books";

interface BookIllustrationProps
{
  page: BookPage;
  decorative?: boolean;
}

export default function BookIllustration({ page, decorative = false }: BookIllustrationProps)
{
  return <span className="book-illustration">
    <img
      src={page.image}
      alt={decorative ? "" : page.alt}
      loading={decorative ? "lazy" : "eager"}
    />
  </span>;
}
