import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles } from "lucide-react";

interface AnnualInputProps {
  onGenerate: (birthYear: number, birthMonth: number, birthDay: number, targetYear: number) => void;
  isLoading: boolean;
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const targetYears = Array.from({ length: 5 }, (_, i) => currentYear + i - 1);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const days = Array.from({ length: 31 }, (_, i) => i + 1);

const AnnualInput = ({ onGenerate, isLoading }: AnnualInputProps) => {
  const [birthYear, setBirthYear] = useState<string>("");
  const [birthMonth, setBirthMonth] = useState<string>("");
  const [birthDay, setBirthDay] = useState<string>("");
  const [targetYear, setTargetYear] = useState<string>(String(currentYear));

  const canGenerate = birthYear && birthMonth && birthDay && targetYear;

  const handleGenerate = () => {
    if (canGenerate) {
      onGenerate(Number(birthYear), Number(birthMonth), Number(birthDay), Number(targetYear));
    }
  };

  return (
    <div className="glass-card p-6 md:p-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-display gold-text text-center mb-6">
        輸入生日 Enter Birthday
      </h2>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">年 Year</label>
          <Select value={birthYear} onValueChange={setBirthYear}>
            <SelectTrigger className="bg-secondary/50 border-border/60">
              <SelectValue placeholder="年" />
            </SelectTrigger>
            <SelectContent className="max-h-60 bg-card border-border">
              {years.map((y) => (
                <SelectItem key={y} value={String(y)}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">月 Month</label>
          <Select value={birthMonth} onValueChange={setBirthMonth}>
            <SelectTrigger className="bg-secondary/50 border-border/60">
              <SelectValue placeholder="月" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {months.map((m) => (
                <SelectItem key={m} value={String(m)}>{m}月</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">日 Day</label>
          <Select value={birthDay} onValueChange={setBirthDay}>
            <SelectTrigger className="bg-secondary/50 border-border/60">
              <SelectValue placeholder="日" />
            </SelectTrigger>
            <SelectContent className="max-h-60 bg-card border-border">
              {days.map((d) => (
                <SelectItem key={d} value={String(d)}>{d}日</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-6">
        <label className="text-xs text-muted-foreground mb-1 block">查詢年份 Target Year</label>
        <Select value={targetYear} onValueChange={setTargetYear}>
          <SelectTrigger className="bg-secondary/50 border-border/60">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            {targetYears.map((y) => (
              <SelectItem key={y} value={String(y)}>{y}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={handleGenerate}
        disabled={!canGenerate || isLoading}
        className="w-full h-12 text-base font-semibold gold-gradient text-primary-foreground hover:opacity-90 transition-opacity gold-glow disabled:opacity-40 disabled:shadow-none"
      >
        <Sparkles className="w-5 h-5 mr-2" />
        {isLoading ? "生成中 Generating..." : "生成報告 Generate Report"}
      </Button>
    </div>
  );
};

export default AnnualInput;
