import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    type: "increase" | "decrease";
  };
  icon: React.ElementType;
  className?: string;
}

export function StatsCard({ title, value, change, icon: Icon, className }: StatsCardProps) {
  return (
    <Card className={cn("p-6 hover:shadow-md transition-shadow", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-heading-color">{value}</p>
          {change && (
            <div className="flex items-center space-x-1">
              {change.type === "increase" ? (
                <TrendingUp className="w-4 h-4 text-success" />
              ) : (
                <TrendingDown className="w-4 h-4 text-destructive" />
              )}
              <span className={cn(
                "text-sm font-medium",
                change.type === "increase" ? "text-success" : "text-destructive"
              )}>
                {change.value}
              </span>
            </div>
          )}
        </div>
        <div className="p-3 bg-primary/10 rounded-full">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </Card>
  );
}