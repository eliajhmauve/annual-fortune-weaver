// Life path number calculation
export function getLifePathNumber(year: number, month: number, day: number): number {
  const sum = String(year) + String(month) + String(day);
  let total = sum.split("").reduce((acc, d) => acc + Number(d), 0);
  while (total > 9 && total !== 11 && total !== 22 && total !== 33) {
    total = String(total).split("").reduce((acc, d) => acc + Number(d), 0);
  }
  return total;
}

// Western zodiac
const zodiacSigns = [
  { name: "摩羯座 Capricorn", start: [1, 1], end: [1, 19] },
  { name: "水瓶座 Aquarius", start: [1, 20], end: [2, 18] },
  { name: "雙魚座 Pisces", start: [2, 19], end: [3, 20] },
  { name: "牡羊座 Aries", start: [3, 21], end: [4, 19] },
  { name: "金牛座 Taurus", start: [4, 20], end: [5, 20] },
  { name: "雙子座 Gemini", start: [5, 21], end: [6, 21] },
  { name: "巨蟹座 Cancer", start: [6, 22], end: [7, 22] },
  { name: "獅子座 Leo", start: [7, 23], end: [8, 22] },
  { name: "處女座 Virgo", start: [8, 23], end: [9, 22] },
  { name: "天秤座 Libra", start: [9, 23], end: [10, 23] },
  { name: "天蠍座 Scorpio", start: [10, 24], end: [11, 22] },
  { name: "射手座 Sagittarius", start: [11, 23], end: [12, 21] },
  { name: "摩羯座 Capricorn", start: [12, 22], end: [12, 31] },
];

export function getZodiac(month: number, day: number): string {
  for (const sign of zodiacSigns) {
    const [sm, sd] = sign.start;
    const [em, ed] = sign.end;
    if ((month === sm && day >= sd) || (month === em && day <= ed)) {
      return sign.name;
    }
  }
  return "摩羯座 Capricorn";
}

// Chinese zodiac
const chineseZodiacs = ["鼠 Rat", "牛 Ox", "虎 Tiger", "兔 Rabbit", "龍 Dragon", "蛇 Snake", "馬 Horse", "羊 Goat", "猴 Monkey", "雞 Rooster", "狗 Dog", "豬 Pig"];

export function getChineseZodiac(year: number): string {
  return chineseZodiacs[(year - 4) % 12];
}

export interface AnnualReportData {
  name: string;
  targetYear: number;
  lifePathNumber: number;
  zodiac: string;
  chineseZodiac: string;
  annualTheme: string;
  annualKeywords: string[];
  overallScore: number;
  luckyMonths: number[];
  cautionMonths: number[];
  months: MonthData[];
  advice: {
    career: string;
    love: string;
    health: string;
    finance: string;
  };
}

export interface MonthData {
  month: number;
  overallStars: number;
  overall: string;
  career: string;
  careerStars: number;
  love: string;
  loveStars: number;
  finance: string;
  financeStars: number;
  health: string;
  healthStars: number;
  luckyColor: string;
  luckyNumber: number;
}

