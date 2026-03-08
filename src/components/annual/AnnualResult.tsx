import { type AnnualReportData } from "@/lib/annual-calc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Heart, Activity, DollarSign, RotateCcw } from "lucide-react";
import ScoreRing from "./ScoreRing";
import MonthlyForecast from "./MonthlyForecast";

interface AnnualResultProps {
  data: AnnualReportData;
  onReset: () => void;
}

const monthLabels = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

const AnnualResult = ({ data, onReset }: AnnualResultProps) => {
  const adviceCards = [
    { icon: Briefcase, label: "事業建議 Career", text: data.advice.career },
    { icon: Heart, label: "感情建議 Love", text: data.advice.love },
    { icon: Activity, label: "健康建議 Health", text: data.advice.health },
    { icon: DollarSign, label: "財運建議 Finance", text: data.advice.finance },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Report Header */}
      <div className="glass-card p-6 md:p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-display gold-text mb-3">
          {data.name} 的 {data.targetYear} 年度運勢報告
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <Badge variant="outline" className="border-gold/50 text-gold bg-gold/10">
            靈數 {data.lifePathNumber}
          </Badge>
          <Badge variant="outline" className="border-gold/50 text-gold bg-gold/10">
            {data.zodiac}
          </Badge>
          <Badge variant="outline" className="border-gold/50 text-gold bg-gold/10">
            {data.chineseZodiac}
          </Badge>
        </div>
        <p className="text-lg font-body text-foreground/90 mb-1">{data.annualTheme}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {data.annualKeywords.map((kw) => (
            <span key={kw} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
              #{kw}
            </span>
          ))}
        </div>
      </div>

      {/* Year Overview */}
      <div className="glass-card p-6 md:p-8">
        <h3 className="text-lg font-display gold-text mb-4 text-center">年度總覽 Year Overview</h3>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex flex-col items-center">
            <ScoreRing score={data.overallScore} size={140} />
            <span className="text-xs text-muted-foreground mt-2">整體運勢評分</span>
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <span className="text-sm text-gold font-medium">🌟 幸運月份 Lucky Months</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {data.luckyMonths.map((m) => (
                  <span key={m} className="px-3 py-1 text-xs rounded-full gold-gradient text-primary-foreground font-medium">
                    {monthLabels[m - 1]}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-sm text-caution font-medium">⚠️ 注意月份 Caution Months</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {data.cautionMonths.map((m) => (
                  <span key={m} className="px-3 py-1 text-xs rounded-full bg-caution/20 text-caution font-medium">
                    {monthLabels[m - 1]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Forecast */}
      <MonthlyForecast months={data.months} luckyMonths={data.luckyMonths} cautionMonths={data.cautionMonths} />

      {/* Year Key Advice */}
      <div className="glass-card p-4 md:p-6">
        <h3 className="text-lg font-display gold-text mb-4">年度建議 Year Advice</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adviceCards.map((card) => (
            <div key={card.label} className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <card.icon className="w-5 h-5 text-gold" />
                <span className="text-sm font-medium text-gold">{card.label}</span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-3 pb-8">
        <Button onClick={onReset} variant="outline" className="border-border/60">
          <RotateCcw className="w-4 h-4 mr-2" /> 重新查詢 Reset
        </Button>
      </div>
    </div>
  );
};

export default AnnualResult;
