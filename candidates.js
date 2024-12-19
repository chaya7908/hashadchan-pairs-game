const TRANSLATION = {
  CONSERVATIVE: "שמור",
  CONSERVATIVE_AND_OPEN_MIND: "שמור וראש פתוח",
  VERY_CONSERVATIVE: "שמור מאד",
  OPEN: "פתוח",
  MODERN: "מודרני",
  VERY_MODERN: "מודרני מאד",


  FEMALE_CONSERVATIVE: "שמורה",
  FEMALE_CONSERVATIVE_AND_OPEN_MIND: "שמורה וראש פתוח",
  FEMALE_VERY_CONSERVATIVE: "שמורה מאד",
  FEMALE_OPEN: "פתוחה",
  FEMALE_MODERN: "מודרנית",
  FEMALE_VERY_MODERN: "מודרנית מאד",

  openMinded: "פתיחות",
  sector: "מגזר",
  age: "גיל",
  HASIDIC: "חסידי",
  LITHUANIAN: "ליטאי",
  SFARADI: "ספרדי",
  YEMEN: "תימני",
  CHABAD: "חבד",
  HALF_HALF: "חצי חצי",
}

const SUPPORTED_PROPS = ['age', 'sector', 'openMinded'];

const maleCandidates = [
  {
    id: 1,
    firstName: "יוסף",
    lastName: "גרוסמן",
    properties: { openMinded: "VERY_CONSERVATIVE", sector: "LITHUANIAN", age: 28 },
    lookingFor: {
      openMinded: ["VERY_CONSERVATIVE"],
      sector: ["LITHUANIAN"],
      age: { min: 26, max: 28 }
    },
  },
  {
    id: 2,
    firstName: "משה",
    lastName: "רוזנפלד",
    properties: { openMinded: "CONSERVATIVE", sector: "HASIDIC", age: 20 },
    lookingFor: {
      openMinded: ["VERY_CONSERVATIVE", "CONSERVATIVE"],
      sector: ["HASIDIC"],
      age: { min: 18, max: 19 }
    },
  },
  {
    id: 3,
    firstName: "אליהו",
    lastName: "שטרית",
    properties: { openMinded: "MODERN", sector: "SFARADI", age: 32 },
    lookingFor: {
      openMinded: ["MODERN", "VERY_MODERN", "OPEN"],
      sector: ["SFARADI"],
      age: { min: 25, max: 30 }
    },
  },
  {
    id: 4,
    firstName: "חיים",
    lastName: "לביא",
    properties: { openMinded: "VERY_MODERN", sector: "CHABAD", age: 30 },
    lookingFor: {
      openMinded: ["MODERN", "VERY_MODERN"],
      sector: ["CHABAD", "MODERN"],
      age: { min: 28, max: 32 }
    },
  },
  {
    id: 5,
    firstName: "דוד",
    lastName: "שלום",
    properties: { openMinded: "CONSERVATIVE", sector: "YEMEN", age: 24 },
    lookingFor: {
      openMinded: ["CONSERVATIVE", "CONSERVATIVE_AND_OPEN_MIND"],
      sector: ["YEMEN", "SFARADI"],
      age: { min: 22, max: 26 }
    },
  },
  {
    id: 6,
    firstName: "אברהם",
    lastName: "רבינוביץ",
    properties: { openMinded: "CONSERVATIVE_AND_OPEN_MIND", sector: "HALF_HALF", age: 27 },
    lookingFor: {
      openMinded: ["CONSERVATIVE", "CONSERVATIVE_AND_OPEN_MIND", "OPEN"],
      sector: ["HALF_HALF", "CHABAD"],
      age: { min: 25, max: 29 }
    },
  },
  {
    id: 7,
    firstName: "יהודה",
    lastName: "מלכה",
    properties: { openMinded: "OPEN", sector: "SFARADI", age: 29 },
    lookingFor: {
      openMinded: ["OPEN", "MODERN"],
      sector: ["SFARADI", "YEMEN", "HALF_HALF"],
      age: { min: 27, max: 31 }
    },
  },
  {
    id: 8,
    firstName: "יעקב",
    lastName: "אייזנשטיין",
    properties: { openMinded: "VERY_CONSERVATIVE", sector: "HASIDIC", age: 22 },
    lookingFor: {
      openMinded: ["VERY_CONSERVATIVE", "CONSERVATIVE"],
      sector: ["HASIDIC"],
      age: { min: 20, max: 24 }
    },
  },
  {
    id: 9,
    firstName: "נתן",
    lastName: "פינקל",
    properties: { openMinded: "MODERN", sector: "LITHUANIAN", age: 26 },
    lookingFor: {
      openMinded: ["MODERN", "OPEN", "VERY_MODERN"],
      sector: ["LITHUANIAN", "HALF_HALF"],
      age: { min: 24, max: 28 }
    },
  },
  {
    id: 10,
    firstName: "שמעון",
    lastName: "גרינברג",
    properties: { openMinded: "VERY_MODERN", sector: "CHABAD", age: 35 },
    lookingFor: {
      openMinded: ["MODERN", "VERY_MODERN"],
      sector: ["CHABAD", "HALF_HALF"],
      age: { min: 33, max: 37 }
    },
  },
  {
    id: 11,
    firstName: "שלום",
    lastName: "כהן",
    properties: { openMinded: "CONSERVATIVE", sector: "SFARADI", age: 23 },
    lookingFor: {
      openMinded: ["VERY_CONSERVATIVE", "CONSERVATIVE"],
      sector: ["SFARADI", "YEMEN"],
      age: { min: 21, max: 25 }
    },
  },
  {
    id: 12,
    firstName: "רפאל",
    lastName: "חדד",
    properties: { openMinded: "CONSERVATIVE", sector: "YEMEN", age: 31 },
    lookingFor: {
      openMinded: ["CONSERVATIVE_AND_OPEN_MIND", "CONSERVATIVE"],
      sector: ["YEMEN", "SFARADI"],
      age: { min: 29, max: 33 }
    },
  },
  {
    id: 13,
    firstName: "אלעזר",
    lastName: "הרשטיין",
    properties: { openMinded: "OPEN", sector: "HASIDIC", age: 28 },
    lookingFor: {
      openMinded: ["OPEN", "MODERN"],
      sector: ["HASIDIC", "HALF_HALF"],
      age: { min: 26, max: 30 }
    },
  },
  {
    id: 14,
    firstName: "מרדכי",
    lastName: "ברוק",
    properties: { openMinded: "VERY_CONSERVATIVE", sector: "CHABAD", age: 34 },
    lookingFor: {
      openMinded: ["VERY_CONSERVATIVE", "CONSERVATIVE"],
      sector: ["CHABAD", "HASIDIC"],
      age: { min: 32, max: 36 }
    },
  },
  {
    id: 15,
    firstName: "חנניה",
    lastName: "שיינר",
    properties: { openMinded: "MODERN", sector: "LITHUANIAN", age: 30 },
    lookingFor: {
      openMinded: ["MODERN", "VERY_MODERN", "OPEN"],
      sector: ["LITHUANIAN", "HALF_HALF"],
      age: { min: 28, max: 32 }
    },
  },
  {
    id: 16,
    firstName: "אוריאל",
    lastName: "בוזגלו",
    properties: { openMinded: "VERY_MODERN", sector: "SFARADI", age: 25 },
    lookingFor: {
      openMinded: ["MODERN", "VERY_MODERN", "OPEN"],
      sector: ["SFARADI", "HALF_HALF"],
      age: { min: 23, max: 27 }
    },
  },
  {
    id: 17,
    firstName: "שלמה",
    lastName: "וייס",
    properties: { openMinded: "CONSERVATIVE_AND_OPEN_MIND", sector: "HASIDIC", age: 29 },
    lookingFor: {
      openMinded: ["CONSERVATIVE", "CONSERVATIVE_AND_OPEN_MIND"],
      sector: ["HASIDIC", "CHABAD"],
      age: { min: 27, max: 31 }
    },
  },
  {
    id: 18,
    firstName: "יהושע",
    lastName: "עמאר",
    properties: { openMinded: "CONSERVATIVE", sector: "YEMEN", age: 21 },
    lookingFor: {
      openMinded: ["CONSERVATIVE"],
      sector: ["YEMEN", "SFARADI"],
      age: { min: 20, max: 23 }
    },
  },
  {
    id: 19,
    firstName: "מנחם",
    lastName: "ביטון",
    properties: { openMinded: "VERY_CONSERVATIVE", sector: "SFARADI", age: 33 },
    lookingFor: {
      openMinded: ["VERY_CONSERVATIVE", "CONSERVATIVE"],
      sector: ["SFARADI", "YEMEN"],
      age: { min: 31, max: 35 }
    },
  },
  {
    id: 20,
    firstName: "זאב",
    lastName: "פרידמן",
    properties: { openMinded: "MODERN", sector: "HALF_HALF", age: 26 },
    lookingFor: {
      openMinded: ["MODERN", "OPEN", "VERY_MODERN"],
      sector: ["HALF_HALF", "CHABAD"],
      age: { min: 24, max: 28 }
    },
  }
];

