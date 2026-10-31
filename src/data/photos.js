// Photos in public/photos, all from Wikimedia Commons under free licences.
// The licences require crediting the author and naming the licence, so every
// photo keeps its credit next to it (see PhotoCredit in Dashboard.jsx).

const BY = (v) => `https://creativecommons.org/licenses/by/${v}/`;
const BY_SA = (v) => `https://creativecommons.org/licenses/by-sa/${v}/`;
const COMMONS = "https://commons.wikimedia.org/wiki/File:";

function photo(file, alt, artist, license, licenseUrl, commonsName, caption) {
  return {
    src: `/photos/${file}.jpg`,
    alt,
    caption,
    credit: { artist, license, licenseUrl, page: COMMONS + commonsName },
  };
}

export const TREK_PHOTOS = {
  "Everest Base Camp": photo("trek-ebc", "Yellow tents of Everest Base Camp beside the Khumbu Icefall",
    "Nepal Trek Adventures", "CC BY-SA 4.0", BY_SA("4.0"), "Everest_base_camp_trek-0367.jpg"),
  "Annapurna Circuit": photo("trek-annapurna-circuit", "Prayer flags on the snowy Thorong La pass",
    "Vyacheslav Argenberg", "CC BY 4.0", BY("4.0"), "Thorong_La_Pass_2,_Himalaya,_Nepal.jpg"),
  "Annapurna Base Camp": photo("trek-abc", "Grassy trail leading towards the snow peaks around Annapurna Base Camp",
    "Bijay Chaurasia", "CC BY-SA 4.0", BY_SA("4.0"), "Mt._Moditse_as_seen_from_Annapurna_Base_Camp-5324.jpg"),
  "Markha Valley": photo("trek-markha", "Snow peak reflected in a lake near Kang Yatze, Markha Valley",
    "SlartibErtfass der bertige", "CC BY-SA 3.0", BY_SA("3.0"), "A_lake_near_Kang_Yatze,_Markha_Valley_trek,_Ladakh,_India_(2006).jpg"),
  "Hampta Pass": photo("trek-hampta", "Snowy Himalayan peaks above the Hampta Pass trail",
    "Kunalsvnit", "CC BY-SA 4.0", BY_SA("4.0"), "Himalayas_in_hampta_pass.jpg"),
  "Valley of Flowers": photo("trek-vof", "Wildflowers covering a green valley between steep mountains",
    "Rohit Sharma, edited by UnpetitproleX", "CC BY-SA 4.0", BY_SA("4.0"), "Valley_of_flowers_national_park,_Uttarakhand,_India_03_(edit).jpg"),
  "Kedarkantha": photo("trek-kedarkantha", "Orange tents at a Kedarkantha campsite at sunset",
    "AmxxmA", "CC BY-SA 4.0", BY_SA("4.0"), "Kedarkantha_camps_in_heaven.jpg"),
};

export const PEAK_PHOTOS = {
  "Mount Everest": photo("peak-everest", "The summit pyramid of Mount Everest",
    "Vyacheslav Argenberg", "CC BY 4.0", BY("4.0"), "Everest,_Himalayas.jpg"),
  "K2": photo("peak-k2", "The pyramid of K2 above the Karakoram glaciers",
    "Svy123", "CC BY 3.0", BY("3.0"), "K2_2006b.jpg"),
  "Kangchenjunga": photo("peak-kangchenjunga", "Kangchenjunga glowing orange at sunrise",
    "Johannes Bahrdt", "CC BY-SA 4.0", BY_SA("4.0"), "Kangchenjunga-from-Gangtok.jpg"),
  "Lhotse": photo("peak-lhotse", "The south face of Lhotse seen from Chukhung Ri",
    "Uwe Gille", "CC BY-SA 3.0", BY_SA("3.0"), "Lhotse-fromChukhungRi.jpg"),
  "Makalu": photo("peak-makalu", "The granite pyramid of Makalu",
    "Ben Tubby", "CC BY 2.0", BY("2.0"), "Makalu.jpg"),
  "Cho Oyu": photo("peak-cho-oyu", "Cho Oyu seen from Machermo",
    "Goutam1962", "CC BY-SA 4.0", BY_SA("4.0"), "Cho_Oyu_from_Machermo.jpg"),
  "Dhaulagiri I": photo("peak-dhaulagiri", "Dhaulagiri rising above a deep valley",
    "Vyacheslav Argenberg", "CC BY 4.0", BY("4.0"), "Dhaulagiri,_Himalaya,_Nepal.jpg"),
  "Manaslu": photo("peak-manaslu", "The snowy summit of Manaslu against a deep blue sky",
    "Pratapgrg", "CC BY-SA 4.0", BY_SA("4.0"), "Mt_Manaslu.jpg"),
  "Nanga Parbat": photo("peak-nanga-parbat", "Nanga Parbat reflected in a lake at Fairy Meadows",
    "Tahsin Anwar Ali", "CC BY-SA 3.0", BY_SA("3.0"), "Nanga_Parbat_The_Killer_Mountain.jpg"),
  "Annapurna I": photo("peak-annapurna", "A climber silhouetted below the south face of Annapurna I",
    "KarimRi", "Public domain", null, "Annapurna_I,_south_face.jpg"),
};

// "Life on the trail" gallery on the overview page
export const TRAIL_PHOTOS = [
  photo("life-trekkers", "A group of trekkers on a ridge on the way to Everest Base Camp",
    "Icicles Adventure Treks & Tours", "CC BY-SA 4.0", BY_SA("4.0"), "A_group_of_trekkers_on_the_way_to_Everest_Base_Camp.jpg",
    "On the trail to Everest"),
  photo("life-namche", "The colourful houses of Namche Bazaar below snowy peaks",
    "Nirojsedhai", "CC BY-SA 4.0", BY_SA("4.0"), "Namche_Bazaar_facing_Kongde_Ri_towards_west.jpg",
    "Namche Bazaar, the Sherpa capital"),
  photo("life-bridge", "Trekkers crossing a wooden suspension bridge over a river",
    "Steve Hicks", "CC BY 2.0", BY("2.0"), "One_of_many_footbridges_along_the_trail,_Nepal,_trek.jpg",
    "Crossing a suspension bridge"),
  photo("life-flags", "Prayer flags fluttering on a high mountain pass",
    "Vyacheslav Argenberg", "CC BY 4.0", BY("4.0"), "Mountain_pass_2,_Nepal.jpg",
    "Prayer flags on a high pass"),
  photo("life-abc-night", "Lodges at Annapurna Base Camp below peaks lit at dusk",
    "Mithunkunwar9", "CC BY-SA 4.0", BY_SA("4.0"), "ABC_night.jpg",
    "Dusk at Annapurna Base Camp"),
  photo("life-yak", "A yak grazing in the Markha Valley, Ladakh",
    "Balachandran Chandrasekharan", "CC BY-SA 3.0", BY_SA("3.0"), "Yak_at_markha_valley.jpg",
    "Yak country, Ladakh"),
];
