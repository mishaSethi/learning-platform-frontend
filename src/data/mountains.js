// Mountain, trekking and Himalaya facts shown on the dashboard.
// Heights in metres. Trek figures are typical values - itineraries vary by operator.

export const QUICK_FACTS = [
  { value: "8,849 m", label: "Height of Mount Everest, the highest point on Earth" },
  { value: "14", label: "Peaks over 8,000 m - all in the Himalaya and Karakoram" },
  { value: "≈2,400 km", label: "Length of the Himalayan range" },
  { value: "5", label: "Countries it crosses: India, Nepal, Bhutan, China and Pakistan" },
];

export const HIMALAYA_TOPICS = [
  {
    id: "origin",
    emoji: "🌋",
    title: "How the Himalayas Formed",
    summary: "A continent-sized collision that is still pushing the mountains higher today.",
    stats: [
      { label: "Collision began", value: "≈50 million years ago" },
      { label: "India still moves", value: "≈4–5 cm north per year" },
      { label: "Name means", value: "\"Abode of snow\" (Sanskrit)" },
    ],
    paragraphs: [
      "Around 200 million years ago, the land that is now India was part of a southern supercontinent called Gondwana. When Gondwana broke apart, the Indian plate began drifting north across an ocean called the Tethys.",
      "Roughly 50 million years ago, India crashed into the Eurasian plate. Neither plate could sink easily beneath the other, so the crust crumpled, folded and stacked upwards - building the Himalayas and lifting the Tibetan Plateau.",
      "The ocean floor was pushed up with it. That is why the rock near the summit of Mount Everest is marine limestone that contains fossils of sea creatures - the top of the world was once under the sea.",
      "The collision has not stopped. India still pushes north by a few centimetres every year, the mountains keep rising by a few millimetres a year, and the stress is released in powerful earthquakes, such as the magnitude 7.8 Gorkha earthquake in Nepal in 2015.",
    ],
    highlights: [
      "\"Himalaya\" comes from Sanskrit: hima (snow) + ālaya (abode).",
      "In geological terms, the Himalayas are among the youngest mountain ranges on Earth.",
      "Everest's summit rock formed on a sea floor hundreds of millions of years ago.",
    ],
  },
  {
    id: "geography",
    emoji: "🗺️",
    title: "Geography of the Range",
    summary: "An arc of parallel ranges stretching about 2,400 km across five countries.",
    stats: [
      { label: "Length", value: "≈2,400 km" },
      { label: "Width", value: "≈150–400 km" },
      { label: "Countries", value: "India, Nepal, Bhutan, China, Pakistan" },
    ],
    paragraphs: [
      "The Himalayas form a great curved arc between the Indus river in the west and the Brahmaputra in the east. Two giant peaks act as anchors at either end: Nanga Parbat in the west and Namcha Barwa in the east.",
      "The range is not a single wall but several parallel belts. From south to north they are the Sivaliks (low outer foothills), the Lesser Himalaya, and the Greater Himalaya (Himadri), where the highest snow peaks stand. Beyond lies the Trans-Himalaya and the Tibetan Plateau.",
      "Nepal holds eight of the world's fourteen 8,000-metre peaks, either fully or on its borders. The neighbouring Karakoram range, home to K2, is often grouped with the Himalayas but is geologically a separate range.",
    ],
    highlights: [
      "Sivaliks → Lesser Himalaya → Greater Himalaya → Trans-Himalaya.",
      "Western anchor: Nanga Parbat. Eastern anchor: Namcha Barwa.",
      "The Tibetan Plateau to the north averages over 4,500 m in height.",
    ],
  },
  {
    id: "rivers",
    emoji: "💧",
    title: "Rivers & Glaciers",
    summary: "The \"Third Pole\" - frozen water that feeds the great rivers of Asia.",
    stats: [
      { label: "Nickname", value: "The Third Pole" },
      { label: "Major rivers", value: "Indus, Ganga, Brahmaputra" },
      { label: "People who rely on them", value: "Well over a billion" },
    ],
    paragraphs: [
      "The Himalayan region holds the largest store of ice outside the Arctic and Antarctica, which is why it is often called the Third Pole.",
      "Meltwater from its glaciers and snowfields feeds some of Asia's greatest rivers. The Ganga begins at the Gangotri Glacier, at an ice cave called Gaumukh. The Indus and the Brahmaputra (called the Yarlung Tsangpo in Tibet) both rise in Tibet near sacred Mount Kailash.",
      "These rivers supply drinking water, farming and hydropower to well over a billion people downstream. Many glaciers are now shrinking as the climate warms, which threatens water supplies and raises the risk of sudden floods from glacial lakes.",
    ],
    highlights: [
      "Gangotri Glacier → source of the Ganga.",
      "Siachen Glacier is one of the longest glaciers outside the polar regions.",
      "Glacial lake outburst floods are a growing danger as ice melts.",
    ],
  },
  {
    id: "climate",
    emoji: "🌦️",
    title: "Climate & the Death Zone",
    summary: "A giant weather wall - and air so thin near the top that it can kill.",
    stats: [
      { label: "Death zone starts", value: "≈8,000 m" },
      { label: "Oxygen on Everest's summit", value: "≈⅓ of sea level" },
      { label: "Main rainy season", value: "Jun–Sep monsoon" },
    ],
    paragraphs: [
      "The Himalayas act as a huge barrier. In winter they block freezing winds from Central Asia, keeping northern India much warmer than places at the same latitude. In summer they force the monsoon clouds to rise and drop their rain on the southern slopes.",
      "North of the range, the land sits in a rain shadow. That is why Ladakh, Spiti and the Tibetan Plateau are high, cold deserts, while the southern foothills are green and wet.",
      "Climbing higher means less oxygen. Above about 8,000 m - the death zone - the air holds roughly a third of the oxygen at sea level. The human body cannot adapt there, so climbers can only survive for a limited time and most use bottled oxygen.",
    ],
    highlights: [
      "Southern slopes: heavy monsoon rain. Northern side: cold desert.",
      "Temperature drops by roughly 6–7 °C for every 1,000 m you climb.",
      "Above 8,000 m, every hour spent increases the danger.",
    ],
  },
  {
    id: "wildlife",
    emoji: "🐆",
    title: "Wildlife & Plants",
    summary: "From tropical forests to icy heights - home to snow leopards and red pandas.",
    stats: [
      { label: "Iconic animal", value: "Snow leopard" },
      { label: "Nepal's national bird", value: "Himalayan monal" },
      { label: "Nepal's national flower", value: "Rhododendron" },
    ],
    paragraphs: [
      "Because the Himalayas rise from steamy lowlands to frozen summits, they hold many different worlds stacked on top of each other: subtropical forest, oak and pine forest, rhododendron forest, alpine meadows and finally rock and ice.",
      "The elusive snow leopard hunts blue sheep and Himalayan tahr on rocky slopes. The red panda lives in the bamboo forests of the eastern Himalayas. Musk deer, Himalayan black bears and the brilliantly coloured Himalayan monal pheasant also live here.",
      "Above the treeline, alpine meadows burst into flower after the snow melts. The Valley of Flowers in Uttarakhand is a UNESCO World Heritage Site famous for hundreds of species of alpine flowers.",
    ],
    highlights: [
      "Yaks are the classic pack animal of the high Himalaya.",
      "Rhododendron forests turn hillsides red and pink in spring.",
      "Hemis National Park in Ladakh is one of the best places to spot snow leopards.",
    ],
  },
  {
    id: "culture",
    emoji: "🙏",
    title: "People, Culture & Sacred Peaks",
    summary: "Sherpas, monasteries, pilgrimages - and mountains too sacred to climb.",
    stats: [
      { label: "Famous mountain people", value: "Sherpa" },
      { label: "Never climbed", value: "Mount Kailash" },
      { label: "Pilgrimage", value: "Char Dham, Uttarakhand" },
    ],
    paragraphs: [
      "Many communities call the Himalayas home, including Sherpas, Gurungs, Tamangs, Bhotias and Ladakhis. The Sherpa people of the Khumbu region near Everest are renowned for their strength at high altitude, and are the backbone of most Himalayan expeditions.",
      "The mountains are deeply sacred. Mount Kailash in Tibet is holy to Hindus, Buddhists, Jains and followers of Bön, and has never been climbed out of respect. On Kangchenjunga, climbers traditionally stop just short of the true summit to honour local beliefs.",
      "Colourful prayer flags flutter on passes and bridges, and monasteries such as Tengboche (Nepal) and Hemis (Ladakh) are centres of Buddhist life. In India, the Char Dham pilgrimage to Yamunotri, Gangotri, Kedarnath and Badrinath draws huge numbers of pilgrims every year.",
    ],
    highlights: [
      "Prayer flags carry prayers on the wind.",
      "Walk clockwise around stupas and mani walls, as locals do.",
      "Ask before photographing people or the inside of monasteries.",
    ],
  },
];

