import { useState } from "react";
import StarfieldBg from "@/components/annual/StarfieldBg";
import AnnualInput from "@/components/annual/AnnualInput";
import AnnualResult from "@/components/annual/AnnualResult";
import { type AnnualReportData } from "@/lib/annual-calc";
import { Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AnnualPage = () => {
  const [report, setReport] = useState<AnnualReportData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (birthYear: number, birthMonth: number, birthDay: number, targetYear: number) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-annual-report", {
        body: { birthYear, birthMonth, birthDay, targetYear },
      });

      if (error) {
        console.error("Edge function error:", error);
        toast.error("報告生成失敗，請稍後再試。");
        return;
      }

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      setReport(data as AnnualReportData);
    } catch (e) {
      console.error("Generate report error:", e);
      toast.error("網路錯誤，請稍後再試。");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => setReport(null);

  return (
    <div className="relative min-h-screen">
      <StarfieldBg />
      <div className="relative z-10 px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-gold animate-float" />
            <h1 className="text-3xl md:text-4xl font-display gold-text">
              流年報告
            </h1>
            <Sparkles className="w-6 h-6 text-gold animate-float" style={{ animationDelay: "1s" }} />
          </div>
          <p className="text-sm text-muted-foreground font-body">
            Annual Fortune Report · 福青施老師
          </p>
        </div>

        {!report ? (
          <AnnualInput onGenerate={handleGenerate} isLoading={isLoading} />
        ) : (
          <AnnualResult data={report} onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default AnnualPage;
