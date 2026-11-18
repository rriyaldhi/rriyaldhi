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
},
{
  code: "IDN",
  name: "Indonesia",
  marker: [118, -2],
  places: [
    {
      name: "Borobudur",
      location: "Central Java",
      image: new URL("../resource/image/travel/borobudur.jpg", import.meta.url).href,
      alt: "Black-and-white engraving of borobudur’s stone stupas and terraces.",
    },
    {
      name: "Prambanan",
      location: "Yogyakarta",
      image: new URL("../resource/image/travel/prambanan.jpg", import.meta.url).href,
      alt: "Black-and-white engraving of the tall stone temples of Prambanan.",
    },
  ],
},
{
  code: "SGP",
  name: "Singapore",
  marker: [103.82, 1.35],
  places: [
    {
      name: "Buddha Tooth Relic Temple",
      location: "Chinatown",
      image: new URL("../resource/image/travel/buddha-tooth-relic.jpg", import.meta.url).href,
      alt: "Black-and-white engraving of the facade and layered roofs of the Buddha Tooth Relic Temple.",
    },
  ],
},
{
  code: "DEU",
  name: "Germany",
  marker: [10.45, 51.16],
  places: [
    {
      name: "Berlin Wall",
      location: "Berlin",
      image: new URL("../resource/image/travel/berlin-wall.jpg", import.meta.url).href,
      alt: "Black-and-white engraving of a preserved section of the Berlin Wall.",
    },
    {
      name: "Brandenburg Gate",
      location: "Berlin",
      image: new URL("../resource/image/travel/brandenburg-gate.jpg", import.meta.url).href,
      alt: "Black-and-white engraving of the columns and Quadriga of the Brandenburg Gate.",
    },
  ],
},
{
  code: "AUS",
  name: "Australia",
  marker: [134, -25],
  places: [
    {
      name: "Sydney Opera House",
      location: "Sydney, New South Wales",
      image: new URL("../resource/image/travel/sydney-opera-house.jpg", import.meta.url).href,
      alt: "Black-and-white engraving of the sail-shaped roofs of the Sydney Opera House beside the harbour.",
    },
  ],
},
{
  code: "ITA",
  name: "Italy",
  marker: [12.57, 42.5],
  places: [
    {
      name: "Colosseum",
      location: "Rome",
      image: new URL("../resource/image/travel/colosseum.jpg", import.meta.url).href,
      alt: "Black-and-white engraving of the arched exterior of the Colosseum.",
    },
    {
      name: "Leaning Tower of Pisa",
      location: "Pisa",
      image: new URL("../resource/image/travel/pisa.jpg", import.meta.url).href,
      alt: "Black-and-white engraving of the Leaning Tower of Pisa beside the cathedral.",
    },
    {
      name: "Venice",
      location: "Veneto",
      image: new URL("../resource/image/travel/venice.jpg", import.meta.url).href,
      alt: "Black-and-white engraving of canals and historic buildings in Venice.",
    },
  ],
},
{
  code: "MCO",
  name: "Monaco",
  marker: [7.42, 43.74],
  places: [
    {
      name: "Monte Carlo Casino",
      location: "Monte Carlo",
      image: new URL("../resource/image/travel/monte-carlo-casino.jpg", import.meta.url).href,
      alt: "Black-and-white engraving of the ornate facade of the Monte Carlo Casino.",
    },
  ],
},
{
  code: "VAT",
  name: "Vatican City",
  marker: [12.45, 41.9],
  places: [
    {
      name: "St. Peter’s Basilica",
      location: "Vatican City",
      image: new URL("../resource/image/travel/st-peters-basilica.jpg", import.meta.url).href,
      alt: "Black-and-white engraving of the dome and facade of St. Peter’s Basilica.",
    },
  ],
},
{
  code: "AND",
  name: "Andorra",
  marker: [1.52, 42.51],
  places: [
    {
      name: "Andorra la Vella",
      location: "Andorra",
      image: new URL("../resource/image/travel/andorra-la-vella.jpg", import.meta.url).href,
      alt: "Black-and-white engraving of andorra la Vella surrounded by the Pyrenees.",
    },
  ],
},
{
  code: "ESP",
  name: "Spain",
  marker: [-3.75, 40.46],
  places: [
    {
      name: "Sagrada Família",
      location: "Barcelona",
      image: new URL("../resource/image/travel/sagrada-familia.jpg", import.meta.url).href,
      alt: "Black-and-white engraving of the towers and detailed facade of the Sagrada Família.",
    },
  ],
}];