// Generate mock report data (to be replaced by AI)
export function generateMockReport(birthYear: number, birthMonth: number, birthDay: number, targetYear: number): AnnualReportData {
  const lifePathNumber = getLifePathNumber(birthYear, birthMonth, birthDay);
  const zodiac = getZodiac(birthMonth, birthDay);
  const chineseZodiac = getChineseZodiac(birthYear);

  const colors = ["紅 Red", "藍 Blue", "綠 Green", "紫 Purple", "金 Gold", "白 White", "橙 Orange", "粉 Pink", "黑 Black", "銀 Silver", "青 Teal", "黃 Yellow"];
  const themes = ["突破與重生 Breakthrough & Rebirth", "穩定成長 Steady Growth", "探索新境 Exploring New Horizons", "內在修煉 Inner Cultivation"];
  const keywordSets = [
    ["轉變", "機遇", "成長", "突破"],
    ["穩定", "積累", "耐心", "收穫"],
    ["冒險", "學習", "拓展", "創新"],
    ["反思", "修復", "平衡", "智慧"],
  ];

  const themeIdx = (lifePathNumber + targetYear) % themes.length;

  const monthTexts = [
    { overall: "新年伊始，適合規劃全年方向，確立目標。內心會有強烈的驅動力推動你向前。", career: "有貴人相助，適合推動新專案。工作上會遇到意想不到的合作機會。", love: "單身者有桃花機會，已有伴侶者感情穩定。多參加社交活動會有好的邂逅。", finance: "財運穩定但無大進，適合理財規劃。控制不必要的開支。", health: "注意睡眠品質，建議養成規律運動習慣。避免過度熬夜。" },
    { overall: "二月是沉澱的好時機，回顧過去，整理思緒。適合閱讀和學習新技能。", career: "工作節奏放慢，適合深入學習和提升技能。避免急於求成。", love: "感情需要更多溝通，表達你的真實感受。傾聽對方的需求同樣重要。", finance: "可能有意外支出，提前做好預算。避免衝動消費。", health: "冬季尾聲，注意保暖和免疫力。多補充維他命。" },
    { overall: "春暖花開，能量回升，適合展開新計畫。創意和靈感源源不絕。", career: "創意靈感豐富，把握機會展現才華。領導會注意到你的表現。", love: "桃花運旺盛，有機會遇到心儀對象。已婚者享受甜蜜的家庭時光。", finance: "有投資機會，但需謹慎評估風險。多聽專業人士建議。", health: "精力充沛，適合嘗試新的運動項目。戶外活動有益身心。" },
    { overall: "四月帶來挑戰與機遇並存的局面，考驗你的決斷力。保持冷靜是關鍵。", career: "面臨重要決策，需要冷靜分析。不要被情緒左右判斷。", love: "感情中可能出現小摩擦，耐心溝通是關鍵。給彼此多一些空間。", finance: "財運平穩，適合儲蓄。避免高風險投資。", health: "壓力較大，注意情緒管理和放鬆。冥想和瑜珈會很有幫助。" },
    { overall: "五月運勢上揚，之前的努力開始見到成果。信心增強，步伐堅定。", career: "之前的努力開始有回報，保持積極態度。可能會獲得升遷或加薪機會。", love: "感情甜蜜，適合規劃浪漫約會。單身者大膽表白。", finance: "有額外收入的可能，把握機會。適合進行長期投資規劃。", health: "身體狀態良好，但勿過度勞累。保持良好的作息。" },
    { overall: "年中轉折點，適合重新審視目標和方向。做出必要的調整。", career: "適合重新評估職業方向，可能有轉職機會。權衡利弊後做決定。", love: "感情需要新鮮感，嘗試不同的相處方式。一起旅行會增進感情。", finance: "財運波動，控制支出避免浪費。設立緊急備用金。", health: "注意消化系統，飲食宜清淡。夏季注意防暑降溫。" },
    { overall: "七月充滿活力，社交運佳，適合拓展人脈。積極參與各種活動。", career: "團隊合作順利，社交帶來新機會。參加行業活動會有收穫。", love: "社交活動中可能遇到特別的人。已有伴侶者可以安排旅行。", finance: "有合作帶來的財務機會。共同投資需要謹慎考量。", health: "注意防曬和補水，夏季運動選擇涼爽時段。" },
    { overall: "八月適合專注內在成長，學習和自我提升的好時機。靜心思考未來方向。", career: "適合進修學習，為未來儲備能量。報名課程或考取證照。", love: "感情深入發展，相互理解加深。坦誠溝通很重要。", finance: "理財意識增強，適合制定長期計劃。諮詢專業理財顧問。", health: "注意休息和睡眠品質。嘗試新的放鬆方式。" },
    { overall: "九月迎來收穫季，多方面都會有好消息。之前播下的種子開始結果。", career: "工作成果獲得認可，有升遷或加薪機會。保持謙虛繼續努力。", love: "感情穩定甜蜜，適合做長遠規劃。考慮關係的下一步。", finance: "財運亨通，有意外收入的可能。但不要因此鬆懈。", health: "精神飽滿，但要注意季節轉換的保養。預防秋季乾燥。" },
    { overall: "十月需要謹慎行事，避免衝動決定。三思而後行是最好的策略。", career: "工作中注意細節，避免粗心大意。仔細檢查每一份文件。", love: "感情中需要更多耐心和包容。避免因小事爭吵。", finance: "控制消費慾望，避免非必要支出。年底購物需要預算。", health: "秋季保養，注意皮膚和呼吸系統。增加室內運動。" },
    { overall: "十一月充滿驚喜，意料之外的好事可能發生。保持開放的心態。", career: "可能收到意想不到的好消息或機會。做好準備隨時抓住機會。", love: "感情有突破性進展。勇敢表達你的心意。", finance: "有意外財運，但要理性看待。不要因一時之利做出衝動決定。", health: "冬季來臨，注意保暖和運動。預防感冒和流感。" },
    { overall: "年末總結，適合回顧全年成就，規劃新年。感恩與期待並行。", career: "做好年度總結，為明年奠定基礎。設立新的職業目標。", love: "假期是增進感情的好時機。與家人和伴侶共度美好時光。", finance: "年末收支平衡，為新年理財做準備。制定明年的財務計劃。", health: "注意年末疲勞累積，適度休息。好好犒賞辛苦一年的自己。" },
  ];

  const luckyMonths = [((lifePathNumber * 3) % 12) + 1, ((lifePathNumber * 7) % 12) + 1].filter((v, i, a) => a.indexOf(v) === i);
  const cautionMonths = [((lifePathNumber * 5 + 2) % 12) + 1].filter((m) => !luckyMonths.includes(m));

  const months: MonthData[] = monthTexts.map((text, i) => {
    const baseStars = 3 + ((lifePathNumber + i) % 3);
    return {
      month: i + 1,
      overallStars: Math.min(5, luckyMonths.includes(i + 1) ? baseStars + 1 : cautionMonths.includes(i + 1) ? baseStars - 1 : baseStars),
      overall: text.overall,
      career: text.career,
      careerStars: Math.min(5, baseStars + ((i * 3) % 3) - 1),
      love: text.love,
      loveStars: Math.min(5, baseStars + ((i * 7) % 3) - 1),
      finance: text.finance,
      financeStars: Math.min(5, baseStars + ((i * 11) % 3) - 1),
      health: text.health,
      healthStars: Math.min(5, baseStars + ((i * 13) % 3) - 1),
      luckyColor: colors[i],
      luckyNumber: ((lifePathNumber + i * 3) % 9) + 1,
    };
  });

  return {
    name: "您",
    targetYear,
    lifePathNumber,
    zodiac,
    chineseZodiac,
    annualTheme: themes[themeIdx],
    annualKeywords: keywordSets[themeIdx],
    overallScore: 65 + (lifePathNumber * 3) % 30,
    luckyMonths,
    cautionMonths,
    months,
    advice: {
      career: `靈數${lifePathNumber}在${targetYear}年事業上適合穩扎穩打，發揮你的天賦與專長。善用人際網絡，主動尋求合作機會，年中是最佳的轉變時機。`,
      love: `${zodiac.split(" ")[0]}今年在感情方面需要更多的真誠與耐心。無論單身或有伴，都要學會傾聽與表達。秋季是感情升溫的關鍵期。`,
      health: `${chineseZodiac.split(" ")[0]}年出生的你，今年要特別注意作息規律。建議培養一項長期運動習慣，飲食均衡，定期健康檢查。`,
      finance: `整體財運中等偏上，上半年適合穩健投資，下半年可以適度擴大理財範圍。避免借貸和高風險操作，年末會有不錯的回報。`,
    },
  };
}
