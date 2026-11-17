interface BookIllustrationProps
{
  image: string;
  alt: string;
  loading?: "lazy" | "eager";
}

export default function BookIllustration({ image, alt, loading = "eager" }: BookIllustrationProps)
{
  return <span className="book-illustration">
    <img
      src={image}
      alt={alt}
      loading={loading}
    />
  </span>;
}