export const HIGHEST_PEAKS = [
  {
    rank: 1, name: "Mount Everest", height: 8849, range: "Mahalangur Himal", location: "Nepal / China",
    firstAscent: "1953 - Edmund Hillary & Tenzing Norgay",
    paragraphs: [
      "The highest mountain on Earth. In Nepal it is called Sagarmatha and in Tibet Chomolungma. Its English name honours George Everest, a Surveyor General of India.",
      "Its current official height, 8,848.86 m, was announced jointly by Nepal and China in 2020 after a new survey.",
      "Most climbers use the South Col route from Nepal or the North Ridge route from Tibet. The Khumbu Icefall, a shifting maze of ice above Base Camp, is one of the most dangerous parts of the southern route.",
    ],
  },
  {
    rank: 2, name: "K2", height: 8611, range: "Karakoram", location: "Pakistan / China",
    firstAscent: "1954 - Lino Lacedelli & Achille Compagnoni",
    paragraphs: [
      "The second-highest mountain on Earth, known as the Savage Mountain because it is far steeper and more technical than Everest, with frequent storms.",
      "Its name comes from a survey label: 'K' for Karakoram, and '2' because it was the second peak listed in the range during the 1850s.",
      "K2 was the last 8,000-metre peak to be climbed in winter, achieved in January 2021 by a team of ten Nepali climbers.",
    ],
  },
  {
    rank: 3, name: "Kangchenjunga", height: 8586, range: "Kangchenjunga Himal", location: "Nepal / India",
    firstAscent: "1955 - Joe Brown & George Band",
    paragraphs: [
      "The third-highest mountain in the world and the highest in India. Its name is usually translated as \"Five Treasures of the Snow\", after its five high summits.",
      "The first climbers stopped a few metres below the true summit to respect the beliefs of the people of Sikkim, who hold the mountain sacred. Many climbers still follow this tradition.",
    ],
  },
  {
    rank: 4, name: "Lhotse", height: 8516, range: "Mahalangur Himal", location: "Nepal / China",
    firstAscent: "1956 - Fritz Luchsinger & Ernst Reiss",
    paragraphs: [
      "Lhotse means \"South Peak\" in Tibetan. It is joined to Everest by the South Col, a high saddle where climbers of both mountains camp.",
      "Its south face is one of the largest and most difficult mountain faces in the world.",
    ],
  },
  {
    rank: 5, name: "Makalu", height: 8485, range: "Mahalangur Himal", location: "Nepal / China",
    firstAscent: "1955 - Lionel Terray & Jean Couzy",
    paragraphs: [
      "Makalu stands about 19 km southeast of Everest and is famous for its striking four-sided pyramid shape.",
      "Its steep, exposed ridges make it one of the harder 8,000-metre peaks to climb.",
    ],
  },
  {
    rank: 6, name: "Cho Oyu", height: 8188, range: "Mahalangur Himal", location: "Nepal / China",
    firstAscent: "1954 - Herbert Tichy, Joseph Jöchler & Pasang Dawa Lama",
    paragraphs: [
      "Cho Oyu means \"Turquoise Goddess\" in Tibetan. It lies just west of Everest, near the ancient Nangpa La trade pass.",
      "Its standard route is considered one of the most accessible of all the 8,000-metre peaks, so many climbers choose it as their first.",
    ],
  },
  {
    rank: 7, name: "Dhaulagiri I", height: 8167, range: "Dhaulagiri Himal", location: "Nepal",
    firstAscent: "1960 - Swiss-Austrian expedition",
    paragraphs: [
      "Dhaulagiri means \"White Mountain\" in Sanskrit. It rises dramatically above the Kali Gandaki river gorge, one of the deepest gorges in the world, which separates it from Annapurna.",
      "It was the last of the 8,000-metre peaks in Nepal to be climbed.",
    ],
  },
  {
    rank: 8, name: "Manaslu", height: 8163, range: "Mansiri Himal", location: "Nepal",
    firstAscent: "1956 - Toshio Imanishi & Gyalzen Norbu",
    paragraphs: [
      "Manaslu means \"Mountain of the Spirit\". It was first climbed by a Japanese expedition, and the mountain has a special place in Japanese climbing history.",
      "The Manaslu Circuit trek around its base is a quieter alternative to the Annapurna Circuit.",
    ],
  },
  {
    rank: 9, name: "Nanga Parbat", height: 8126, range: "Western Himalaya", location: "Pakistan",
    firstAscent: "1953 - Hermann Buhl",
    paragraphs: [
      "Nanga Parbat means \"Naked Mountain\". It is the western anchor of the Himalayas and was nicknamed the \"Killer Mountain\" after many early deaths.",
      "Its Rupal Face rises around 4,600 m from base to summit - one of the highest mountain faces on Earth.",
      "Hermann Buhl reached the summit alone in 1953, without bottled oxygen, in one of the most remarkable climbs in history.",
    ],
  },
  {
    rank: 10, name: "Annapurna I", height: 8091, range: "Annapurna Himal", location: "Nepal",
    firstAscent: "1950 - Maurice Herzog & Louis Lachenal",
    paragraphs: [
      "Annapurna I was the first 8,000-metre peak ever climbed, three years before Everest. The name comes from the Hindu goddess of food and nourishment.",
      "It is notorious for avalanches and has historically had one of the highest fatality rates of any major peak. The trails around it, though, are among the most popular treks in the world.",
    ],
  },
];