const femaleCandidates = [
  {
    id: 1,
    firstName: "חנה",
    lastName: "וייס",
    properties: { openMinded: "VERY_CONSERVATIVE", sector: "LITHUANIAN", age: 27 },
    lookingFor: {
      openMinded: ["VERY_CONSERVATIVE", "CONSERVATIVE"],
      sector: ["LITHUANIAN"],
      age: { min: 27, max: 30 }
    }
  },
  {
    id: 2,
    firstName: "רחל",
    lastName: "גרינברג",
    properties: { openMinded: "CONSERVATIVE", sector: "HASIDIC", age: 18 },
    lookingFor: {
      openMinded: ["CONSERVATIVE", "CONSERVATIVE_AND_OPEN_MIND"],
      sector: ["HASIDIC"],
      age: { min: 19, max: 20 }
    }
  },
  {
    id: 3,
    firstName: "מיכל",
    lastName: "כהן",
    properties: { openMinded: "MODERN", sector: "SFARADI", age: 29 },
    lookingFor: {
      openMinded: ["MODERN", "VERY_MODERN", "OPEN"],
      sector: ["SFARADI", "YEMEN"],
      age: { min: 30, max: 34 }
    }
  },
  {
    id: 4,
    firstName: "לאה",
    lastName: "ליפשיץ",
    properties: { openMinded: "VERY_MODERN", sector: "CHABAD", age: 29 },
    lookingFor: {
      openMinded: ["MODERN", "VERY_MODERN"],
      sector: ["CHABAD", "MODERN"],
      age: { min: 28, max: 32 }
    }
  },
  {
    id: 5,
    firstName: "אילה",
    lastName: "תימני",
    properties: { openMinded: "CONSERVATIVE", sector: "YEMEN", age: 23 },
    lookingFor: {
      openMinded: ["CONSERVATIVE", "CONSERVATIVE_AND_OPEN_MIND"],
      sector: ["YEMEN", "SFARADI"],
      age: { min: 22, max: 26 }
    }
  },
  {
    id: 6,
    firstName: "רותי",
    lastName: "ברמן",
    properties: { openMinded: "CONSERVATIVE_AND_OPEN_MIND", sector: "HALF_HALF", age: 26 },
    lookingFor: {
      openMinded: ["CONSERVATIVE", "CONSERVATIVE_AND_OPEN_MIND", "OPEN"],
      sector: ["HALF_HALF", "CHABAD"],
      age: { min: 25, max: 29 }
    }
  },
  {
    id: 7,
    firstName: "דינה",
    lastName: "פרץ",
    properties: { openMinded: "OPEN", sector: "SFARADI", age: 28 },
    lookingFor: {
      openMinded: ["OPEN", "MODERN"],
      sector: ["SFARADI", "YEMEN", "HALF_HALF"],
      age: { min: 27, max: 31 }
    }
  },
  {
    id: 8,
    firstName: "שרה",
    lastName: "הלפרין",
    properties: { openMinded: "VERY_CONSERVATIVE", sector: "HASIDIC", age: 23 },
    lookingFor: {
      openMinded: ["VERY_CONSERVATIVE", "CONSERVATIVE"],
      sector: ["HASIDIC"],
      age: { min: 22, max: 25 }
    }
  },
  {
    id: 9,
    firstName: "אפרת",
    lastName: "זילברמן",
    properties: { openMinded: "MODERN", sector: "LITHUANIAN", age: 25 },
    lookingFor: {
      openMinded: ["MODERN", "OPEN", "VERY_MODERN"],
      sector: ["LITHUANIAN", "HALF_HALF"],
      age: { min: 24, max: 28 }
    }
  },
  {
    id: 10,
    firstName: "דבורה",
    lastName: "שיינין",
    properties: { openMinded: "VERY_MODERN", sector: "CHABAD", age: 34 },
    lookingFor: {
      openMinded: ["MODERN", "VERY_MODERN"],
      sector: ["CHABAD", "HALF_HALF"],
      age: { min: 33, max: 37 }
    }
  },
  {
    id: 11,
    firstName: "חגית",
    lastName: "אוחיון",
    properties: { openMinded: "CONSERVATIVE", sector: "SFARADI", age: 22 },
    lookingFor: {
      openMinded: ["VERY_CONSERVATIVE", "CONSERVATIVE"],
      sector: ["SFARADI", "YEMEN"],
      age: { min: 21, max: 25 }
    }
  },
  {
    id: 12,
    firstName: "אביגיל",
    lastName: "ששון",
    properties: { openMinded: "CONSERVATIVE", sector: "YEMEN", age: 30 },
    lookingFor: {
      openMinded: ["CONSERVATIVE", "CONSERVATIVE_AND_OPEN_MIND"],
      sector: ["YEMEN", "SFARADI"],
      age: { min: 29, max: 33 }
    }
  },
  {
    id: 13,
    firstName: "יעל",
    lastName: "פוקס",
    properties: { openMinded: "OPEN", sector: "HASIDIC", age: 27 },
    lookingFor: {
      openMinded: ["OPEN", "MODERN"],
      sector: ["HASIDIC", "HALF_HALF"],
      age: { min: 26, max: 30 }
    }
  },
  {
    id: 14,
    firstName: "שירה",
    lastName: "אברמוביץ'",
    properties: { openMinded: "VERY_CONSERVATIVE", sector: "CHABAD", age: 33 },
    lookingFor: {
      openMinded: ["VERY_CONSERVATIVE", "CONSERVATIVE"],
      sector: ["CHABAD", "HASIDIC"],
      age: { min: 32, max: 36 }
    }
  },
  {
    id: 15,
    firstName: "מרים",
    lastName: "ליבוביץ",
    properties: { openMinded: "MODERN", sector: "LITHUANIAN", age: 29 },
    lookingFor: {
      openMinded: ["MODERN", "VERY_MODERN", "OPEN"],
      sector: ["LITHUANIAN", "HALF_HALF"],
      age: { min: 28, max: 32 }
    }
  },
  {
    id: 16,
    firstName: "מיכל",
    lastName: "חדד",
    properties: { openMinded: "VERY_MODERN", sector: "SFARADI", age: 24 },
    lookingFor: {
      openMinded: ["MODERN", "VERY_MODERN", "OPEN"],
      sector: ["SFARADI", "HALF_HALF"],
      age: { min: 23, max: 27 }
    }
  },
  {
    id: 17,
    firstName: "שירה",
    lastName: "גרוסמן",
    properties: { openMinded: "CONSERVATIVE_AND_OPEN_MIND", sector: "HASIDIC", age: 28 },
    lookingFor: {
      openMinded: ["CONSERVATIVE", "CONSERVATIVE_AND_OPEN_MIND"],
      sector: ["HASIDIC", "CHABAD"],
      age: { min: 27, max: 31 }
    }
  },
  {
    id: 18,
    firstName: "תמר",
    lastName: "לוי",
    properties: { openMinded: "CONSERVATIVE", sector: "YEMEN", age: 22 },
    lookingFor: {
      openMinded: ["CONSERVATIVE"],
      sector: ["YEMEN", "SFARADI"],
      age: { min: 21, max: 23 }
    }
  },
  {
    id: 19,
    firstName: "אסתר",
    lastName: "ביטון",
    properties: { openMinded: "VERY_CONSERVATIVE", sector: "SFARADI", age: 32 },
    lookingFor: {
      openMinded: ["VERY_CONSERVATIVE", "CONSERVATIVE"],
      sector: ["SFARADI", "YEMEN"],
      age: { min: 31, max: 35 }
    }
  },
  {
    id: 20,
    firstName: "הילה",
    lastName: "כהן",
    properties: { openMinded: "MODERN", sector: "HALF_HALF", age: 25 },
    lookingFor: {
      openMinded: ["MODERN", "OPEN", "VERY_MODERN"],
      sector: ["HALF_HALF", "CHABAD"],
      age: { min: 24, max: 28 }
    }
  }
];
