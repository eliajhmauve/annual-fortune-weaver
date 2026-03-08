import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Life path number calculation (same as frontend)
function getLifePathNumber(year: number, month: number, day: number): number {
  const sum = String(year) + String(month) + String(day);
  let total = sum.split("").reduce((acc, d) => acc + Number(d), 0);
  while (total > 9 && total !== 11 && total !== 22 && total !== 33) {
    total = String(total).split("").reduce((acc, d) => acc + Number(d), 0);
  }
  return total;
}

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

function getZodiac(month: number, day: number): string {
  for (const sign of zodiacSigns) {
    const [sm, sd] = sign.start;
    const [em, ed] = sign.end;
    if ((month === sm && day >= sd) || (month === em && day <= ed)) {
      return sign.name;
    }
  }
  return "摩羯座 Capricorn";
}

const chineseZodiacs = ["鼠 Rat", "牛 Ox", "虎 Tiger", "兔 Rabbit", "龍 Dragon", "蛇 Snake", "馬 Horse", "羊 Goat", "猴 Monkey", "雞 Rooster", "狗 Dog", "豬 Pig"];

function getChineseZodiac(year: number): string {
  return chineseZodiacs[(year - 4) % 12];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { birthYear, birthMonth, birthDay, targetYear } = await req.json();

    if (!birthYear || !birthMonth || !birthDay || !targetYear) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const lifePathNumber = getLifePathNumber(birthYear, birthMonth, birthDay);
    const zodiac = getZodiac(birthMonth, birthDay);
    const chineseZodiac = getChineseZodiac(birthYear);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `你是「福青施老師」，一位結合東西方命理的流年運勢大師。你精通生命靈數、西洋星座、中華生肖學。
你的回覆必須是嚴格的 JSON 格式（不要加 markdown code fence），結構如下：
{
  "annualTheme": "年度主題（中文 + English）",
  "annualKeywords": ["關鍵字1", "關鍵字2", "關鍵字3", "關鍵字4"],
  "overallScore": 數字(0-100),
  "luckyMonths": [幸運月份數字],
  "cautionMonths": [注意月份數字],
  "months": [
    {
      "month": 1,
      "overallStars": 數字(1-5),
      "overall": "整體運勢描述",
      "career": "事業描述",
      "careerStars": 數字(1-5),
      "love": "愛情描述",
      "loveStars": 數字(1-5),
      "finance": "財運描述",
      "financeStars": 數字(1-5),
      "health": "健康描述",
      "healthStars": 數字(1-5),
      "luckyColor": "幸運色（中文 色名）",
      "luckyNumber": 數字(1-9)
    }
    // ... 12 個月
  ],
  "advice": {
    "career": "年度事業建議（2-3句）",
    "love": "年度感情建議（2-3句）",
    "health": "年度健康建議（2-3句）",
    "finance": "年度財運建議（2-3句）"
  }
}

要求：
- 每月描述約30-50字中文，個人化且具體
- 星級評分要有合理變化，不要全部一樣
- 幸運月1-2個，注意月1-2個
- 整體評分根據靈數與年份組合合理分配
- 建議要針對該靈數和星座的特質給出
- 所有文字使用繁體中文`;

    const userPrompt = `請為以下條件生成${targetYear}年的完整流年運勢報告：
- 生日：${birthYear}年${birthMonth}月${birthDay}日
- 生命靈數：${lifePathNumber}
- 西洋星座：${zodiac}
- 中華生肖：${chineseZodiac}
- 查詢年份：${targetYear}

請根據這些命理資訊，生成個人化的年度運勢分析。`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const status = aiResponse.status;
      const errText = await aiResponse.text();
      console.error("AI gateway error:", status, errText);

      if (status === 429) {
        return new Response(JSON.stringify({ error: "請求過於頻繁，請稍後再試。" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI 額度不足，請聯繫管理員。" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway returned ${status}`);
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content;

    if (!content) throw new Error("No content from AI");

    // Parse the JSON from AI response (strip potential markdown fences)
    let parsed;
    try {
      const cleaned = content.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse AI response as JSON");
    }

    // Assemble the full report
    const report = {
      name: "您",
      targetYear,
      lifePathNumber,
      zodiac,
      chineseZodiac,
      annualTheme: parsed.annualTheme,
      annualKeywords: parsed.annualKeywords,
      overallScore: parsed.overallScore,
      luckyMonths: parsed.luckyMonths,
      cautionMonths: parsed.cautionMonths,
      months: parsed.months,
      advice: parsed.advice,
    };

    return new Response(JSON.stringify(report), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-annual-report error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
