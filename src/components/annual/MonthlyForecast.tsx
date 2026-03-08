import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { type MonthData } from "@/lib/annual-calc";
import StarRating from "./StarRating";
import { Palette, Hash } from "lucide-react";

const monthNames = [
  "一月 January", "二月 February", "三月 March", "四月 April",
  "五月 May", "六月 June", "七月 July", "八月 August",
  "九月 September", "十月 October", "十一月 November", "十二月 December",
];

interface MonthlyForecastProps {
  months: MonthData[];
  luckyMonths: number[];
  cautionMonths: number[];
}

const MonthlyForecast = ({ months, luckyMonths, cautionMonths }: MonthlyForecastProps) => {
  return (
    <div className="glass-card p-4 md:p-6">
      <h3 className="text-lg font-display gold-text mb-4">逐月運勢 Monthly Forecast</h3>
      <Accordion type="single" collapsible className="space-y-2">
        {months.map((m) => {
          const isLucky = luckyMonths.includes(m.month);
          const isCaution = cautionMonths.includes(m.month);
          return (
            <AccordionItem
              key={m.month}
              value={`month-${m.month}`}
              className={`border rounded-lg px-4 ${isLucky ? "border-gold/40 bg-gold/5" : isCaution ? "border-caution/40 bg-caution/5" : "border-border/40 bg-secondary/20"}`}
            >
              <AccordionTrigger className="hover:no-underline py-3">
                <div className="flex items-center justify-between w-full pr-2">
                  <div className="flex items-center gap-3">
                    <span className="font-body font-medium text-sm">
                      {monthNames[m.month - 1]}
                    </span>
                    {isLucky && <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/20 text-gold">幸運月</span>}
                    {isCaution && <span className="text-[10px] px-2 py-0.5 rounded-full bg-caution/20 text-caution">注意月</span>}
                  </div>
                  <StarRating stars={m.overallStars} />
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">整體 Overall：</span>
                    <p className="mt-1 text-foreground/90">{m.overall}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { label: "事業 Career", text: m.career, stars: m.careerStars },
                      { label: "愛情 Love", text: m.love, stars: m.loveStars },
                      { label: "財運 Finance", text: m.finance, stars: m.financeStars },
                      { label: "健康 Health", text: m.health, stars: m.healthStars },
                    ].map((item) => (
                      <div key={item.label} className="bg-secondary/30 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gold">{item.label}</span>
                          <StarRating stars={item.stars} />
                        </div>
                        <p className="text-xs text-foreground/80">{item.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 pt-2 border-t border-border/30 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Palette className="w-3 h-3 text-gold" /> 幸運色：{m.luckyColor}
                    </span>
                    <span className="flex items-center gap-1">
                      <Hash className="w-3 h-3 text-gold" /> 幸運數：{m.luckyNumber}
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default MonthlyForecast;
