import {
  Wallet,
  TrendingUp,
  MessageSquare,
  Landmark,
  Search,
  Settings,
  BarChart3,
  Dice5,
  Palette,
  Sparkles,
  ArrowLeftRight,
  Wrench,
  FlaskConical,
} from "lucide-react";
import type { Category } from "@/data/skills";

const ICON_MAP: Record<Category, typeof Wallet> = {
  wallets: Wallet,
  trading: TrendingUp,
  social: MessageSquare,
  defi: Landmark,
  research: Search,
  automation: Settings,
  data: BarChart3,
  prediction: Dice5,
  nfts: Palette,
  oracles: Sparkles,
  bridges: ArrowLeftRight,
  infrastructure: Wrench,
  experimental: FlaskConical,
};

export function CategoryIcon({
  category,
  size = 16,
  className,
}: {
  category: Category;
  size?: number;
  className?: string;
}) {
  const Icon = ICON_MAP[category] ?? Search;
  return <Icon size={size} className={className} />;
}
