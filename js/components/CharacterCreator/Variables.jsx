let appearanceCategories = [];

const setAppearanceCategories = (maximumValues) => {
    appearanceCategories = [
        // Head
        {
            name: "Head",
            display: "Twarz",
            icon: "fa-solid fa-face-smile",
            sex: "all",
            features: [
                {
                    name: "shape1",
                    display: "Twarz matki",
                    maxValue: 45,
                    percent: false,
                },
                {
                    name: "shape2",
                    display: "Twarz ojca",
                    maxValue: 45,
                    percent: false,
                },
                {
                    name: "shape3",
                    display: "Twarz babki",
                    maxValue: 45,
                    percent: false,
                },
                {
                    name: "skin1",
                    display: "Skóra matki",
                    maxValue: 45,
                    percent: false,
                },
                {
                    name: "skin2",
                    display: "Skóra ojca",
                    maxValue: 45,
                    percent: false,
                },
                {
                    name: "skin3",
                    display: "Skóra babki",
                    maxValue: 45,
                    percent: false,
                },
                {
                    name: "shapeMix",
                    display: "Podobieństwo do matki",
                    maxValue: 1,
                    percent: true,
                },
                {
                    name: "skinMix",
                    display: "Podobieństwo do ojca",
                    maxValue: 1,
                    percent: true,
                },
                {
                    name: "mix3",
                    display: "Podobieństwo do babki",
                    maxValue: 1,
                    percent: true,
                },
            ],
        },

        // Special
        {
            name: "Special",
            display: "Cechy szczególne",
            icon: "fa-solid fa-face-head-bandage",
            sex: "all",
            features: [
                {
                    name: "blemishes",
                    display: "Skazy",
                    maxValue: maximumValues.blemishes,
                    percent: false,
                },
                {
                    name: "blemishesOpacity",
                    display: "Wielkość skaz",
                    maxValue: 1,
                    percent: true,
                },
                {
                    name: "blush",
                    display: "Rumieńce",
                    maxValue: maximumValues.blush,
                    percent: false,
                },
                {
                    name: "blushOpacity",
                    display: "Wielkość rumieńców",
                    maxValue: 1,
                    percent: true,
                },
                {
                    name: "complexion",
                    display: "Cera",
                    maxValue: maximumValues.complexion,
                    percent: false,
                },
                {
                    name: "complexionOpacity",
                    display: "Wielkość cery",
                    maxValue: 1,
                    percent: true,
                },
                {
                    name: "sunDamage",
                    display: "Poparzenia słoneczne",
                    maxValue: maximumValues.sunDamage,
                    percent: false,
                },
                {
                    name: "sunDamageOpacity",
                    display: "Wielkość poparzeń słonecznych",
                    maxValue: 1,
                    percent: true,
                },
                {
                    name: "freckles",
                    display: "Piegi",
                    maxValue: maximumValues.freckles,
                    percent: false,
                },
                {
                    name: "frecklesOpacity",
                    display: "Wielkość piegów",
                    maxValue: 1,
                    percent: true,
                },
            ],
        },

        // Hair
        {
            name: "Hair",
            display: "Włosy",
            icon: "fa-solid fa-user-hair-long",
            sex: "all",
            features: [
                {
                    name: "hair",
                    display: "Fryzura",
                    maxValue: maximumValues.hair,
                    percent: false,
                },
                {
                    name: "colorHair1",
                    display: "Kolor włosów 1",
                    maxValue: maximumValues.hairColor,
                    percent: false,
                },
                {
                    name: "colorHair2",
                    display: "Kolor włosów 2",
                    maxValue: maximumValues.hairColor,
                    percent: false,
                },
                {
                    name: "chestHair",
                    display: "Włosy na klatce",
                    maxValue: maximumValues.chestHair,
                    percent: false,
                },
                {
                    name: "chestHairOpacity",
                    display: "Wielkość włosów na klatce",
                    maxValue: 1,
                    percent: true,
                },
                {
                    name: "chestHairColor",
                    display: "Kolor włosów na klatce",
                    maxValue: maximumValues.hairColor,
                    percent: false,
                },
            ],
        },

        // Beard
        {
            name: "Beard",
            display: "Zarost",
            icon: "fa-solid fa-mustache",
            sex: "men",
            features: [
                {
                    name: "beard",
                    display: "Zarost",
                    maxValue: maximumValues.beard,
                    percent: false,
                },
                {
                    name: "opacityBeard",
                    display: "Wielkość zarostu",
                    maxValue: 1,
                    percent: true,
                },
                {
                    name: "colorBeard",
                    display: "Kolor zarostu",
                    maxValue: maximumValues.hairColor,
                    percent: false,
                },
            ],
        },

        // Eyes
        {
            name: "Eyes",
            display: "Oczy",
            icon: "fa-regular fa-eyes",
            sex: "all",
            features: [
                {
                    name: "eyeColor",
                    display: "Kolor oczu",
                    maxValue: 31,
                    percent: false,
                },
                {
                    name: "eyebrows",
                    display: "Brwi",
                    maxValue: maximumValues.eyebrows,
                    percent: false,
                },
                {
                    name: "eyebrowsColor",
                    display: "Kolor brwi",
                    maxValue: maximumValues.hairColor,
                    percent: false,
                },
                {
                    name: "eyebrowsOpacity",
                    display: "Gęstość brwi",
                    maxValue: 1,
                    percent: true,
                },
            ],
        },

        // Makeup
        {
            name: "Makeup",
            display: "Makijaż",
            icon: "fa-solid fa-lips",
            sex: "women",
            features: [
                {
                    name: "makeup",
                    display: "Makijaż",
                    maxValue: maximumValues.makeup,
                    percent: false,
                },
                {
                    name: "makeupOpacity",
                    display: "Gęstość makijażu",
                    maxValue: 1,
                    percent: true,
                },
                {
                    name: "makeupColor",
                    display: "Kolor makijażu",
                    maxValue: maximumValues.hairColor,
                    percent: false,
                },
                {
                    name: "lipstick",
                    display: "Szminka",
                    maxValue: maximumValues.lipstick,
                    percent: false,
                },
                {
                    name: "lipstickOpacity",
                    display: "Dokładność",
                    maxValue: 1,
                    percent: true,
                },
                {
                    name: "lipstickColor",
                    display: "Kolor szminki",
                    maxValue: maximumValues.hairColor,
                    percent: false,
                },
            ],
        },
    ];
};