export const POPULAR_TREKS = [
  {
    name: "Everest Base Camp", region: "Khumbu, Nepal", maxAltitude: "5,545 m (Kala Patthar)",
    duration: "12–14 days", difficulty: "Hard", bestSeason: "Mar–May, Sep–Nov",
    description: "Walk through Sherpa villages and Sagarmatha National Park to the foot of the world's highest mountain.",
    paragraphs: [
      "Most trekkers fly into the tiny mountain airstrip at Lukla and walk up the Dudh Kosi valley through Sherpa villages and Sagarmatha National Park, a UNESCO World Heritage Site.",
      "The route climbs slowly, with rest days in Namche Bazaar and Dingboche to help the body adjust to the altitude, before reaching Everest Base Camp at about 5,364 m.",
      "Many trekkers also climb Kala Patthar at sunrise for the classic close-up view of Everest's summit, which cannot be seen well from Base Camp itself.",
    ],
    highlights: ["Namche Bazaar, the Sherpa capital", "Tengboche Monastery", "Sunrise over Everest from Kala Patthar"],
  },
  {
    name: "Annapurna Circuit", region: "Annapurna, Nepal", maxAltitude: "5,416 m (Thorong La)",
    duration: "12–18 days", difficulty: "Hard", bestSeason: "Mar–May, Oct–Nov",
    description: "A classic loop around the Annapurna massif, from green rice terraces to a high desert pass.",
    paragraphs: [
      "The circuit circles the whole Annapurna massif, changing from subtropical rice terraces to pine forest, and then to the dry, Tibetan-style landscape of Manang.",
      "Its high point is the Thorong La pass at 5,416 m, usually crossed before dawn to avoid strong afternoon winds.",
      "On the far side lies Muktinath, a temple sacred to both Hindus and Buddhists, before the trail descends into the Kali Gandaki valley.",
    ],
    highlights: ["Manang village", "Crossing Thorong La", "Muktinath temple"],
  },
  {
    name: "Annapurna Base Camp", region: "Annapurna, Nepal", maxAltitude: "4,130 m",
    duration: "7–12 days", difficulty: "Moderate", bestSeason: "Mar–May, Oct–Dec",
    description: "A natural amphitheatre ringed by Annapurna I, Machapuchare and other giants.",
    paragraphs: [
      "The trail follows the Modi Khola river into the Annapurna Sanctuary, a high glacial basin completely surrounded by peaks over 6,000 and 8,000 m.",
      "It passes Machapuchare Base Camp below the sacred \"Fishtail\" mountain, which is closed to climbers.",
      "Many itineraries add a sunrise hike to Poon Hill and a soak in the hot springs at Jhinu Danda on the way down.",
    ],
    highlights: ["The Annapurna Sanctuary", "Machapuchare (Fishtail) views", "Hot springs at Jhinu Danda"],
  },
  {
    name: "Markha Valley", region: "Ladakh, India", maxAltitude: "≈5,200 m (Kongmaru La)",
    duration: "6–8 days", difficulty: "Moderate", bestSeason: "Jun–Sep",
    description: "A high-desert trek past monasteries and villages - dry even during the monsoon.",
    paragraphs: [
      "Starting near Leh, the trek passes through Hemis National Park, one of the best snow leopard habitats in the world.",
      "Trekkers stay in small Ladakhi villages and homestays, past whitewashed stupas and mani walls carved with prayers.",
      "Because Ladakh lies in the Himalayan rain shadow, this is one of the best treks to do during the monsoon.",
    ],
    highlights: ["Hemis National Park", "Ladakhi homestays", "Views of Kang Yatse from Kongmaru La"],
  },
  {
    name: "Hampta Pass", region: "Himachal Pradesh, India", maxAltitude: "4,270 m",
    duration: "4–5 days", difficulty: "Moderate", bestSeason: "Jun–Sep",
    description: "Cross from the green Kullu valley into the stark, barren landscape of Lahaul.",
    paragraphs: [
      "Beginning near Manali, the trail climbs through forests and meadows in the Kullu valley.",
      "After crossing Hampta Pass, the scenery changes completely to the dry, rocky mountains of Lahaul - one of the most dramatic contrasts of any Himalayan trek.",
      "Many groups finish with a visit to Chandratal, a crescent-shaped high-altitude lake in Spiti.",
    ],
    highlights: ["Green Kullu to barren Lahaul in one day", "River crossings and meadow camps", "Chandratal Lake"],
  },
  {
    name: "Valley of Flowers", region: "Uttarakhand, India", maxAltitude: "≈4,300–4,600 m (Hemkund Sahib)",
    duration: "5–6 days", difficulty: "Easy–Moderate", bestSeason: "Jul–Sep",
    description: "A UNESCO World Heritage valley that bursts into alpine flowers during the monsoon.",
    paragraphs: [
      "From the base village of Ghangaria, trekkers walk into a glacial valley carpeted with hundreds of species of alpine flowers during the monsoon.",
      "The valley is part of the Nanda Devi and Valley of Flowers National Parks, a UNESCO World Heritage Site. It is only open for part of the year.",
      "A steep side trail climbs to Hemkund Sahib, a glacial lake with an important Sikh gurudwara, at well over 4,000 m.",
    ],
    highlights: ["Monsoon wildflowers", "Hemkund Sahib lake", "Brahma kamal blooms"],
  },
  {
    name: "Kedarkantha", region: "Uttarakhand, India", maxAltitude: "≈3,800 m",
    duration: "5–6 days", difficulty: "Easy–Moderate", bestSeason: "Dec–Apr",
    description: "A favourite first snow trek, with a summit view over the Garhwal Himalaya.",
    paragraphs: [
      "The trek starts from the village of Sankri and climbs through pine and oak forests inside Govind National Park.",
      "In winter the trail and campsites are covered in snow, which makes it one of India's most popular first snow treks.",
      "The summit push starts before dawn to watch the sunrise over a wide panorama of Garhwal peaks.",
    ],
    highlights: ["Snowy forest campsites", "Juda ka Talab lake", "Sunrise summit panorama"],
  },
];

