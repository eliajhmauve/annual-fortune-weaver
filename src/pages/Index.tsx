import { Link } from "react-router-dom";
import StarfieldBg from "@/components/annual/StarfieldBg";
import { Sparkles, Star, ArrowRight } from "lucide-react";

const tools = [
  {
    title: "流年報告",
    subtitle: "Annual Fortune Report",
    description: "輸入生日，AI 為您生成個人化年度運勢分析，涵蓋事業、愛情、財運、健康逐月預測。",
    icon: Star,
    href: "/annual",
  },
];

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <StarfieldBg />
      <div className="relative z-10 flex flex-col items-center px-4 py-16 md:py-24">
        {/* Hero */}
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-7 h-7 text-gold animate-float" />
          <h1 className="text-4xl md:text-5xl font-display gold-text tracking-wide">
            福青施老師
          </h1>
          <Sparkles className="w-7 h-7 text-gold animate-float" style={{ animationDelay: "1s" }} />
        </div>
        <p className="text-muted-foreground font-body text-center max-w-md mb-12">
          結合東西方命理智慧，以 AI 科技為您揭示人生密碼
        </p>

        {/* Tool Cards */}
        <div className="w-full max-w-lg space-y-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              to={tool.href}
              className="group glass-card p-6 flex items-center gap-5 transition-all hover:border-gold/40 hover:shadow-[0_0_24px_-6px_hsl(var(--gold)/0.25)]"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl gold-gradient flex items-center justify-center">
                <tool.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-display gold-text mb-0.5">{tool.title}</h2>
                <p className="text-xs text-muted-foreground mb-1">{tool.subtitle}</p>
                <p className="text-sm text-foreground/70 leading-relaxed line-clamp-2">{tool.description}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gold/50 group-hover:text-gold group-hover:translate-x-1 transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-16 text-xs text-muted-foreground/50 font-body">
          © {new Date().getFullYear()} 福青施老師 · Powered by AI
        </p>
      </div>
    </div>
  );
};

export default Index;