let appearanceDefault = {
    // Beard
    beard: 0,
    opacityBeard: Number(0).toFixed(1),
    colorBeard: 0,

    // Head
    shape1: 0,
    shape2: 0,
    shape3: 0,
    skin1: 0,
    skin2: 0,
    skin3: 0,
    shapeMix: Number(0).toFixed(1),
    skinMix: Number(0).toFixed(1),
    mix3: Number(0).toFixed(1),

    // Hair
    hair: 0,
    colorHair1: 0,
    colorHair2: 0,

    // Eye
    eyeColor: 0,
    eyebrows: 0,
    eyebrowsColor: 0,
    eyebrowsOpacity: Number(0).toFixed(1),

    //Makeup
    makeup: 0,
    makeupOpacity: Number(0).toFixed(1),
    makeupColor: 0,

    // Lipstick
    lipstick: 0,
    lipstickOpacity: Number(0).toFixed(1),
    lipstickColor: 0,

    // Blemishes
    blemishes: 0,
    blemishesOpacity: Number(0).toFixed(1),

    // Blush
    blush: 0,
    blushOpacity: Number(0).toFixed(1),

    // Complexion
    complexion: 0,
    complexionOpacity: Number(0).toFixed(1),

    // Sun Damage
    sunDamage: 0,
    sunDamageOpacity: Number(0).toFixed(1),

    // Freckles
    freckles: 0,
    frecklesOpacity: Number(0).toFixed(1),

    // Chest Hair
    chestHair: 0,
    chestHairOpacity: Number(0).toFixed(1),
    chestHairColor: 0,
};

export { setAppearanceCategories, appearanceCategories, appearanceDefault };