export const CLIMBERS = [
  {
    name: "Tenzing Norgay & Edmund Hillary", country: "Nepal / India & New Zealand", year: "1953",
    knownFor: "First ascent of Mount Everest",
    paragraphs: [
      "On 29 May 1953, Tenzing Norgay, a Sherpa mountaineer, and Edmund Hillary, a beekeeper from New Zealand, became the first people confirmed to stand on top of Mount Everest.",
      "They were part of a British expedition led by John Hunt. The news reached London on the morning of Queen Elizabeth II's coronation.",
      "Hillary later spent decades building schools and hospitals for Sherpa communities through the Himalayan Trust.",
    ],
  },
  {
    name: "Reinhold Messner", country: "Italy", year: "1978–1986",
    knownFor: "Everest without bottled oxygen; first to climb all 14 eight-thousanders",
    paragraphs: [
      "In 1978, Messner and Peter Habeler made the first ascent of Everest without bottled oxygen, something many doctors believed was impossible.",
      "In 1980 he went further, climbing Everest completely alone and again without bottled oxygen.",
      "In 1986 he became the first person to climb all fourteen 8,000-metre peaks.",
    ],
  },
  {
    name: "Junko Tabei", country: "Japan", year: "1975",
    knownFor: "First woman to climb Mount Everest",
    paragraphs: [
      "On 16 May 1975, Junko Tabei became the first woman to reach the summit of Everest, only days after surviving an avalanche that buried her camp.",
      "In 1992 she also became the first woman to complete the Seven Summits - the highest peak on every continent.",
    ],
  },
  {
    name: "Bachendri Pal", country: "India", year: "1984",
    knownFor: "First Indian woman to climb Mount Everest",
    paragraphs: [
      "On 23 May 1984, Bachendri Pal became the first Indian woman to reach the summit of Everest.",
      "She went on to lead many expeditions and to train and mentor generations of Indian mountaineers.",
    ],
  },
  {
    name: "Kami Rita Sherpa", country: "Nepal", year: "1994–present",
    knownFor: "Most ascents of Mount Everest",
    paragraphs: [
      "Kami Rita Sherpa holds the record for the most ascents of Everest - 31 summits as of 2025.",
      "A professional mountain guide, he first summited in 1994 and has returned almost every year since, usually guiding clients.",
      "His record highlights the vital role of Sherpa guides, who fix ropes, carry loads and keep climbers safe on almost every expedition.",
    ],
  },
  {
    name: "Lhakpa Sherpa", country: "Nepal", year: "2000–2022",
    knownFor: "Most Everest ascents by a woman",
    paragraphs: [
      "In 2000, Lhakpa Sherpa became the first Nepali woman to climb Everest and come back down alive.",
      "By 2022 she had reached the summit ten times, the most of any woman.",
    ],
  },
  {
    name: "Nirmal \"Nims\" Purja", country: "Nepal", year: "2019",
    knownFor: "All 14 eight-thousanders in about six months",
    paragraphs: [
      "A former Gurkha soldier, Nims Purja climbed all fourteen 8,000-metre peaks in 6 months and 6 days in 2019 - a project he called \"Project Possible\".",
      "The previous record had been nearly eight years. In January 2021 he was also part of the Nepali team that made the first winter ascent of K2.",
    ],
  },
  {
    name: "Arunima Sinha", country: "India", year: "2013",
    knownFor: "First female amputee to climb Mount Everest",
    paragraphs: [
      "Arunima Sinha lost her leg after being pushed from a moving train in 2011. Just two years later, on 21 May 2013, she reached the summit of Everest using a prosthetic leg.",
      "She has since climbed the highest peaks on several continents and was awarded the Padma Shri.",
    ],
  },
];

