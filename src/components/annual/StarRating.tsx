import { Star } from "lucide-react";

const StarRating = ({ stars, max = 5 }: { stars: number; max?: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: max }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < stars ? "fill-gold text-gold" : "text-muted-foreground/30"}`}
      />
    ))}
  </div>
);

export default StarRating;
