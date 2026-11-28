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
  coverImage: string;
  pages: readonly [BookPage, ...BookPage[]];
}

export const books: readonly Book[] = [{
  id: "sapiens",
  title: "Sapiens",
  subtitle: "A Brief History of Humankind",
  author: "Yuval Noah Harari",
  coverImage: new URL("../resource/image/books/sapiens-cover.jpg", import.meta.url).href,
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
    {
      image: new URL("../resource/image/books/sapiens-ignorance.jpg", import.meta.url).href,
      alt: "A cartographer studies an unfinished coastline.",
      title: "The blank on the map",
      text: "Harari sees an admission of ignorance at the heart of the scientific revolution. A blank stretch of coastline makes an unanswered question visible. A sailor can set out to chart it, and the map can change with what she finds.",
      source: {
        label: "Harari’s notes on the scientific revolution",
        url: "https://www.ynharari.com/sapiens-references/",
      },
    },
    {
      image: new URL("../resource/image/books/sapiens-credit.jpg", import.meta.url).href,
      alt: "A baker borrows coins to build an oven.",
      title: "Borrowing from tomorrow",
      text: "A baker needs an oven before she can sell her first loaf. Credit lets her borrow against sales she hopes to make. Harari argues that growing confidence in future production helped societies finance ventures they could never pay for out of yesterday’s earnings.",
      source: {
        label: "Harari’s notes on capitalism",
        url: "https://www.ynharari.com/sapiens-references/",
      },
    },
  ],
}, {
  id: "how-to-avoid-a-climate-disaster",
  title: "How to Avoid a Climate Disaster",
  subtitle: "The Solutions We Have and the Breakthroughs We Need",
  author: "Bill Gates",
  coverImage: new URL("../resource/image/books/climate-cover.jpg", import.meta.url).href,
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
    {
      image: new URL("../resource/image/books/climate-adaptation.jpg", import.meta.url).href,
      alt: "A grower tends seedlings beside a water tank.",
      title: "Living with the heat",
      text: "A farmer must decide when to sow this season even as the world works to cut emissions. Gates argues for investing in adaptation alongside prevention. Better local forecasts and crops suited to dry spells give farmers more ways to protect a harvest.",
      source: {
        label: "Gates on helping farmers adapt",
        url: "https://www.gatesnotes.com/work/make-ai-work-for-everyone/reader/fighting-climate-change-one-text-at-a-time",
      },
    },
  ],
}, {
  id: "inside-of-a-dog",
  title: "Inside of a Dog",
  subtitle: "What Dogs See, Smell, and Know",
  author: "Alexandra Horowitz",
  coverImage: new URL("../resource/image/books/dog-cover.jpg", import.meta.url).href,
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
    {
      image: new URL("../resource/image/books/dog-play.jpg", import.meta.url).href,
      alt: "A dog bows with its tail high in front of another dog.",
      title: "An invitation to play",
      text: "A dog dips its chest and keeps its rump high. Who is watching? Horowitz found that dogs usually offered visual play signals when their playmate was looking. When a partner faced away, dogs were more likely to get its attention first.",
      source: {
        label: "Horowitz’s study of dogs at play",
        url: "https://pubmed.ncbi.nlm.nih.gov/18679727/",
      },
    },
  ],
}, {
  id: "homo-deus",
  title: "Homo Deus",
  subtitle: "A History of Tomorrow",
  author: "Yuval Noah Harari",
  coverImage: new URL("../resource/image/books/homo-deus-cover.jpg", import.meta.url).href,
  pages: [
    {
      image: new URL("../resource/image/books/homo-deus-redesign.jpg", import.meta.url).href,
      alt: "A person faces a mirror reflecting a technologically enhanced version of themselves.",
      title: "Redesigning humanity",
      text: "Harari explores what could happen if humans use biotechnology and artificial intelligence to reshape their own abilities. These are possible futures to question, rather than predictions of what must happen.",
      source: {
        label: "Harari on Homo Deus",
        url: "https://www.ynharari.com/book/homo-deus/",
      },
    },
    {
      image: new URL("../resource/image/books/homo-deus-inequality.jpg", import.meta.url).href,
      alt: "Two people stand at unequal heights, with enhancement technology available to only one.",
      title: "Who gets upgraded?",
      text: "If new technologies extend human abilities, who will be able to afford them? Harari asks whether biological advantages could deepen the divide between a powerful elite and everyone else.",
      source: {
        label: "Harari on possible human futures",
        url: "https://time.com/4672373/yuval-noah-harari-homo-deus-interview/",
      },
    },
    {
      image: new URL("../resource/image/books/homo-deus-algorithms.jpg", import.meta.url).href,
      alt: "A person at a crossroads follows a device connected to a web of data.",
      title: "Authority and algorithms",
      text: "Harari asks what happens when algorithms know our habits better than we do. If we increasingly rely on their recommendations, the power to shape decisions may shift toward those who control the data.",
      source: {
        label: "Harari on data and power",
        url: "https://time.com/4672373/yuval-noah-harari-homo-deus-interview/",
      },
    },
    {
      image: new URL("../resource/image/books/homo-deus-humanism.jpg", import.meta.url).href,
      alt: "A visitor considers an abstract painting.",
      title: "Who decides what is beautiful?",
      text: "Two visitors can stand before the same painting and disagree about its worth. Harari uses aesthetic judgment to illustrate humanism, a worldview that gives human experience the authority to determine meaning. In that view, asking each visitor what they felt is a way to answer the question.",
      source: {
        label: "Harari on Homo Deus",
        url: "https://www.ynharari.com/book/homo-deus/",
      },
    },
  ],
}, {
  id: "inspired",
  title: "Inspired",
  subtitle: "How to Create Tech Products Customers Love",
  author: "Marty Cagan",
  coverImage: new URL("../resource/image/books/inspired-cover.jpg", import.meta.url).href,
  pages: [
    {
      image: new URL("../resource/image/books/inspired-discovery.jpg", import.meta.url).href,
      alt: "A customer tests a small prototype while a designer observes.",
      title: "Discover before building",
      text: "Cagan separates learning what to build from delivering it reliably. Testing a small prototype with customers can expose a weak idea before the team invests in a full product.",
      source: {
        label: "Cagan on product discovery",
        url: "https://www.svpg.com/product-discovery/",
      },
    },
    {
      image: new URL("../resource/image/books/inspired-risks.jpg", import.meta.url).href,
      alt: "A bridge rests on four pillars, representing the four risks a product team must address.",
      title: "Four risks to test",
      text: "Will people choose it? Can they use it? Can we build it? Does it work for the business? Cagan calls these value, usability, feasibility, and viability risks; a promising idea needs answers to all four.",
      source: {
        label: "Cagan on the four big risks",
        url: "https://www.svpg.com/four-big-risks/",
      },
    },
    {
      image: new URL("../resource/image/books/inspired-team.jpg", import.meta.url).href,
      alt: "Three teammates combine customer insights, interface sketches, and engineering knowledge.",
      title: "Discover together",
      text: "Product managers, designers, and engineers bring different kinds of judgment to discovery. Cagan argues for working together early so customer needs, usability, technical limits, and business constraints shape the solution.",
      source: {
        label: "Cagan on discovery judgment",
        url: "https://www.svpg.com/discovery-judgement/",
      },
    },
    {
      image: new URL("../resource/image/books/inspired-outcomes.jpg", import.meta.url).href,
      alt: "A designer watches a traveler use a ticket machine.",
      title: "Give the team a problem",
      text: "A team asked to help commuters buy tickets faster can change the screen, the payment flow, or both. Cagan argues that giving a team a problem also gives it a meaningful test of success. After release, can people actually buy their tickets faster?",
      source: {
        label: "Cagan on outcomes and product teams",
        url: "https://www.svpg.com/pledge-to-executives/",
      },
    },
  ],
}, {
  id: "the-culture-map",
  title: "The Culture Map",
  subtitle: "Breaking Through the Invisible Boundaries of Global Business",
  author: "Erin Meyer",
  coverImage: new URL("../resource/image/books/the-culture-map-cover.jpg", import.meta.url).href,
  pages: [
    {
      image: new URL("../resource/image/books/the-culture-map-context.jpg", import.meta.url).href,
      alt: "Two colleagues communicate using explicit detail and shared context.",
      title: "Reading the context",
      text: "Meyer describes communication that spells things out and communication that relies more on shared context. A message that seems clear to one colleague may leave another guessing; checking understanding helps bridge the gap.",
      source: {
        label: "Meyer on the cultural scales",
        url: "https://erinmeyer.com/corporate-mapping-tool-report/",
      },
    },
    {
      image: new URL("../resource/image/books/the-culture-map-feedback.jpg", import.meta.url).href,
      alt: "Two people use different approaches to discussing the same flaw in a clay pot.",
      title: "Feedback has its own scale",
      text: "Direct communication and direct criticism are different things. Meyer shows why someone can speak explicitly about a task yet soften negative feedback. Understanding both habits helps teams interpret what is actually being said.",
      source: {
        label: "Meyer on the cultural scales",
        url: "https://erinmeyer.com/corporate-mapping-tool-report/",
      },
    },
    {
      image: new URL("../resource/image/books/the-culture-map-trust.jpg", import.meta.url).href,
      alt: "Paths through reliable work and personal connection meet at a handshake.",
      title: "Different routes to trust",
      text: "Some colleagues build trust through reliable work; others place more weight on personal connection. Meyer’s scales offer starting points for conversation, while leaving room for individuals to differ from cultural patterns.",
      source: {
        label: "Meyer on the cultural scales",
        url: "https://erinmeyer.com/corporate-mapping-tool-report/",
      },
    },
    {
      image: new URL("../resource/image/books/culture-decisions.jpg", import.meta.url).href,
      alt: "Colleagues place pebbles in a shared dish around a meeting table.",
      title: "Who makes the call?",
      text: "A manager can hold the most senior title and still wait for everyone to agree. Meyer treats rank and decision-making as separate questions. Before a meeting, it helps to say whether the group will decide together or advise the person who will decide.",
      source: {
        label: "Meyer on leading and deciding",
        url: "https://erinmeyer.com/corporate-mapping-tool-report/",
      },
    },
    {
      image: new URL("../resource/image/books/culture-persuasion.jpg", import.meta.url).href,
      alt: "A teacher demonstrates an arch with a bridge model and a drawing.",
      title: "Where an argument begins",
      text: "Imagine proposing a new bridge. One audience wants to see a bridge like it that already works. Another wants to understand the engineering principle first. Meyer suggests adjusting the order of the argument to how listeners prefer to reason.",
      source: {
        label: "Meyer on persuasion",
        url: "https://erinmeyer.com/corporate-mapping-tool-report/",
      },
    },
    {
      image: new URL("../resource/image/books/culture-disagreement.jpg", import.meta.url).href,
      alt: "Colleagues debate while a teammate listens.",
      title: "What an objection means",
      text: "One colleague challenges a proposal in front of the team, expecting the debate to sharpen it. Another hears a public rebuke. Meyer suggests finding out how colleagues prefer to raise objections. An invitation to comment privately can surface a concern the meeting missed.",
      source: {
        label: "Meyer on disagreement",
        url: "https://erinmeyer.com/corporate-mapping-tool-report/",
      },
    },
  ],
}, {
  id: "deep-work",
  title: "Deep Work",
  subtitle: "Rules for Focused Success in a Distracted World",
  author: "Cal Newport",
  coverImage: new URL("../resource/image/books/deep-work-cover.jpg", import.meta.url).href,
  pages: [
    {
      image: new URL("../resource/image/books/deep-work-focus.jpg", import.meta.url).href,
      alt: "A writer works at a quiet desk while distractions remain outside a closed door.",
      title: "Protect time for depth",
      text: "Newport argues that demanding work needs stretches of undistracted concentration. A regular time, a clear task, and a simple starting ritual make focus easier to practice than waiting for the right mood.",
      source: {
        label: "Newport’s guide to Deep Work",
        url: "https://calnewport.com/the-book-facebook-doesnt-want-you-to-read/",
      },
    },
    {
      image: new URL("../resource/image/books/deep-work-boredom.jpg", import.meta.url).href,
      alt: "A person sits quietly on a bench with their phone put away.",
      title: "Practice being bored",
      text: "Concentration is a skill to train. Newport suggests resisting the urge to fill every quiet moment with a screen, so attention becomes less dependent on a constant supply of novelty.",
      source: {
        label: "Newport’s guide to Deep Work",
        url: "https://calnewport.com/the-book-facebook-doesnt-want-you-to-read/",
      },
    },
    {
      image: new URL("../resource/image/books/deep-work-shallows.jpg", import.meta.url).href,
      alt: "Hands clear a desk to make space for one important task.",
      title: "Make room for what matters",
      text: "Email, small requests, and digital tools can fill the day without advancing its most important work. Newport recommends limiting shallow obligations and choosing tools by how much they support the things that matter.",
      source: {
        label: "Newport’s guide to Deep Work",
        url: "https://calnewport.com/the-book-facebook-doesnt-want-you-to-read/",
      },
    },
    {
      image: new URL("../resource/image/books/deep-work-shutdown.jpg", import.meta.url).href,
      alt: "A worker closes a notebook at dusk.",
      title: "Give work an ending",
      text: "An unanswered email can follow you home in your head. Newport ends his day by gathering loose tasks, checking upcoming commitments, and deciding when to pick them up. A written place to resume makes it easier to close the laptop for the evening.",
      source: {
        label: "Newport’s shutdown ritual",
        url: "https://calnewport.com/drastically-reduce-stress-with-a-work-shutdown-ritual/",
      },
    },
    {
      image: new URL("../resource/image/books/deep-work-tools.jpg", import.meta.url).href,
      alt: "A craftsperson selects a tool at a workbench.",
      title: "Practice at the edge of your skill",
      text: "A woodworker learning a joint can cut it, test its fit, and see exactly where the next cut needs adjusting. Newport connects deep work to deliberate practice. Focusing on a demanding skill and getting feedback gives the next hour of practice a specific purpose.",
      source: {
        label: "Newport on Deep Work",
        url: "https://calnewport.com/the-book-facebook-doesnt-want-you-to-read/",
      },
    },
  ],
}, {
  id: "zen",
  title: "Zen",
  subtitle: "The Art of Simple Living",
  author: "Shunmyo Masuno",
  coverImage: new URL("../resource/image/books/zen-cover.jpg", import.meta.url).href,
  pages: [
    {
      image: new URL("../resource/image/books/zen-rituals.jpg", import.meta.url).href,
      alt: "A person carefully lines up a pair of shoes at a doorway.",
      title: "Begin with small rituals",
      text: "Masuno brings Zen into ordinary routines. Lining up your shoes after taking them off becomes a small act of care: a way to give everyday life a little more order and attention.",
      source: {
        label: "Masuno’s guide to simple living",
        url: "https://www.penguin.co.uk/books/311881/zen-the-art-of-simple-living-by-masuno-shunmyo/9780241371831",
      },
    },
    {
      image: new URL("../resource/image/books/zen-present.jpg", import.meta.url).href,
      alt: "A person pauses during a meal to watch the sunset.",
      title: "Notice what is here",
      text: "Simple moments deserve attention too. Masuno suggests practices such as pausing between bites and watching the sunset, inviting us to appreciate daily life without waiting for an extraordinary experience.",
      source: {
        label: "Masuno’s guide to simple living",
        url: "https://www.penguin.co.uk/books/311881/zen-the-art-of-simple-living-by-masuno-shunmyo/9780241371831",
      },
    },
    {
      image: new URL("../resource/image/books/zen-change.jpg", import.meta.url).href,
      alt: "A person tends a flower with a new bud and a fallen petal.",
      title: "Let change teach you",
      text: "Planting a flower and watching it grow offers a daily encounter with change. Masuno uses such modest practices to bring attention back to the living world and the moment we can actually experience.",
      source: {
        label: "Masuno’s guide to simple living",
        url: "https://www.penguin.co.uk/books/311881/zen-the-art-of-simple-living-by-masuno-shunmyo/9780241371831",
      },
    },
    {
      image: new URL("../resource/image/books/zen-space.jpg", import.meta.url).href,
      alt: "A single branch stands in a vase on a clear surface.",
      title: "Leave some space",
      text: "Clear a crowded surface and put back a single vase. The branch in it becomes easier to see, and you may discover how little the rest was doing for you. Masuno treats letting go of unnecessary possessions as a practice in simplicity.",
      source: {
        label: "Masuno’s guide to simple living",
        url: "https://www.penguin.co.uk/books/311881/zen-the-art-of-simple-living-by-masuno-shunmyo/9780241371831",
      },
    },
  ],
}, {
  id: "the-subtle-art",
  title: "The Subtle Art of Not Giving a F*ck",
  subtitle: "A Counterintuitive Approach to Living a Good Life",
  author: "Mark Manson",
  coverImage: new URL("../resource/image/books/the-subtle-art-cover.jpg", import.meta.url).href,
  pages: [
    {
      image: new URL("../resource/image/books/the-subtle-art-care.jpg", import.meta.url).href,
      alt: "A person directs their limited care toward one plant.",
      title: "Choose what deserves care",
      text: "Manson argues that attention and energy are limited. Living well means choosing what deserves them, including the people and values we are willing to stand up for even when doing so is uncomfortable.",
      source: {
        label: "Manson on choosing what matters",
        url: "https://markmanson.net/not-giving-a-fuck",
      },
    },
    {
      image: new URL("../resource/image/books/the-subtle-art-struggles.jpg", import.meta.url).href,
      alt: "A person climbs a difficult path carrying tools to tend a garden.",
      title: "Choose worthwhile struggles",
      text: "A meaningful life still contains difficulty. Manson asks us to consider which problems we are willing to work through, because caring about something usually means accepting some discomfort along with it.",
      source: {
        label: "Manson on choosing your struggles",
        url: "https://markmanson.net/question",
      },
    },
    {
      image: new URL("../resource/image/books/the-subtle-art-responsibility.jpg", import.meta.url).href,
      alt: "A person repairs storm damage they did not cause.",
      title: "Take responsibility",
      text: "We cannot choose everything that happens to us, but we still have choices about our response. Manson distinguishes being at fault for a situation from taking responsibility for what we do next.",
      source: {
        label: "Manson on responsibility and fault",
        url: "https://markmanson.net/responsibility-fault-fallacy",
      },
    },
    {
      image: new URL("../resource/image/books/subtle-values.jpg", import.meta.url).href,
      alt: "A violinist rehearses alone.",
      title: "How do you keep score?",
      text: "A musician who measures a rehearsal by applause has little to go on in an empty room. If the measure is playing a difficult passage well, the same hour can count. Manson asks whether the standards we use to judge ourselves are within our influence.",
      source: {
        label: "Manson on personal values",
        url: "https://markmanson.net/personal-values",
      },
    },
  ],
}, {
  id: "thinking-fast-and-slow",
  title: "Thinking, Fast and Slow",
  author: "Daniel Kahneman",
  coverImage: new URL("../resource/image/books/thinking-fast-and-slow-cover.jpg", import.meta.url).href,
  pages: [
    {
      image: new URL("../resource/image/books/thinking-fast-and-slow-two-modes.jpg", import.meta.url).href,
      alt: "Catching a cup and solving a puzzle illustrate automatic and deliberate thinking.",
      title: "Two modes of thought",
      text: "Kahneman describes fast, automatic thinking and slower, effortful reasoning. These are ways of describing mental activity, rather than two literal parts of the brain; both help us navigate everyday life.",
      source: {
        label: "Kahneman on Thinking, Fast and Slow",
        url: "https://us.macmillan.com/books/9780374275631/thinkingfastandslow/",
      },
    },
    {
      image: new URL("../resource/image/books/thinking-fast-and-slow-confidence.jpg", import.meta.url).href,
      alt: "A person judges an iceberg by its small visible tip.",
      title: "A confident first impression",
      text: "A quick impression can feel convincing before we have examined the evidence. Kahneman shows how mental shortcuts shape judgment, and why feeling certain is not the same as having good reasons.",
      source: {
        label: "Kahneman on Thinking, Fast and Slow",
        url: "https://us.macmillan.com/books/9780374275631/thinkingfastandslow/",
      },
    },
    {
      image: new URL("../resource/image/books/thinking-fast-and-slow-pause.jpg", import.meta.url).href,
      alt: "A traveler pauses to check a map before choosing a route.",
      title: "Pause when stakes matter",
      text: "Slower thought gives us a chance to check an intuitive answer. Kahneman explores when intuition is useful and when deliberate reasoning can help; slowing down creates room to examine a judgment, without guaranteeing it is right.",
      source: {
        label: "Kahneman on Thinking, Fast and Slow",
        url: "https://us.macmillan.com/books/9780374275631/thinkingfastandslow/",
      },
    },
    {
      image: new URL("../resource/image/books/thinking-loss.jpg", import.meta.url).href,
      alt: "Hands exchange coins across a table.",
      title: "What counts as a loss?",
      text: "Would you toss a coin to win €50 on heads and lose €50 on tails? Many people turn down that bet. Kahneman and Tversky found that people often give a loss more weight than an equal gain, measured from where they started.",
      source: {
        label: "Kahneman on loss aversion",
        url: "https://kahneman.scholar.princeton.edu/lectures",
      },
    },
    {
      image: new URL("../resource/image/books/thinking-memory.jpg", import.meta.url).href,
      alt: "A travel journal records a mountain peak beside a winding trail.",
      title: "Which hike will you remember?",
      text: "A hard climb and a beautiful finish might dominate your memory of a hike that was pleasant for hours. Kahneman describes how an intense moment and the ending can carry unusual weight when we look back and decide whether to repeat an experience.",
      source: {
        label: "Kahneman and Riis on experience and memory",
        url: "https://kahneman.scholar.princeton.edu/sites/g/files/toruqf3831/files/kahneman/files/living_dk_jr_2005.pdf",
      },
    },
    {
      image: new URL("../resource/image/books/thinking-base-rates.jpg", import.meta.url).href,
      alt: "A builder compares plans with past project files.",
      title: "The outside view",
      text: "Before estimating how long a renovation will take, ask how long similar renovations actually took. Kahneman calls this the outside view. Starting with a range of past outcomes gives you a reason to question the smooth sequence of events in your own plan.",
      source: {
        label: "Lovallo and Kahneman on forecasting",
        url: "https://faculty.econ.ucdavis.edu/faculty/nehring/teaching/econ106/readings/Lovallo-Kahneman-Optimism-HBR%20July%202003.pdf",
      },
    },
  ],
}, {
  id: "rescuing-penny-jane",
  title: "Rescuing Penny Jane",
  subtitle: "One Shelter Volunteer, Countless Dogs, and the Quest to Find Them All Homes",
  author: "Amy Sutherland",
  coverImage: new URL("../resource/image/books/rescuing-penny-jane-cover.jpg", import.meta.url).href,
  pages: [
    {
      image: new URL("../resource/image/books/rescuing-penny-jane-context.jpg", import.meta.url).href,
      alt: "The same dog stands alert in a kennel and rests comfortably in a home.",
      title: "A kennel is one context",
      text: "Sutherland describes Walter Joe behaving very differently in the shelter and at home. His story invites us to look beyond a first impression in a stressful kennel when trying to understand a dog.",
      source: {
        label: "Sutherland on shelter dogs",
        url: "https://books.google.com/books?id=RMBdEQAAQBAJ",
      },
    },
    {
      image: new URL("../resource/image/books/rescuing-penny-jane-patience.jpg", import.meta.url).href,
      alt: "A seated person gives a wary dog space to approach at its own pace.",
      title: "Patience with a fearful dog",
      text: "Penny Jane’s fear makes adoption the beginning of a long relationship. Sutherland’s account shows how living with a frightened dog can demand patience, careful attention, and expectations that change as we learn about the individual.",
      source: {
        label: "Sutherland on shelter dogs",
        url: "https://books.google.com/books?id=RMBdEQAAQBAJ",
      },
    },
    {
      image: new URL("../resource/image/books/rescuing-penny-jane-volunteers.jpg", import.meta.url).href,
      alt: "Volunteers walk a dog, prepare bedding, and welcome an adopter.",
      title: "The people behind rescue",
      text: "Finding homes takes many people doing ordinary work: walking dogs, fostering, training, and helping adopters. Sutherland follows the volunteers and shelter workers whose repeated acts of care make another chance possible.",
      source: {
        label: "Sutherland on shelter dogs",
        url: "https://books.google.com/books?id=RMBdEQAAQBAJ",
      },
    },
    {
      image: new URL("../resource/image/books/penny-match.jpg", import.meta.url).href,
      alt: "A volunteer talks with a prospective adopter beside a resting dog.",
      title: "Finding a home that fits",
      text: "Falling for a dog at the shelter is one part of adoption. Sutherland’s stories also invite a practical question. Can this household offer what this particular dog needs on an ordinary Tuesday, when someone is at work and the street outside is busy?",
      source: {
        label: "Sutherland’s account of finding homes",
        url: "https://books.google.com/books?id=RMBdEQAAQBAJ",
      },
    },
  ],
}, {
  id: "ikigai",
  title: "Ikigai",
  subtitle: "The Japanese Secret to a Long and Happy Life",
  author: "Héctor García & Francesc Miralles",
  coverImage: new URL("../resource/image/books/ikigai-cover.jpg", import.meta.url).href,
  pages: [
    {
      image: new URL("../resource/image/books/ikigai-purpose.jpg", import.meta.url).href,
      alt: "A craftsperson opens their workshop at sunrise.",
      title: "A reason to get up",
      text: "García and Miralles explore ikigai as a reason to get up in the morning. They invite readers to look patiently for the activities, relationships, and contributions that give their days a sense of meaning.",
      source: {
        label: "García and Miralles on Ikigai",
        url: "https://sites.prh.com/ikigai",
      },
    },
    {
      image: new URL("../resource/image/books/ikigai-active.jpg", import.meta.url).href,
      alt: "An older gardener tends vegetables at a steady, unhurried pace.",
      title: "Keep doing meaningful things",
      text: "The authors encourage staying involved in activities that matter, even as paid work changes or ends. A slower pace can still leave room for making, learning, moving, and participating in everyday life.",
      source: {
        label: "García and Miralles on Ikigai",
        url: "https://sites.prh.com/ikigai",
      },
    },
    {
      image: new URL("../resource/image/books/ikigai-connection.jpg", import.meta.url).href,
      alt: "Friends share tea and conversation beneath a tree.",
      title: "Make room for connection",
      text: "Friendship, time outdoors, and appreciation recur in the book’s picture of a fulfilling life. The authors draw attention to the ordinary relationships and habits that can make a day feel worth living.",
      source: {
        label: "García and Miralles on Ikigai",
        url: "https://sites.prh.com/ikigai",
      },
    },
    {
      image: new URL("../resource/image/books/ikigai-flow.jpg", import.meta.url).href,
      alt: "A potter shapes a bowl on a wheel.",
      title: "When time slips by",
      text: "A potter looks up from shaping a bowl and discovers the afternoon has gone. García and Miralles suggest taking such moments of absorption seriously. Remember the last few activities that held your attention that way and look for what they have in common.",
      source: {
        label: "García and Miralles on ikigai",
        url: "https://sites.prh.com/ikigai",
      },
    },
  ],
}, {
  id: "the-startup-of-you",
  title: "The Startup of You",
  subtitle: "Adapt to the Future, Invest in Yourself, and Transform Your Career",
  author: "Reid Hoffman & Ben Casnocha",
  coverImage: new URL("../resource/image/books/the-startup-of-you-cover.jpg", import.meta.url).href,
  pages: [
    {
      image: new URL("../resource/image/books/the-startup-of-you-invest.jpg", import.meta.url).href,
      alt: "A person develops their skills at a workbench with a notebook and tools.",
      title: "Keep investing in yourself",
      text: "Hoffman and Casnocha treat a career as something to keep developing. Building skills, learning from experience, and noticing where your strengths meet real demand can create more room to choose your next move.",
      source: {
        label: "Hoffman and Casnocha on career growth",
        url: "https://www.startupofyou.com/",
      },
    },
    {
      image: new URL("../resource/image/books/the-startup-of-you-adapt.jpg", import.meta.url).href,
      alt: "A traveler revises a route after finding a closed bridge.",
      title: "Plan to adapt",
      text: "A career plan has to survive contact with a changing world. The authors encourage taking thoughtful risks and adjusting direction as new information arrives, rather than assuming that one fixed route will remain right forever.",
      source: {
        label: "Hoffman and Casnocha on career growth",
        url: "https://www.startupofyou.com/",
      },
    },
    {
      image: new URL("../resource/image/books/the-startup-of-you-alliances.jpg", import.meta.url).href,
      alt: "People on opposite banks cooperate to build a bridge.",
      title: "Build real alliances",
      text: "Professional relationships can bring perspective, information, and opportunities. Hoffman and Casnocha emphasize genuine alliances and a varied network, built through ongoing relationships in which people help one another.",
      source: {
        label: "Hoffman and Casnocha on career growth",
        url: "https://www.startupofyou.com/",
      },
    },
    {
      image: new URL("../resource/image/books/startup-risk.jpg", import.meta.url).href,
      alt: "A climber checks a safety rope before the next foothold.",
      title: "Make a risk survivable",
      text: "Before changing careers, try a short project in the new field. It gives you evidence about the work and limits what a bad fit will cost. Hoffman and Casnocha argue that learning to take manageable risks can make a career more resilient.",
      source: {
        label: "Hoffman and Casnocha on career risk",
        url: "https://www.startupofyou.com/",
      },
    },
  ],
}, {
  id: "nobody-cares-about-your-career",
  title: "Nobody Cares About Your Career",
  subtitle: "Why Failure Is Good, the Great Ones Play Hurt, and Other Hard Truths",
  author: "Erika Ayers Badan",
  coverImage: new URL("../resource/image/books/nobody-cares-about-your-career-cover.jpg", import.meta.url).href,
  pages: [
    {
      image: new URL("../resource/image/books/nobody-cares-about-your-career-ownership.jpg", import.meta.url).href,
      alt: "A person steers a boat while signposts on shore point in different directions.",
      title: "Own your choices",
      text: "Ayers Badan argues that other people cannot decide what fulfilling work means for you. Taking ownership includes choosing a direction for your own reasons and accepting responsibility for both successes and mistakes.",
      source: {
        label: "Ayers Badan on owning your career",
        url: "https://us.macmillan.com/books/9781250320599/nobodycaresaboutyourcareer/",
      },
    },
    {
      image: new URL("../resource/image/books/nobody-cares-about-your-career-learning.jpg", import.meta.url).href,
      alt: "A person begins a new bowl after learning from one that collapsed.",
      title: "Make room to learn",
      text: "Ayers Badan describes moving into a less prestigious role where she could experiment and gain experience. Work that lets you try, fail, and improve can offer possibilities that a more impressive title does not reveal.",
      source: {
        label: "Ayers Badan on owning your career",
        url: "https://us.macmillan.com/books/9781250320599/nobodycaresaboutyourcareer/",
      },
    },
    {
      image: new URL("../resource/image/books/nobody-cares-about-your-career-environment.jpg", import.meta.url).href,
      alt: "A person joins colleagues in a collaborative workshop.",
      title: "Choose your surroundings",
      text: "The people and habits around us influence how we work. Ayers Badan urges readers to notice whether an environment offers energy, responsibility, and chances to grow, and to seek work that lets them contribute.",
      source: {
        label: "Ayers Badan on owning your career",
        url: "https://us.macmillan.com/books/9781250320599/nobodycaresaboutyourcareer/",
      },
    },
    {
      image: new URL("../resource/image/books/career-feedback.jpg", import.meta.url).href,
      alt: "Two coworkers read a marked-up draft together.",
      title: "Ask while you can still revise",
      text: "Show a colleague an early draft and ask where they lost the thread. Their answer gives you a specific revision to try before anyone depends on the finished work. Ayers Badan treats listening to feedback as a skill people can practice at every level.",
      source: {
        label: "Ayers Badan on listening to feedback",
        url: "https://leadersmag.com/issues/2024.4_Oct/PDFs/LEADERS_Badan_Food52.pdf",
      },
    },
  ],
}, {
  id: "buddhism-plain-and-simple",
  title: "Buddhism Plain & Simple",
  subtitle: "The Practice of Being Aware, Right Now, Every Day",
  author: "Steve Hagen",
  coverImage: new URL("../resource/image/books/buddhism-plain-and-simple-cover.jpg", import.meta.url).href,
  pages: [
    {
      image: new URL("../resource/image/books/buddhism-plain-and-simple-awareness.jpg", import.meta.url).href,
      alt: "A person notices light on their hands and a leaf on a windowsill.",
      title: "Wake up to this moment",
      text: "Hagen presents Buddhism as a practice of awareness. The starting point is the experience happening here and now: noticing what is actually present instead of continually looking elsewhere for something to complete it.",
      source: {
        label: "Hagen on awareness",
        url: "https://www.tuttlepublishing.com/bestsellers/buddhism-plain-and-simple-hardcover-with-jacket",
      },
    },
    {
      image: new URL("../resource/image/books/buddhism-plain-and-simple-seeing.jpg", import.meta.url).href,
      alt: "A person compares a drawing of a leaf with the leaf itself.",
      title: "Look beyond your ideas",
      text: "A description of experience is different from experiencing it directly. Hagen invites us to examine how thoughts and fixed views can stand between us and what is happening, and to look again with attention.",
      source: {
        label: "Hagen on awareness",
        url: "https://www.tuttlepublishing.com/bestsellers/buddhism-plain-and-simple-hardcover-with-jacket",
      },
    },
    {
      image: new URL("../resource/image/books/buddhism-plain-and-simple-practice.jpg", import.meta.url).href,
      alt: "A person pays attention while washing a bowl.",
      title: "Practice in ordinary life",
      text: "For Hagen, awareness is practical and immediate. Everyday experience gives us opportunities to notice the mind, how we respond, and the world around us; understanding develops through paying attention rather than simply adopting a belief.",
      source: {
        label: "Hagen on awareness",
        url: "https://www.tuttlepublishing.com/bestsellers/buddhism-plain-and-simple-hardcover-with-jacket",
      },
    },
    {
      image: new URL("../resource/image/books/buddhism-craving.jpg", import.meta.url).href,
      alt: "A hand holds a fallen leaf above a stream.",
      title: "Wanting the moment to stay",
      text: "A pleasant afternoon starts to slip away. Even while you are enjoying it, wishing it would last can bring a new uneasiness. Hagen uses craving to explain this familiar form of suffering. You can begin to see it by noticing the instant enjoyment turns into holding on.",
      source: {
        label: "Hagen’s introduction to Buddhist practice",
        url: "https://www.tuttlepublishing.com/bestsellers/buddhism-plain-and-simple-hardcover-with-jacket",
      },
    },
  ],
}, {
  id: "designing-data-intensive-applications",
  title: "Designing Data-Intensive Applications",
  author: "Martin Kleppmann",
  coverImage: new URL("../resource/image/books/designing-data-intensive-applications-cover.jpg", import.meta.url).href,
  pages: [
    {
      image: new URL("../resource/image/books/designing-data-intensive-applications-requirements.jpg", import.meta.url).href,
      alt: "An engineer compares different bridge designs against the needs of a crossing.",
      title: "Start with the requirements",
      text: "Kleppmann examines reliability, scalability, and maintainability as distinct goals. Choosing a database starts with the application’s needs and the trade-offs a team can accept, rather than a tool’s popularity.",
      source: {
        label: "Kleppmann on data systems",
        url: "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/",
      },
    },
    {
      image: new URL("../resource/image/books/designing-data-intensive-applications-replication.jpg", import.meta.url).href,
      alt: "A messenger carries an update between people maintaining separate copies of a ledger.",
      title: "Copies need coordination",
      text: "Replicating data can improve availability, but keeping copies in agreement introduces new problems. Kleppmann explores how replication delays, concurrent writes, and failures affect what an application can promise its users.",
      source: {
        label: "Kleppmann on data systems",
        url: "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/",
      },
    },
    {
      image: new URL("../resource/image/books/designing-data-intensive-applications-dataflow.jpg", import.meta.url).href,
      alt: "A branching channel routes a stream of tokens into different organized views.",
      title: "Build from a flow of changes",
      text: "A data system can combine storage and processing tools rather than ask one database to do everything. Kleppmann examines how batches, streams, and change logs let applications derive useful views from shared underlying data.",
      source: {
        label: "Kleppmann on data systems",
        url: "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/",
      },
    },
    {
      image: new URL("../resource/image/books/data-partitions.jpg", import.meta.url).href,
      alt: "One of three mail slots overflows with envelopes.",
      title: "One busy partition",
      text: "A service might divide its posts among servers by author. That works until one author draws most of the traffic. Kleppmann shows why choosing a partition key means asking which records people will read and write together, and where the load will land.",
      source: {
        label: "Kleppmann on partitioning",
        url: "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/",
      },
    },
    {
      image: new URL("../resource/image/books/data-transactions.jpg", import.meta.url).href,
      alt: "A bookkeeper records a transfer in two ledgers.",
      title: "A transfer has two halves",
      text: "Moving money between accounts takes two writes. If a crash occurs after the debit, the books can show money disappearing. A transaction with atomicity lets the database commit both changes together or discard the incomplete transfer.",
      source: {
        label: "Kleppmann on transactions",
        url: "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/",
      },
    },
    {
      image: new URL("../resource/image/books/data-schema.jpg", import.meta.url).href,
      alt: "Two clerks compare different versions of a form.",
      title: "Old readers, new records",
      text: "A service adds a delivery-instructions field to an order. During the rollout, older programs may read new orders, and newer programs still have to read yesterday’s. Kleppmann shows how rules for missing and unfamiliar fields let software and stored data evolve at different speeds.",
      source: {
        label: "Kleppmann on encoding and evolution",
        url: "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/",
      },
    },
    {
      image: new URL("../resource/image/books/data-timeout.jpg", import.meta.url).href,
      alt: "A postal worker checks a watch by a mailbox.",
      title: "What a timeout tells you",
      text: "You submit an order and the confirmation never arrives. The server might have stopped before saving it, or saved it and lost the reply. Kleppmann explains why a timeout leaves the outcome uncertain. A stable order identifier can help a service recognize a retry and avoid charging twice.",
      source: {
        label: "Kleppmann on distributed systems",
        url: "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/",
      },
    },
  ],
}];
