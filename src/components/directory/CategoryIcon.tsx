import {
  Wallet,
  TrendingUp,
  MessageSquare,
  Landmark,
  Search,
  Settings,
  PenTool,
  CheckSquare,
  BarChart3,
  Dice5,
  Palette,
  Sparkles,
  ArrowLeftRight,
  Wrench,
  FlaskConical,
  Code2,
  Radio,
} from "lucide-react";
import type { Category } from "@/data/skills";

const ICON_MAP: Record<Category, typeof Wallet> = {
  wallets: Wallet,
  trading: TrendingUp,
  social: MessageSquare,
  defi: Landmark,
  research: Search,
  automation: Settings,
  design: PenTool,
  productivity: CheckSquare,
  data: BarChart3,
  prediction: Dice5,
  nfts: Palette,
  oracles: Sparkles,
  bridges: ArrowLeftRight,
  infrastructure: Wrench,
  coding: Code2,
  communication: Radio,
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
