const zodiacSigns = [
  { sign: "Aquarius", start: new Date(0, 0, 20), end: new Date(0, 1, 18) },
  { sign: "Pisces", start: new Date(0, 1, 19), end: new Date(0, 2, 20) },
  { sign: "Aries", start: new Date(0, 2, 21), end: new Date(0, 3, 19) },
  { sign: "Taurus", start: new Date(0, 3, 20), end: new Date(0, 4, 20) },
  { sign: "Gemini", start: new Date(0, 4, 21), end: new Date(0, 5, 20) },
  { sign: "Cancer", start: new Date(0, 5, 21), end: new Date(0, 6, 22) },
  { sign: "Leo", start: new Date(0, 6, 23), end: new Date(0, 7, 22) },
  { sign: "Virgo", start: new Date(0, 7, 23), end: new Date(0, 8, 22) },
  { sign: "Libra", start: new Date(0, 8, 23), end: new Date(0, 9, 22) },
  { sign: "Scorpio", start: new Date(0, 9, 23), end: new Date(0, 10, 21) },
  { sign: "Sagittarius", start: new Date(0, 10, 22), end: new Date(0, 11, 21) },
  { sign: "Capricorn", start: new Date(0, 11, 22), end: new Date(0, 0, 19) },
];

export const getZodiacSign = (day, month) => {
  const date = new Date(2024, month - 1, day);
  for (const zodiac of zodiacSigns) {
    const startDate = new Date(2024, zodiac.start.getMonth(), zodiac.start.getDate());
    const endDate = new Date(2024, zodiac.end.getMonth(), zodiac.end.getDate());
    if (date >= startDate && date <= endDate) {
      return zodiac.sign;
    }
  }
  return null;
};