export const TREKKING_TIPS = [
  {
    title: "Best seasons",
    points: [
      "Spring (Mar–May) and autumn (Sep–Nov) bring the clearest views in Nepal and Uttarakhand.",
      "Monsoon (Jun–Sep) means heavy rain in most areas - but it's the best time for Ladakh and Spiti, which sit in a rain shadow.",
      "Winter is for snow treks like Kedarkantha; high passes are often closed.",
    ],
  },
  {
    title: "Altitude sickness",
    points: [
      "Above about 3,000 m, sleep no more than 500 m higher each night, and take a rest day every 3–4 days.",
      "Headache, nausea, tiredness or dizziness can be early signs - don't climb higher until they go away.",
      "If symptoms get worse, descend. Going down is the most effective treatment.",
    ],
  },
  {
    title: "What to pack",
    points: [
      "Layers: base layer, fleece, down jacket and a waterproof shell.",
      "Broken-in boots, a sleeping bag rated well below freezing, sunglasses and high-SPF sunscreen.",
      "A water filter or purification tablets, and a basic first-aid kit.",
    ],
  },
  {
    title: "Permits & guides",
    points: [
      "Most national parks and conservation areas need a permit - check the latest rules before you go.",
      "Nepal now requires most foreign trekkers to hire a licensed guide.",
      "Always tell someone your route and expected return date.",
    ],
  },
];
