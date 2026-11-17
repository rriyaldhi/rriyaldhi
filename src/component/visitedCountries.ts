export interface VisitedCountry
{
  code: string;
  name: string;
  marker: readonly [longitude: number, latitude: number];
  places: readonly {
    name: string;
    location: string;
    image: string;
    alt: string;
  }[];
}

export const visitedCountries: readonly VisitedCountry[] = [{
  code: "CHN",
  name: "China",
  marker: [108, 33],
  places: [
    {
      name: "Terracotta Army",
      location: "Xi’an, Shaanxi",
      image: new URL("../resource/image/travel/terracotta.jpg", import.meta.url).href,
      alt: "Black-and-white engraving of terracotta warriors standing in rows in the excavation.",
    },
    {
      name: "Great Wall of China",
      location: "Northern China",
      image: new URL("../resource/image/travel/wall.jpg", import.meta.url).href,
      alt: "Black-and-white engraving of Great Wall watchtowers winding over mountain ridges.",
    },
  ],
}];
