import type { BookPage } from "./books";

interface BookIllustrationProps
{
  page: BookPage;
  decorative?: boolean;
}

export default function BookIllustration({ page, decorative = false }: BookIllustrationProps)
{
  const { crop } = page;
  const image = <img
    src={page.image}
    alt={decorative ? "" : page.alt}
    loading="lazy"
    style={crop && { left: `${-100 * crop.offset / crop.width}%` }}
  />;

  return <span className="book-illustration">
    {crop ? <span
      className="book-crop"
      style={{ aspectRatio: `${crop.width} / ${crop.height}`, clipPath: crop.mask }}
    >
      {image}
    </span> : image}
  </span>;
}
