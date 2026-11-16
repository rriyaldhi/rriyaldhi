export interface BookPage
{
  title: string;
  text: string;
  image: string;
  alt: string;
  crop?: { width: number; height: number; offset: number; mask?: string };
  source?: { label: string; url: string };
}

export interface Book
{
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  pages: readonly [BookPage, ...BookPage[]];
}

const illustrations = new URL("../resource/image/sapiens.png", import.meta.url).href;
const climateIllustrations = new URL("../resource/image/climate-disaster.png", import.meta.url).href;
const dogIllustrations = new URL("../resource/image/inside-of-a-dog.png", import.meta.url).href;

export const books: readonly Book[] = [{
  id: "sapiens",
  title: "Sapiens",
  subtitle: "A Brief History of Humankind",
  author: "Yuval Noah Harari",
  pages: [
    {
      image: illustrations,
      crop: {
        width: 716, height: 724, offset: 0,
        mask: "polygon(0 0, 100% 0, 100% 75%, 95% 95%, 95% 100%, 0 100%)",
      },
      alt: "A weary farmer tills the ground beside a full granary and a growing village.",
      title: "The cost of agriculture",
      text: "Agriculture let humans produce more food and support larger populations, but Harari argues that it made daily life harder for many individuals.",
    },
    {
      image: illustrations,
      crop: {
        width: 820, height: 724, offset: 680,
        mask: "polygon(4.4% 0, 100% 0, 100% 100%, 0 100%, 0 95%, 4.4% 75%)",
      },
      alt: "Three people lift a stone arch together beneath a shared speech bubble with a flag.",
      title: "Shared stories",
      text: "Shared stories let strangers cooperate. Harari argues that collective belief in things like nations and corporations makes cooperation possible on a vast scale.",
      source: {
        label: "Harari on power and imagination",
        url: "https://www.ynharari.com/topic/power-and-imagination/",
      },
    },
    {
      image: illustrations,
      crop: {
        width: 662, height: 724, offset: 1510,
      },
      alt: "A pensive person holds a globe as satellites orbit it.",
      title: "Power and happiness",
      text: "More power doesn’t guarantee more happiness. Harari asks whether humanity’s growing control over the world has made people any happier.",
      source: {
        label: "Harari’s overview of Sapiens",
        url: "https://www.ynharari.com/book/sapiens/",
      },
    },
  ],
}, {
  id: "how-to-avoid-a-climate-disaster",
  title: "How to Avoid a Climate Disaster",
  subtitle: "The Solutions We Have and the Breakthroughs We Need",
  author: "Bill Gates",
  pages: [
    {
      image: climateIllustrations,
      crop: { width: 724, height: 724, offset: 0 },
      alt: "A hand turns a shutoff valve on a pipe releasing smoke toward the Earth.",
      title: "Why net zero?",
      text: "Gates uses a 2021 estimate of roughly 51 billion tons of greenhouse gas emissions per year to illustrate the scale of the challenge. Cutting emissions slows the buildup. To stop adding to the problem, he argues, any emissions that remain must be balanced by removals.",
      source: {
        label: "Gates on the case for zero",
        url: "https://ideas.ted.com/5-questions-to-ask-about-any-climate-change-solution-from-bill-gates/",
      },
    },
    {
      image: climateIllustrations,
      crop: { width: 724, height: 724, offset: 724 },
      alt: "A factory, power pylon, cow, truck, and house with a heat pump share a landscape.",
      title: "Beyond clean power",
      text: "Gates looks at five areas: making things, generating electricity, growing food, getting around, and heating and cooling. Clean electricity can replace fossil fuels in many uses. Sources such as emissions from making cement and methane from cattle need solutions of their own.",
      source: {
        label: "Gates on the five sources of emissions",
        url: "https://www.gatesnotes.com/meet-bill/accelerate-climate-innovation/reader/my-plan-for-fighting-climate-change",
      },
    },
    {
      image: climateIllustrations,
      crop: { width: 724, height: 724, offset: 1448 },
      alt: "A balance scale compares a conventional cement block with a leaf-marked block beside a stack of coins.",
      title: "The Green Premium",
      text: "Gates calls the extra cost of a cleaner alternative its Green Premium. He argues for scaling up tools that already work, such as wind and solar, and investing in breakthroughs where cleaner options are still too expensive or unavailable.",
      source: {
        label: "Gates on Green Premiums",
        url: "https://www.gatesnotes.com/lowering-green-premiums",
      },
    },
  ],
}, {
  id: "inside-of-a-dog",
  title: "Inside of a Dog",
  subtitle: "What Dogs See, Smell, and Know",
  author: "Alexandra Horowitz",
  pages: [
    {
      image: dogIllustrations,
      crop: { width: 724, height: 724, offset: 0 },
      alt: "A dog lifts its nose toward a shirt draped over a human bed beside an unused dog cushion.",
      title: "A dog’s world",
      text: "Horowitz starts with the dog’s umwelt, the world as the dog senses and experiences it. To us, a human bed and a dog bed have separate purposes. To a dog, the human bed can be the place that smells most like the people it lives with.",
      source: {
        label: "Horowitz on a dog’s umwelt",
        url: "https://www.simonandschuster.com/books/Inside-of-a-Dog/Alexandra-Horowitz/9781416583431",
      },
    },
    {
      image: dogIllustrations,
      crop: { width: 724, height: 724, offset: 724 },
      alt: "A dog sniffs a park path where dotted scent trails lead toward a distant walker and dog.",
      title: "Smelling the past",
      text: "A path can look empty to us and still hold traces of the animals that passed through it. Horowitz uses lingering smells to explain how a dog’s nose can pick up information about what happened before it arrived.",
      source: {
        label: "Horowitz on how dogs experience scent",
        url: "https://www.ted.com/podcasts/how-to-experience-the-world-like-a-good-dog-w-alexandra-horowitz-transcript",
      },
    },
    {
      image: dogIllustrations,
      crop: { width: 724, height: 724, offset: 1448 },
      alt: "A dog lowers its head beside an untouched biscuit as a person points toward it.",
      title: "The “guilty” look",
      text: "Horowitz sometimes took the treat away herself and told the owner the dog had eaten it. The owner scolded the dog, and the dog could lower its head and look away. A dog can look guilty simply because it’s being scolded.",
      source: {
        label: "Horowitz’s study of the “guilty look”",
        url: "https://pubmed.ncbi.nlm.nih.gov/19520245/",
      },
    },
  ],
}];
