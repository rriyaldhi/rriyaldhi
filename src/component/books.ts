export interface BookPage
{
  title: string;
  text: string;
  image: string;
  alt: string;
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

export const books: readonly Book[] = [{
  id: "sapiens",
  title: "Sapiens",
  subtitle: "A Brief History of Humankind",
  author: "Yuval Noah Harari",
  pages: [
    {
      image: new URL("../resource/image/books/sapiens-agriculture.jpg", import.meta.url).href,
      alt: "A weary farmer tills the ground beside a full granary and a growing village.",
      title: "The cost of agriculture",
      text: "Agriculture let humans produce more food and support larger populations, but Harari argues that it made daily life harder for many individuals.",
    },
    {
      image: new URL("../resource/image/books/sapiens-shared-stories.jpg", import.meta.url).href,
      alt: "Three people lift a stone arch together beneath a shared speech bubble with a flag.",
      title: "Shared stories",
      text: "Shared stories let strangers cooperate. Harari argues that collective belief in things like nations and corporations makes cooperation possible on a vast scale.",
      source: {
        label: "Harari on power and imagination",
        url: "https://www.ynharari.com/topic/power-and-imagination/",
      },
    },
    {
      image: new URL("../resource/image/books/sapiens-power-and-happiness.jpg", import.meta.url).href,
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
      image: new URL("../resource/image/books/climate-net-zero.jpg", import.meta.url).href,
      alt: "A hand turns a shutoff valve on a pipe releasing smoke toward the Earth.",
      title: "Why net zero?",
      text: "Gates uses a 2021 estimate of roughly 51 billion tons of greenhouse gas emissions per year to illustrate the scale of the challenge. Cutting emissions slows the buildup. To stop adding to the problem, he argues, any emissions that remain must be balanced by removals.",
      source: {
        label: "Gates on the case for zero",
        url: "https://ideas.ted.com/5-questions-to-ask-about-any-climate-change-solution-from-bill-gates/",
      },
    },
    {
      image: new URL("../resource/image/books/climate-clean-power.jpg", import.meta.url).href,
      alt: "A factory, power pylon, cow, truck, and house with a heat pump share a landscape.",
      title: "Beyond clean power",
      text: "Gates looks at five areas: making things, generating electricity, growing food, getting around, and heating and cooling. Clean electricity can replace fossil fuels in many uses. Sources such as emissions from making cement and methane from cattle need solutions of their own.",
      source: {
        label: "Gates on the five sources of emissions",
        url: "https://www.gatesnotes.com/meet-bill/accelerate-climate-innovation/reader/my-plan-for-fighting-climate-change",
      },
    },
    {
      image: new URL("../resource/image/books/climate-green-premium.jpg", import.meta.url).href,
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
      image: new URL("../resource/image/books/dog-world.jpg", import.meta.url).href,
      alt: "A dog lifts its nose toward a shirt draped over a human bed beside an unused dog cushion.",
      title: "A dog’s world",
      text: "Horowitz starts with the dog’s umwelt, the world as the dog senses and experiences it. To us, a human bed and a dog bed have separate purposes. To a dog, the human bed can be the place that smells most like the people it lives with.",
      source: {
        label: "Horowitz on a dog’s umwelt",
        url: "https://www.simonandschuster.com/books/Inside-of-a-Dog/Alexandra-Horowitz/9781416583431",
      },
    },
    {
      image: new URL("../resource/image/books/dog-smell.jpg", import.meta.url).href,
      alt: "A dog sniffs a park path where dotted scent trails lead toward a distant walker and dog.",
      title: "Smelling the past",
      text: "A path can look empty to us and still hold traces of the animals that passed through it. Horowitz uses lingering smells to explain how a dog’s nose can pick up information about what happened before it arrived.",
      source: {
        label: "Horowitz on how dogs experience scent",
        url: "https://www.ted.com/podcasts/how-to-experience-the-world-like-a-good-dog-w-alexandra-horowitz-transcript",
      },
    },
    {
      image: new URL("../resource/image/books/dog-guilty-look.jpg", import.meta.url).href,
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
